from django.http import JsonResponse
from .models import Doctors_call

def get_users(request):
    users = Doctors_call.objects.all()
    user_data = [
        {
            "name": user.name,
            "online": user.online,
            "peerId": user.peer_id,
        }
        for user in users
    ]
    return JsonResponse(user_data, safe=False)
