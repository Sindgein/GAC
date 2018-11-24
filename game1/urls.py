from django.urls import path, re_path
# from . import api
from . import views

urlpatterns = [
    path('', views.index),
    # path('api/race1/update/', api.get_ranklist),
    # path('api/race1/update/ranklist/', api.update_ranklist),
    # path('api/race1/get/round/', api.get_round),
    # path('api/race1/set/round/', api.set_round),

]