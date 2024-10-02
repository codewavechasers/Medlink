from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
import json
from .models import Chat, Message
from django.contrib.auth import get_user_model


@csrf_exempt
def start_new_chat(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        User = get_user_model()  # Get the user model
        user = User.objects.get(id=data['user'])  # Retrieve the User instance using the provided ID
        chat = Chat.objects.create(user=user, started_at=timezone.now())
        return JsonResponse({"chat_id": chat.id})

@csrf_exempt
def send_message(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        chat = Chat.objects.get(id=data['chat_id'])
        message = Message.objects.create(chat=chat, content=data['message'], sent_at=timezone.now())
        return JsonResponse({"message_id": message.id})

def get_messages(request, chat_id):
    chat = Chat.objects.get(id=chat_id)
    messages = chat.messages.all()
    return JsonResponse({"messages": [{"content": msg.content, "sent_at": msg.sent_at} for msg in messages]})
