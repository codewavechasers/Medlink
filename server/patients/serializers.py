from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['name', 'date_of_birth', 'gender', 'email', 'phone_number', 'address', 'city', 
                  'emergency_contact_name', 'emergency_contact_relationship', 'emergency_contact_phone',
                  'emergency_contact_email', 'current_health_conditions', 'past_medical_history', 'allergies', 
                  'current_medications','family_health_conditions', 'consent_to_treat', 'privacy_policy', 'password']

    password = serializers.CharField(write_only=True)
