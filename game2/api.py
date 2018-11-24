from .models import Teams, Round
from django.http import JsonResponse


def get_ranklist(request):
    _round = request.GET.get('round')
    team_infos = [i.current_info(_round) for i in Teams.objects.all()]
    rsp = dict(
        code=0, data=dict(round=Round.get_round(), team_infos=team_infos))
    return JsonResponse(rsp, safe=False)


def get_round(request):
    rsp = dict(code=0, data=dict(round=str(Round.get_round())))
    return JsonResponse(rsp, safe=False)


def set_round(request):
    Round.set_round(request.GET.get('round'))
    return JsonResponse(dict(code=0), safe=False)


def update_ranklist(request):
    print(request.POST)
    _round = request.POST.get('round')
    number = request.POST.get('number')
    score = request.POST.get('score')
    round_score = request.POST.get('round_score')
    rank = request.POST.get('rank')
    round_rank = request.POST.get('round_rank')
    trend = request.POST.get('trend')

    team = Teams.objects.get(number=int(number))
    team.set_round_info(int(_round), (float(score), float(round_score), int(rank), int(round_rank), int(trend)))

    rsp = dict(code=0, message='team %s round %s done!' % (number, _round))
    return JsonResponse(rsp, safe=False)