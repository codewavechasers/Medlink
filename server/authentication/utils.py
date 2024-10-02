import resend
from django.conf import settings

def send_email(subject, to, html_content):
    resend.api_key = settings.RESEND_API_KEY

    params = {
        "from": "Medlink <delivered@resend.dev>",
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
