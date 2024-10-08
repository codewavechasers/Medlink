from .models import Timelines, TimelineNotification
from django.utils import timezone
import vonage
from celery import shared_task
from patients.models import Patient
client = vonage.Client(key="e43d4a38", secret="pMV5CUINuTwLxZAt")
sms = vonage.Sms(client)

@shared_task
def check_timelines():
    now = timezone.now()

    timelines = Timelines.objects.filter(date=now.date(), time=now.time().replace(second=0, microsecond=0))

    for timeline in timelines:
        message = f"Reminder: {timeline.description} at {timeline.time} on {timeline.date}."
        user = Patient.objects.get(email=timeline.patient_email)
        phone_number= user.phone_number
        # responseData = sms.send_message(
        #     {
        #         "from": "Medlink",
        #         "to": f"254{phone_number}",  
        #         "text": message,
        #     }
        # )

        # status = "Sent" if responseData["messages"][0]["status"] == "0" else f"Failed: {responseData['messages'][0]['error-text']}"
        
        # Save the notification details in the database
        TimelineNotification.objects.create(
            timeline=timeline,
            message=message,
            recipient=timeline.patient_name,
            recipient_email=timeline.patient_email,
            # status=status,
        )

        # if status == "Sent":
        #     print("Notification sent successfully.")
        # else:
        #     print(f"Notification failed with error: {responseData['messages'][0]['error-text']}")
