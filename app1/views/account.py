from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from app1.models import AdditionalInfoUser, ExamInfo


# отправляет данные об аккаунте на фронтенд
def send_account_data(request):
    try:
        username = None
        if request.user.is_authenticated:
            username = request.user.username
        info = AdditionalInfoUser.objects.get(login=username)
        data = {'avatar': '/static/' + f'{info.avatar}', 'name': f'{info.name}', 'group': f'{info.group}',
                'is_superuser': f'{info.is_superuser}'}
    except:
        data = {'avatar': '-', 'name': '-', 'group': '-', 'is_superuser': '-'}

    return JsonResponse(data)


# получает данные об аккаунте с фронтенда
@csrf_exempt
def get_account_data(request):
    if request.user.is_authenticated:
        username = request.user.username
        t = AdditionalInfoUser.objects.get(login=username)

        t.name = request.POST.dict()['name']
        t.group = request.POST.dict()['group']
        t.is_superuser = request.user.is_superuser
        try:
            t.avatar = request.FILES['avatar']
            t.save(update_fields=["name", "group", "avatar", "is_superuser"])
        except:
            t.save(update_fields=["name", "group", "is_superuser"])
    return JsonResponse({}, status=204)


# отправляет информацию о результатах прохождени экзамена
def send_exam_data(request):
    if request.user.is_authenticated:
        data = {}
        count = 1
        for i in ExamInfo.objects.filter(login=request.user).values("res", "startTime", "time").order_by('-id')[:10][
                 ::-1]:
            data[count] = i
            count += 1
        return JsonResponse(data)
