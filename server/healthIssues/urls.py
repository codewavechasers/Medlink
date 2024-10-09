# urls.py
from django.urls import path
from .views import report_health_issue, getHealthRecords, calculate_overall_health_score

urlpatterns = [
    path('health-issues/', report_health_issue, name='report_health_issue'),
    path('health-records/', getHealthRecords, name='Health Records'),
    path('get-overall-healthscore/', calculate_overall_health_score, name='calculate_overall_health_score'),
]
