from django.urls import path, re_path
from . import views
urlpatterns = [
    path('game1/', views.game1),
    path('game2/', views.game2),
]