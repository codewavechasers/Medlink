from django.urls import path
from .views import get_advice,get_response
urlpatterns = [
    path('watson/get-advice/<int:record_id>/', get_advice, name='get_advice'),
    path('watson/get-advice/', get_advice, name='get_advice_no_id'),   
    path('watson/get-response/', get_response, name='get_response'),   
    
    ]
