import resend
from django.conf import settings

# Make sure to add your Resend API key to Django settings securely
resend.api_key = "re_7NTdX12j_BEBuasWwELRx7DFa9JppYao9"

def send_email(subject, to, html_content):
    params = {
        "from": "Medlink <no-reply@engineerketer.dev>", 
        "to": to,
        "subject": subject,
        "html": html_content,
    }

    try:
        # Sending the email using Resend API
        email = resend.Emails.send(params)
        return email
    except Exception as e:
        print(f"Failed to send email: {e}")
        return None

# Example usage
subject = "Test Email"
to = ["gilbertketer759@gmail.com"]  # You can add multiple recipients in the list
html_content = "<strong>This is a test email via Resend!</strong>"

email = send_email(subject, to, html_content)
print(email)
