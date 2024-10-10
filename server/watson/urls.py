from django.urls import path
from .views import get_advice
urlpatterns = [
path('watson/get-advice/<int:record_id>/', get_advice, name='get_advice'),
    path('watson/get-advice/', get_advice, name='get_advice_no_id'),   ]
