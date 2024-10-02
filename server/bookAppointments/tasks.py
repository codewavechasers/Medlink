from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from .models import Appointment, Notification
from medication.models import Medication
import vonage
import requests

# Initialize the Vonage client
client = vonage.Client(key="e43d4a38", secret="pMV5CUINuTwLxZAt")
sms = vonage.Sms(client)

@shared_task
def generate_notifications():
    target_date = timezone.now().date() + timedelta(days=2)

    appointments = Appointment.objects.filter(date=target_date)

    for appointment in appointments:
        message = f"Reminder: You have an appointment with Dr. {appointment.doctor_name} on {appointment.date} at {appointment.time}."
        
        # Create a notification
        Notification.objects.create(
            appointment=appointment,
            message=message,
            email=appointment.patient_email
        )

        # Send SMS
        # responseData = sms.send_message(
        #     {
        #         "from": "Vonage APIs",
        #         "to": f"254{appointment.phonenumber}", 
        #         "text": message,
        #     }
        # )

        # if responseData["messages"][0]["status"] == "0":
        #     print("SMS sent successfully.")
        # else:
        #     print(f"SMS failed with error: {responseData['messages'][0]['error-text']}")

        # Initiate a voice call
        # voice_response = initiate_voice_call(appointment.phonenumber, message)
        # if voice_response.status_code == 201:
        #     print("Voice call initiated successfully.")
        # else:
        #     print(f"Voice call failed with error: {voice_response.json()}")

  # def initiate_voice_call(to_phone_number, message):
#     # Prepare the call payload
#     call_data = {
#         "to": [
#             {
#                 "type": "phone",
#                 "number": f"254{to_phone_number}"
#             }
#         ],
#         "from": {
#             "type": "phone",
#             "number": "12345778901" 
#         },
#         "ncco": [
#             {
#                 "action": "talk",
#                 "language": "en-US",
#                 "style": 10,
#                 "premium": False,
#                 "text": message 
#             }
#         ]
#     }

#     response = requests.post(
#         'https://api.nexmo.com/v1/calls',
#         json=call_data,
#         headers={
#             'Authorization': f'Bearer {client.application_id}', 
#             'Content-Type': 'application/json',
#         }
#     )
    
#     return response
