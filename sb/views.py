from django.shortcuts import render
from django.contrib.auth.decorators import login_required


# Create your views here.
@login_required
def game1(request):
    return render(request,'game1sb.html')

@login_required
def game2(request):
    return render(request,'game2sb.html')