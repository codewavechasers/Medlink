from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from .models import Patient
from .serializers import PatientSerializer
from django.http import JsonResponse

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        # Check for empty fields
        empty_fields = [field for field, value in request.data.items() if not value]
        if empty_fields:
            return JsonResponse({
                "success": False,
                "message": f"The following fields are empty: {', '.join(empty_fields)}"
            }, status=200)

        # Validate email
        try:
            validate_email(request.data.get('email'))
        except ValidationError:
            return JsonResponse({
                "success": False,
                "message": "Invalid email address"
            }, status=200)

        # Check if email already exists
        if Patient.objects.filter(email=request.data.get('email')).exists():
            return JsonResponse({
                "success": False,
                "message": "Email address already taken"
            }, status=200)

        # Check if phone number already exists
        if Patient.objects.filter(phone_number=request.data.get('phone_number')).exists():
            return JsonResponse({
                "success": False,
                "message": "Phone number already taken"
            }, status=200)

        if serializer.is_valid():
            try:
                patient = Patient.objects.create_user(
                    email=serializer.validated_data['email'],
                    password=serializer.validated_data['password'],
                    name=serializer.validated_data['name'],
                    date_of_birth=serializer.validated_data['date_of_birth'],
                    gender=serializer.validated_data['gender'],
                    phone_number=serializer.validated_data['phone_number'],
                    address=serializer.validated_data['address'],
                    city=serializer.validated_data.get('city', ''),
                    emergency_contact_name=serializer.validated_data['emergency_contact_name'],
                    emergency_contact_relationship=serializer.validated_data['emergency_contact_relationship'],
                    emergency_contact_phone=serializer.validated_data['emergency_contact_phone'],
                    emergency_contact_email=serializer.validated_data['emergency_contact_email'],
                    current_health_conditions=serializer.validated_data.get('current_health_conditions', ''),
                    past_medical_history=serializer.validated_data.get('past_medical_history', ''),
                    allergies=serializer.validated_data.get('allergies', ''),
                    current_medications=serializer.validated_data.get('current_medications', ''),
                    family_health_conditions=serializer.validated_data.get('family_health_conditions', ''),
                    consent_to_treat=serializer.validated_data['consent_to_treat'],
                    privacy_policy=serializer.validated_data['privacy_policy']
                )
                return JsonResponse({
                    "success": True,
                    "message": "Patient registered successfully!"
                }, status=201)
            except Exception as e:
                return JsonResponse({
                    "success": False,
                    "message": f"An error occurred: {str(e)}"
                }, status=500)
        else:
            return JsonResponse({
                "success": False,
                "message": "Invalid input",
                "errors": serializer.errors
            }, status=400)