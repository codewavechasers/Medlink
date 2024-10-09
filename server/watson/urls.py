from django.urls import path
from .views import analyze_data
urlpatterns = [
    path('api/analysis/', analyze_data, name="analyzeData"),
   ]
