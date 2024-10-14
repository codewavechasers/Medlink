from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Patient
from .serializers import PatientSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
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
                family_health_conditions=serializer.validated_data.get('family_health_conditions', ''),                consent_to_treat=serializer.validated_data['consent_to_treat'],
                privacy_policy=serializer.validated_data['privacy_policy']
            )
            return Response({"message": "Patient registered successfully!"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
