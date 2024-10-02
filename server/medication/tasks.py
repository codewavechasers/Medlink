from .models import Medication, MedicationNotification
from django.utils import timezone
from celery import shared_task
import vonage
from patients.models import Patient

client = vonage.Client(key="e43d4a38", secret="pMV5CUINuTwLxZAt")
sms = vonage.Sms(client)

@shared_task
def send_medication_reminders():
    # Get current time to check AM/PM
    current_time = timezone.now()
    current_hour = current_time.hour

    # Morning reminder (AM)
    if 5 <= current_hour < 12:
        medications = Medication.objects.filter(am_pm__in=["am", "both"], days_left__gt=0)
    # Afternoon reminder (PM)
    elif 12 <= current_hour < 18:
        medications = Medication.objects.filter(am_pm__in=["pm", "both"], days_left__gt=0)
    # Evening reminder (PM after 6 PM)
    else:
        medications = Medication.objects.filter(am_pm="pm", days_left__gt=0)

    # Generate notifications for each medication
    for medication in medications:
        message = (f"Reminder: It's time to take your medication '{medication.heading}'. "
                   f"Take {medication.spoons} spoons {medication.after_before} meals in the {medication.am_pm}. "
                   f"You have {medication.days_left} days left of medication.")

        # Create the notification
        MedicationNotification.objects.create(
            medication=medication,
            patient_email=medication.email,
            message=message
        )
        user = Patient.objects.get(email=medication.email)
        phonenumber = user.phone_number

        # Send the SMS notification
        # responseData = sms.send_message(
        #     {
        #         "from": "Medlink",
        #         "to": f"254{phonenumber}", 
        #         "text": message,
        #     }
        # )

        # # Check SMS status
        # if responseData["messages"][0]["status"] == "0":
        #     notification.status = "Sent"
        #     notification.sent_at = timezone.now()
        #     notification.save()
        #     print(f"SMS sent to {medication.email} successfully.")
        # else:
        #     notification.status = "Failed"
        #     notification.save()
        #     print(f"Failed to send SMS to {medication.email}. Error: {responseData['messages'][0]['error-text']}")
