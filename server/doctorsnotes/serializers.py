from rest_framework import serializers
from .models import DoctorNote

class DoctorNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorNote
        fields = '__all__'
