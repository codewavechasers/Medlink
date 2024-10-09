
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from .models import MedicalIssue
from .serializer import MedicalIssueSerializer

def calculate_health_score(medical_data):
    score = 100  
    scoring_rules = {
        'Eyes': {
            'visualAcuity': {'poor': -20},
            'pupilReaction': {'low': -15, 'normal': 0, 'high': 5},
            'eyePressure': lambda x: -20 if x > 21 else 0,
            'visualField': lambda x: -20 if x < 100 else 0,
        },
        'Legs': {
            'bloodPressure': {'high': -20, 'normal': 0, 'low': 5},
            'pulse': lambda x: -10 if x < 60 or x > 100 else 0,
            'muscleStrength': lambda x: -15 if x < 3 else 0,
        },
        'Heart': {
            'ejectionFraction': lambda x: -20 if x < 50 else 0,
            'cardiacOutput': lambda x: -15 if x < 4 else 0,
        },
        'Brain': {
            'cognitiveFunction': {'impaired': -30, 'normal': 0},
            'neurologicalExam': {'abnormal': -25, 'normal': 0},
        },
        'Back': {
            'painLevel': lambda x: -10 * x if x > 0 else 0,
            'rangeOfMotion': lambda x: -10 if x < 75 else 0,
        },
    }

    body_part = medical_data.get('bodyPart')

    if body_part in scoring_rules:
        for key, rule in scoring_rules[body_part].items():
            value = medical_data.get(key)
            if isinstance(rule, dict):
                for condition, deduction in rule.items():
                    if condition in str(value).lower():
                        score += deduction
            elif callable(rule):
                score += rule(value)

    return max(0, min(score, 100))


@api_view(['POST'])
def report_health_issue(request):
    if request.method == 'POST':
        email = request.session.get('email')

        if not email:
            return Response({'error': 'User email not found in session'}, status=status.HTTP_400_BAD_REQUEST)

        data = {**request.data, 'email': email}

        # Create or update the medical issue record
        serializer = MedicalIssueSerializer(data=data)
        
        if serializer.is_valid():
            medical_issue = serializer.save()
            
            health_score = calculate_health_score(serializer.data)

            medical_issue.health_score = health_score
            medical_issue.save()  
            
            return JsonResponse({
                "success": True,
                "message": "Health Issue sent to our doctors",
                "health_score": health_score
            }, status=status.HTTP_201_CREATED)

        return JsonResponse({
            "success": False,
            "message": "An error occurred during issuing.",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)



def getHealthRecords(request):
    try:
        email = request.session.get('email')
        
        if not email:
            return JsonResponse({"success": "false", "message": "No email found in session."}, status=400)

        patientRecords = MedicalIssue.objects.filter(email=email)
        
        if not patientRecords.exists():
            return JsonResponse({"success": "false", "message": "No records found for this email."}, status=404)

        data = [
            {
                "id": record.id,
                "bodyPart": record.bodyPart,
                "symptom": record.symptom,
                "health_score": record.health_score,
                "date": record.date,
                "image": record.image
            }
            for record in patientRecords
        ]
        
        return JsonResponse({"success": "true", "data": data}, status=200)

    except MedicalIssue.DoesNotExist:
        return JsonResponse({"success": "false", "message": "No records found for this email."}, status=404)
    except Exception as e:
        return JsonResponse({"success": "false", "message": str(e)}, status=500)


def calculate_overall_health_score(request):
    try:
        email = request.session.get('email')
        
        data = MedicalIssue.objects.filter(email=email)
        
        if not data.exists():
            return JsonResponse({"success": False, "message": "No records found for this email.", "overall_health_score":50}, status=401)
        
        total_health_score = sum(item.health_score for item in data)
        record_count = data.count()
        
        max_health_score = 100  # Adjust this if your max score is different
        overall_health_score = (total_health_score / (record_count * max_health_score)) * 100
        
        
        
        return JsonResponse({"success": True, "overall_health_score": overall_health_score}, status=200)
    
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)}, status=500)