from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_exempt
from .models import NoticeBoard

@require_GET
@csrf_exempt
def get_notice_board_updates(request):
    notices = NoticeBoard.objects.filter(is_active=True).order_by('-created_at')[:5]  # Get the 5 most recent active notices
    updates = [{'title': notice.title, 'content': notice.content,  'created_at': notice.created_at.isoformat()
} for notice in notices]
    return JsonResponse({'updates': updates})