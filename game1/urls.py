from django.urls import path, re_path
from . import api
from . import views

urlpatterns = [
    path('', views.index),
    path('api/update/', api.get_ranklist),
    path('api/update/ranklist/', api.update_ranklist),
    path('api/get/round/', api.get_round),
    path('api/set/round/', api.set_round),
]