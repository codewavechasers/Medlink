from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Medication, MedicationNotification
from .serializers import MedicationSerializer
from .models import RefillRequest
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from datetime import date
from django.views.decorators.http import require_GET
from patients.models import Patient
import json
@api_view(['GET'])
def get_medications_by_email(request):
    email = request.session.get('email')
    try:
        medications = Medication.objects.filter(email=email)
        serializer = MedicationSerializer(medications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Medication.DoesNotExist:
        return Response({'error': 'No medications found for this email.'}, status=status.HTTP_404_NOT_FOUND)
    


@csrf_exempt
def refill_medication(request):
    email=request.session.get('email')
    patientData = Patient.objects.get(email=email)
    name=patientData.name

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            medication=data.get('medication')
            quantity=data.get('quantity')
            reason=data.get('reason')
            medId=data.get('id')
            
            if email is None:
                return JsonResponse({'status': 'error', 'message': 'Provide your email address.'}, status=400)

            existing_request = RefillRequest.objects.filter(email=email, medId=medId).first()
            if existing_request:
                return JsonResponse({'status': 'error', 'message': 'You already have a request pending.'}, status=403)

            RefillRequest.objects.create(
                email=email,
                patient_name=name,
                medId=medId,
                medication=medication,
                reason=reason,
                quantity=quantity,
            )
            return JsonResponse({'status': 'success', 'message': 'You have successfully requested a refill. You will be contacted soon!'}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid Data'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f'An error occurred: {str(e)}'}, status=500)

    else:
        return JsonResponse({'message': 'Invalid request method'}, status=405)



@require_GET
@csrf_exempt
def subscription_count(request):
    email = request.session.get('email')
    count = Medication.objects.filter(email=email).count()
    return JsonResponse({
        'subscription_count': count
    })
    
    
@api_view(['GET'])
def get_notifications(request):
    email = request.session.get('email')
    notifications = MedicationNotification.objects.filter(patient_email=email)
    
    data = [{'message': notification.message} for notification in notifications]
    return Response(data)