from django.contrib.auth import authenticate, login
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from .utils import send_email 
from patients.models import Patient
from django.contrib.auth import logout

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model, login
from django.contrib.sessions.models import Session
from django.utils import timezone
import json
from django.contrib.sessions.models import Session
from django.utils import timezone
import uuid

from cryptography.fernet import Fernet
import base64


from django.contrib.sessions.models import Session
from django.utils.timezone import now

def generate_and_send_2fa_code(user):
    user.generate_and_store_otp_code()
    otp_code = user.otp_code
    subject = "Your 2FA Code"
    html_content = f"<p>Your 2FA code is: {otp_code}</p>"
    send_email(subject, user.email, html_content)

@csrf_exempt
def resend_2fa_code(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')

        # Fetch user object based on email
        user = Patient.objects.filter(email=email).first()

        if user:
            generate_and_send_2fa_code(user)
            return JsonResponse({'success': True, 'message': '2FA code resent successfully.'})
        else:
            return JsonResponse({'success': False, 'message': 'User not found.'})
    
    return JsonResponse({'success': False, 'message': 'Invalid request method'})

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # Fetch the user from the database
            user = Patient.objects.filter(email=email).first()

            # Check if user exists and password is correct
            if user and user.check_password(password):
                
                # Handle 2FA if enabled
                if user.enable_2fa:
                    generate_and_send_2fa_code(user)
                    return JsonResponse({
                        'success': True,
                        'message': '2FA code sent',
                        'user_id': user.id,
                        'email': user.email,
                        'requires_2fa': True
                    })

                # Set session expiry time
                request.session.set_expiry(2 * 60 * 60)  # 2 hours

                # Log the user in and save the session
                login(request, user)

                # Set a cookie for the session ID
                response = JsonResponse({
                    'success': True,
                    'message': 'Login successful. Welcome!',
                    'user_id': user.id,
                    'email': user.email,
                    'session_id': request.session.session_key
                })
                response.set_cookie(
                    key='sessionid',
                    value=request.session.session_key,
                    max_age=2 * 60 * 60, 
                 )
                request.session['user_id'] = user.id
                request.session['phonenumber'] = user.phone_number
                request.session['email'] = user.email
                request.session.save()                
                print("Login Session data:", request.session.items())
                print("Login Session ID:", request.session.session_key)
                
                return response
            else:
                return JsonResponse({'success': False, 'message': 'Invalid credentials'})

        except Exception as e:
            return JsonResponse({'success': False, 'message': f'An error occurred: {str(e)}'})

    return JsonResponse({'success': False, 'message': 'Invalid request method'})

@csrf_exempt
def verify_session(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            session_id = data.get('sessionId')

            if Session.objects.filter(session_key=session_id).exists():
                return JsonResponse({'valid': True})
            else:
                return JsonResponse({'valid': False})
        except Exception as e:
            return JsonResponse({'valid': False, 'error': str(e)})
    return JsonResponse({'valid': False}, status=400)

@csrf_exempt
def password_reset_request(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get('email')
        patient = Patient.objects.filter(email=email).first()
        user = patient
        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_link = f'https://medlink.gk.h.cw.co.ke/onboarding/welcome-to-medlink/auth/password/reset/?uid={uid}&token={token}'
            subject = "Password Reset Link"
            html_content = f"<p>Click <a href='{reset_link}'>here</a> to reset your password.</p>"

            email_sent = send_email(subject, email, html_content)
            if email_sent:
                return JsonResponse({'success': True, 'message': 'Password reset email sent.'})
            else:
                return JsonResponse({'success': False, 'message': 'Failed to send email. Please try again'})
        else:
            return JsonResponse({'success': False, 'message': 'Email not found.'})
    return JsonResponse({'success': False, 'message': 'Invalid request method'})
    
@csrf_exempt
def password_reset_confirm(request, uidb64, token):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            password = data.get('password')
            confirm_password = data.get('confirm_password')
            
            if not password or not confirm_password:
                return JsonResponse({'error': 'Missing fields'}, status=400)
                
            if password != confirm_password:
                return JsonResponse({'error': 'Passwords do not match'}, status=400)

            uid = force_str(urlsafe_base64_decode(uidb64))
            patient = Patient.objects.filter(pk=uid).first()
            user = patient

            if user and default_token_generator.check_token(user, token):
                user.set_password(password)
                user.save()
                return JsonResponse({'message': 'Password has been reset'})
            return JsonResponse({'error': 'Invalid token'}, status=400)
        except (TypeError, ValueError, OverflowError, Patient.DoesNotExist):
            return JsonResponse({'error': 'Invalid token or request'}, status=400)
    return HttpResponse(status=405)

@csrf_exempt
def verify_2fa(request):
    print(f"Request method: {request.method}")  # Debugging line
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            otp_code = data.get('code')
            
            print(f"Received email: {email}, code: {otp_code}")  # Debugging line

            user = Patient.objects.filter(email=email).first()
            if not user:
                return JsonResponse({'success': False, 'message': 'User not found!'})

            if user.verify_otp(otp_code):
                try:
                    request.session.set_expiry(2 * 60 * 60)  # 2 hours
                    login(request, user)
                    
                    response_data = {
                        'success': True,
                        'message': 'Verified successfully!',
                        'user_id': user.id,
                        'email': user.email,
                        'session_id': request.session.session_key
                    }
                    
                    response = JsonResponse(response_data)
                    response.set_cookie(
                        key='sessionid',
                        value=request.session.session_key,
                        max_age=2 * 60 * 60, 
                        httponly=True,  # Adds security
                        samesite='Lax'  # Adds security
                    )
                    
                    request.session['user_id'] = user.id
                    request.session['phonenumber'] = user.phone_number
                    request.session['email'] = user.email
                    request.session.save()
                    
                    print("Verification successful, response prepared")  # Debugging line
                    return response
                except Exception as e:
                    print(f"Error during login process: {str(e)}")  # Debugging line
                    return JsonResponse({'success': False, 'message': f'Login error: {str(e)}'})
            else:
                return JsonResponse({'success': False, 'message': 'Invalid 2FA code'})
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON in request body'})
        except Exception as e:
            print(f"Unexpected error: {str(e)}")  # Debugging line
            return JsonResponse({'success': False, 'message': f'An error occurred: {str(e)}'})
    return JsonResponse({'success': False, 'message': 'Invalid request method'})

@csrf_exempt
def google_signin(request):
    User = Patient.objects.all()
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': 'Invalid request method'})
    
    try:
        data = json.loads(request.body)
        email = data.get('email')
        name = data.get('name')
        google_id = data.get('google_id')
        
        if not email or not google_id:
            return JsonResponse({'success': False, 'message': 'Email and Google ID are required'})

        user, created = Patient.objects.get_or_create(
            email=email,
            defaults={
                'username': email,
                'first_name': name.split()[0] if name else '',
                'last_name': name.split()[-1] if name and len(name.split()) > 1 else '',
                'google_id': google_id,
            }
        )
        
        # Update the user's Google ID if it has changed
        if user.google_id != google_id:
            user.google_id = google_id
            user.save()

        # Log the user in (create a session)
        login(request, user)

        # Get the session key
        session_key = request.session.session_key

        return JsonResponse({
            'success': True,
            'message': 'User signed in successfully',
            'session_key': session_key,
            'user_id': user.id,
            'email': user.email,
            'name': user.get_full_name(),
        })
    
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Invalid JSON data'})
    except Exception as e:
        return JsonResponse({'success': False, 'message': f'An error occurred: {str(e)}'})


@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
       
        return JsonResponse({'success': True, 'message': 'Logged out successfully.'})
    return JsonResponse({'success': False, 'message': 'Invalid request method.'})


def authenticated_user(request):
    session_key = request.COOKIES.get('sessionid') 
    if not session_key:
        return JsonResponse({'authenticated': False}, status=401)
    
    try:
        session = Session.objects.get(pk=session_key)
        if session:
            
            user_id = session.get_decoded().get('email')
            if user_id:
                return JsonResponse({'authenticated': True, 'user_id': user_id}, status=200)
        
        return JsonResponse({'authenticated': False}, status=401)
    
    except Session.DoesNotExist:
        return JsonResponse({'authenticated': False}, status=401)



def fetch_patient_data(request):
    session_key = request.COOKIES.get('sessionid')

    if not session_key:
        return JsonResponse({'authenticated': False}, status=401)
    
    try:
        session = Session.objects.get(pk=session_key)
        session_data = session.get_decoded()
        
        email = session_data.get('email')
        
        if email:
            try:
                patient = Patient.objects.get(email=email)
                name = patient.name
                phone_number = patient.phone_number
                
                
                return JsonResponse({
                    'authenticated': True,
                    'name': name,
                    'number': phone_number,
                    'city': patient.city, 
                })
            except Patient.DoesNotExist:
                return JsonResponse({'authenticated': False, 'message': 'Patient not found'}, status=404)
        
        return JsonResponse({'authenticated': False}, status=401)
    
    except Session.DoesNotExist:
        return JsonResponse({'authenticated': False}, status=401)