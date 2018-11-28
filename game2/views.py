from django.shortcuts import render
from .models import Round

# Create your views here.

def index(request):
    rounds = Round.get_total_rounds()
    return render(request, 'game2.html', locals())