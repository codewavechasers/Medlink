from rest_framework import serializers
from .models import MedicalIssue

class MedicalIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalIssue
        fields = '__all__'

    def create(self, validated_data):
        email = validated_data.get('email')
        body_part = validated_data.get('bodyPart')
        
        # Check if a record with the same email and bodyPart exists
        instance = MedicalIssue.objects.filter(email=email, bodyPart=body_part).first()
        
        if instance:
            # Update existing record
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()
            return instance
        else:
            # Create new record
            return MedicalIssue.objects.create(**validated_data)