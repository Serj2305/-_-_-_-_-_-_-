from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from app1.models import AdditionalInfoUser, ExamInfo


@csrf_exempt
def get_account_data(request):
    """
    Данная функция берет информацию о пользователе, которую он заполняет в личном кабинете
    (аватарку, имя, группу) и сохраняет эту информацию в базе данных
    """
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


def send_account_data(request):
    """
    Данная функция берет из базы данных информацию о пользователе, которую он заполняет в личном кабинете
    (путь до аватарки, имя, группу), и отпрвляет эту информацию на фронтенд для вывода
    """
    try:
        username = None

        if request.user.is_authenticated:
            username = request.user.username

        info = AdditionalInfoUser.objects.get(login=username)
        data = {'avatar': '/media/' + f'{info.avatar}', 'name': f'{info.name}', 'group': f'{info.group}',
                'is_superuser': f'{info.is_superuser}', 'email': f'{username}'}
    except:
        data = {'avatar': '-', 'name': '-', 'group': '-', 'is_superuser': '-', 'email': '-'}

    return JsonResponse(data)


def send_exam_data(request):
    """
    Данная функция отправляет информацию о результатах прохождения экзамена на фронтент в личный кабинет
    (результат, время начала, время прохождения). Если в базе данных больше 10 записей, берет последние 10
    """
    if request.user.is_authenticated:
        data = {}
        count = 1
        for i in ExamInfo.objects.filter(login=request.user).values("res", "startTime", "time").order_by('-id')[:10][
                 ::-1]:
            data[count] = i
            count += 1
        return JsonResponse(data)
