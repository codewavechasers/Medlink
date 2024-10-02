from django.urls import path
from .views import get_medications_by_email, refill_medication,subscription_count,get_notifications

urlpatterns = [
    path('medication/refill/', refill_medication, name='refill_medication'),
    path('medication/', get_medications_by_email, name='get_medications_by_email'),
    path('subscription-count/', subscription_count, name='subscription_count'),
    path('get-notifications/', get_notifications, name='get_notifications'),

]
