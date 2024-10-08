from django.db import models

class Appointment(models.Model):
    PERIOD_CHOICES = [
        ('Morning', 'Morning'),
        ('Afternoon', 'Afternoon'),
        ('Evening', 'Evening'),
    ]

    CONSULTATION_TYPE_CHOICES = [
        ('video', 'Video Consultation'),
        ('inPerson', 'In-person Consultation'),
    ]

    doctor_name = models.CharField(max_length=100)
    speciality = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    period = models.CharField(max_length=10, choices=PERIOD_CHOICES)
    consultation_type = models.CharField(max_length=10, choices=CONSULTATION_TYPE_CHOICES)
    problem_description = models.TextField()
    patient_name = models.CharField(max_length=100)
    patient_email = models.EmailField(default='')
    doctor_image = models.CharField(max_length=100)
    phonenumber=models.CharField(max_length=15, default='')
    def __str__(self):
        return f"Appointment with Dr. {self.doctor_name} on {self.date} at {self.time}"

class Notification(models.Model):
    appointment = models.ForeignKey('Appointment', on_delete=models.CASCADE)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_sent = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.appointment.patient_name} - {self.message[:20]}"
