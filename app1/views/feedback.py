from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from Проект_по_созданию_обучающего_сайта_топографических_знаков import settings


# берет данные из формы обратной связи и отправляет на почту
@csrf_exempt
def send_to_email(request):
    if request.user.is_authenticated:
        name = request.POST.dict()['name']
        email = request.POST.dict()['email']
        feedback = request.POST.dict()['feedback']
        try:
            send_mail(name + "(" + email + ")", feedback, settings.EMAIL_HOST_USER, ['studysigns.project@mail.ru'])
        except:
            pass

    return JsonResponse({}, status=204)
