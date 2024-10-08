from django.db import models

class Medication(models.Model):
    email = models.EmailField()
    heading = models.CharField(max_length=255)
    spoons = models.CharField(max_length=10)
    after_before = models.CharField(max_length=10)
    am_pm = models.CharField(max_length=10)
    days_left = models.CharField(max_length=10)
    description = models.TextField()

    def __str__(self):
        return self.heading


class RefillRequest(models.Model):
    email = models.EmailField()  
    medication = models.CharField(max_length=255) 
    quantity = models.PositiveIntegerField() 
    reason = models.TextField()  
    requested_at = models.DateTimeField(auto_now_add=True) 
    medId=models.PositiveIntegerField()
    patient_name=models.TextField(max_length=100)


class MedicationNotification(models.Model):
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE) 
    patient_email = models.EmailField() 
    message = models.TextField()  
    created_at = models.DateTimeField(auto_now_add=True) 
    sent_at = models.DateTimeField(null=True, blank=True) 
    status = models.CharField(max_length=50, default="Pending") 

    def __str__(self):
        return f"Notification for {self.medication.heading} - {self.patient_email}"