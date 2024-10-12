
from .views import event_url, answer_url, fallback_url
from django.urls import path
urlpatterns = [
    path('/fallback/', fallback_url, name='fallback_url'),
    path('/event/', event_url, name='event_url'),
    path('/answer/', answer_url, name='answer_url'),

]
