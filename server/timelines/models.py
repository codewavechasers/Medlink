from django.db import models
from django.utils import timezone

class Timelines(models.Model):
   

    date = models.DateField()
    time = models.TimeField()
    description = models.TextField(max_length=255)
    patient_name = models.CharField(max_length=100)
    patient_email = models.EmailField(max_length=100)
    long_description = models.TextField()
    def __str__(self):
        return f"Reminder on {self.date} for {self.description}"

class TimelineNotification(models.Model):
    timeline = models.ForeignKey('Timelines', on_delete=models.CASCADE, related_name="notifications")
    message = models.TextField()  # The message that was sent
    sent_at = models.DateTimeField(default=timezone.now)  # Timestamp when the notification was sent
    recipient = models.CharField(max_length=100)  # Name of the recipient
    recipient_email = models.EmailField()  # Email of the recipient
    # status = models.CharField(max_length=20)  # Status of the notification (e.g., 'Sent', 'Failed')

    def __str__(self):
        return f"Notification for {self.timeline} sent to {self.recipient}"