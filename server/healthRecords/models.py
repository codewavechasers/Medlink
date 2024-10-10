from django.db import models

class MedicalIssue(models.Model):
    email = models.EmailField()
    bodyPart = models.CharField(max_length=100)  # Head, Torso, LeftLeg, RightLeg, LeftHand, RightHand
    symptom = models.TextField()
    date = models.DateField()
    image = models.CharField(blank=True, null=True, max_length=100)  # Path to image if any

    # Head
    headache = models.IntegerField(blank=True, null=True)  # Level of headache severity
    visionIssues = models.CharField(max_length=50, blank=True, null=True)  # Yes/No for vision problems

    # Torso
    chestPain = models.IntegerField(blank=True, null=True)  # Chest pain severity
    breathingDifficulty = models.IntegerField(blank=True, null=True)  # Difficulty in breathing severity

    # Left Leg
    leftLegPain = models.IntegerField(blank=True, null=True)  # Left leg pain severity

    # Right Leg
    rightLegPain = models.IntegerField(blank=True, null=True)  # Right leg pain severity

    # Left Hand
    leftHandPain = models.IntegerField(blank=True, null=True)  # Left hand pain severity

    # Right Hand
    rightHandPain = models.IntegerField(blank=True, null=True)  # Right hand pain severity

    health_score = models.FloatField(blank=True, null=True)  # Calculated health score

    def __str__(self):
        return f"{self.bodyPart} - {self.symptom} on {self.date}"
