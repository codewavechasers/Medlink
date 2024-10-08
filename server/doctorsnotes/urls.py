from django.urls import path
from . import views

urlpatterns = [
    path('doctornotes/', views.get_doctor_notes, name='get_doctor_notes'),
    path('doctornotes/delete/', views.delete_doctor_notes, name='delete_doctor_notes'),
    path('doctornotes/save/', views.save_doctor_notes, name='save_doctor_notes'),
    path('doctornotes/download/', views.save_doctor_notes, name='download_doctor_notes'),
]
