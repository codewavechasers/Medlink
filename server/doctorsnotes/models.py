from django.db import models

class DoctorNote(models.Model):
    doctor = models.CharField(max_length=100)
    date = models.DateField()
    note = models.TextField()
    status = models.CharField(max_length=50)  # e.g., 'Pending', 'Completed'
    advice = models.TextField()  
    patient_email=models.EmailField(max_length=200)
    def __str__(self):
        return f"{self.doctor} - {self.date}"
