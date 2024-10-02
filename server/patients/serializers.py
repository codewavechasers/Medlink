from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['name', 'date_of_birth', 'gender', 'email', 'phone_number', 'address', 'city', 
                  'emergency_contact_name', 'emergency_contact_relationship', 'emergency_contact_phone',
                  'emergency_contact_email', 'current_health_conditions', 'past_medical_history', 'allergies', 
                  'current_medications', 'primary_care_physician', 'family_health_conditions', 
                  'lifestyle_habits', 'exercise_routine', 'dietary_habits', 'insurance_provider', 
                  'policy_number', 'insurance_phone', 'consent_to_treat', 'privacy_policy', 'password']

    password = serializers.CharField(write_only=True)
