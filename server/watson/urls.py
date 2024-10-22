from django.urls import path
from .views import get_advice,get_response, report_health_issues, get_health_score,add_timeline, get_timelines, edit_appointment, get_appointments, delete_appointment, book_appointment, get_doctor_notes,get_medication
urlpatterns = [
    path('watson/get-advice/<int:record_id>/', get_advice, name='get_advice'),
    path('watson/get-advice/', get_advice, name='get_advice_no_id'),   
    path('watson/get-response/', get_response, name='get_response'),   
    path('watson/report-health-issue/', report_health_issues, name='report_health_issues'),   
    path('watson/get-health-score/', get_health_score, name='get_health_score'),   
    path('watson/add-timeline/', add_timeline, name='add_timeline'),   
    path('watson/get-timeline/', get_timelines, name='get_timelines'),   
    path('watson/edit-appointment/', edit_appointment, name='edit_appointment'),   
    path('watson/get-appointments/', get_appointments, name='get_appointments'),   
    path('watson/delete-appointment/', delete_appointment, name='delete_appointment'),   
    path('watson/book-appointment/', book_appointment, name='book_appointment'),   
    path('watson/get-doctor-notes/', get_doctor_notes, name='get_doctor_notes'),   
    path('watson/medication/', get_medication, name='get_medication'),   
    
    
    ]
