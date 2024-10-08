from django.urls import path
from .views import book_appointment, fetch_appointments, delete_appointment, edit_appointment, next_appointment, get_notifications

urlpatterns = [
    path('book-appointment/', book_appointment, name='book_appointment'),
    path('fetch-appointments/', fetch_appointments, name='fetch_appointments'),
    path('delete-appointment/', delete_appointment, name='delete_appointment'),
    path('edit_appointment/', edit_appointment, name='edit_appointment'),
    path('api/next-appointment/', next_appointment, name='next_appointment'),
    path('api/notifications/', get_notifications, name='get_notifications'),


]

