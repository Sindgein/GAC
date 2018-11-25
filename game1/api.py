from .models import Teams, Round
from django.http import JsonResponse


def get_ranklist(request):
    try:
        _round = request.GET.get('round')
        team_infos = [i.current_info(_round) for i in Teams.objects.all()]
        rsp = dict(
            code=0, data=dict(round=Round.get_round(), team_infos=team_infos))
    except:
        rsp = dict(code=-1, message='get ranklist error')

    return JsonResponse(rsp, safe=False)


def get_round(request):
    try:
        rsp = dict(code=0, data=dict(round=str(Round.get_round())))
    except:
        rsp = dict(code=-1, message='get round error')

    return JsonResponse(rsp, safe=False)


def set_round(request):
    try:
        Round.set_round(request.GET.get('round'))
        rsp = dict(code=0, message='set round success')
    except:
        rsp = dict(code=-1, message='set round failed')

    return JsonResponse(rsp, safe=False)


def update_ranklist(request):

    try:
        _round = request.POST.get('round')
        number = request.POST.get('number')
        score = request.POST.get('score')
        round_score = request.POST.get('round_score')
        rank = request.POST.get('rank')
        round_rank = request.POST.get('round_rank')
        trend = request.POST.get('trend')

        team = Teams.objects.get(number=int(number))
        team.set_round_info(
            int(_round), (float(score), float(round_score), int(rank),
                          int(round_rank), int(trend)))

        rsp = dict(code=0, message='team %s round %s done!' % (number, _round))

    except:
        rsp = dict(code=-1, mesaage='update ranklist error')

    return JsonResponse(rsp, safe=False)


def get_teams(request):
    try:
        rsp = dict(
            code=0,
            data=dict(teams=[
                dict(name=i.name, number=i.number)
                for i in Teams.objects.all()
            ]))
    except:
        rsp = dict(code=-1, message='get teams error')

    return JsonResponse(rsp, safe=False)
