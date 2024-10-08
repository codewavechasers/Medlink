# authentication/urls.py
from django.urls import path
from .views import login_view, logout_view, authenticated_user, fetch_patient_data
from .views import password_reset_request, password_reset_confirm, verify_2fa, resend_2fa_code, google_signin, verify_session

urlpatterns = [
    path('login/', login_view, name='login'),
    path('password/reset/', password_reset_request, name='password_reset_request'),
    path('verify_2fa/', verify_2fa, name='verify_2fa'),
    path('resend-2fa-code/', resend_2fa_code, name='resend-2fa-code'),
    path('password/reset/confirm/<uidb64>/<token>/', password_reset_confirm, name='password_reset_confirm'),
    path('google-signin/', google_signin, name='google_signin'),
    path('verify-session/', verify_session, name='verify_session'),
    path('logout/', logout_view, name='logout'),
    path('authenticated_user/', authenticated_user, name='authenticated_user'),
    path('user-data/', fetch_patient_data, name='user-data'),


]
