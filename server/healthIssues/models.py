from django.db import models

class MedicalIssue(models.Model):
    email = models.EmailField()
    bodyPart = models.CharField(max_length=100)
    symptom = models.TextField()
    date = models.DateField()
    image = models.CharField(blank=True, null=True, max_length=100);
    # Eyes
    visualAcuity = models.CharField(max_length=50, blank=True, null=True)
    pupilReaction = models.IntegerField(blank=True, null=True)
    eyePressure = models.FloatField(blank=True, null=True)
    visualField = models.IntegerField(blank=True, null=True)
    
    # Legs
    bloodPressure = models.CharField(max_length=50, blank=True, null=True)
    pulse = models.IntegerField(blank=True, null=True)
    gaitAnalysis = models.TextField(blank=True, null=True)
    muscleStrength = models.FloatField(blank=True, null=True)
    
    # Heart
    ecg = models.TextField(blank=True, null=True)
    cardiacOutput = models.FloatField(blank=True, null=True)
    ejectionFraction = models.FloatField(blank=True, null=True)
    
    # Brain
    cognitiveFunction = models.TextField(blank=True, null=True)
    neurologicalExam = models.TextField(blank=True, null=True)
    mri = models.TextField(blank=True, null=True)
    eeg = models.TextField(blank=True, null=True)
    
    # Back
    rangeOfMotion = models.IntegerField(blank=True, null=True)
    painLevel = models.IntegerField(blank=True, null=True)
    xrayOrMRI = models.TextField(blank=True, null=True)

    health_score = models.FloatField(blank=True, null=True)  # New field for health score

    def __str__(self):
        return f"{self.bodyPart} - {self.symptom} on {self.date}"