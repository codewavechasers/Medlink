from django.urls import path
from .views import get_users

urlpatterns = [
    path('users/', get_users, name='get_users'),
]
