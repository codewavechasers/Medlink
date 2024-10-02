from django.urls import path
from . import views

urlpatterns = [
    path('notice-board-updates/', views.get_notice_board_updates, name='notice_board_updates'),
]