from django.test import TestCase

import resend
from django.conf import settings
def send_email(subject, to, html_content):
    resend.api_key = settings.RESEND_API_KEY

    params = {
        "from": "Medlink <no-reply@engineerketer.dev>", 
        "to": to,
        "subject": subject,
        "html": html_content,
    }

    try:
        email = resend.Emails.send(params)
        return email
    except Exception as e:
        print(f"Appologies! Failed to send email. Please try again.: {e}")
        return None
subject = "Test Email"
to = ["gilbertketer759@gmail.com"]
html_content = "<strong>it works!</strong>"

email = send_email(subject, to, html_content)
print(email)
