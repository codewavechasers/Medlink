import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def event_url(request):
    data = json.loads(request.body.decode('utf-8'))
    # Handle call events such as ringing, completed, etc.
    return JsonResponse({'status': 'event received', 'data': data})


@csrf_exempt
def fallback_url(request):
    data = json.loads(request.body.decode('utf-8'))
    # Handle fallback scenarios (e.g., play default message)
    return JsonResponse({'status': 'fallback', 'data': data})


@csrf_exempt
def answer_url(request):
    data = json.loads(request.body.decode('utf-8'))
    # Handle the call when answered (e.g., start conversation or play a message)
    return JsonResponse({'status': 'answered', 'data': data})
