from django.urls import path
from .views import send_message, start_new_chat
urlpatterns = [
    path('start_new_chat/', start_new_chat, name="start_new_chat"),
    path('send_message/', send_message, name="send_message")
]
