from django.urls import path
from .views import set_reminder, get_reminders, get_notifications
urlpatterns = [
    path('set-timeline/', set_reminder, name="set_reminder"),
    path('get-timeline/', get_reminders, name="get_reminder"),
    path('get-timeline-notifications/', get_notifications, name="get_notifications")
]
