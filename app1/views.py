import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.shortcuts import render
from django.shortcuts import redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import pathlib
from pathlib import Path

from fpdf import FPDF

from app1.models import AdditionalInfoUser, Sign, ExamInfo
from readDB import read_sqlite_table


@login_required
def index_page(request):
    return render(request, 'index.html')


@login_required
def project_page(request):
    return render(request, 'project-page.html')


@login_required
def signs_page(request):
    return render(request, 'signs-page.html')


@login_required
def test_page(request):
    return render(request, 'test-page.html')


@login_required
def exam_page(request):
    return render(request, 'exam-page.html')


@login_required
def account_page(request):
    return render(request, 'personal-account-page.html')


# отправляет словарь для списка знаков
def send(request):
    info = Sign.objects.all()
    return JsonResponse(read_sqlite_table("app1_sign"))


# отправляет словарь для теста
def sendTest(request):
    return JsonResponse(read_sqlite_table("app1_test"))


def sendExam(request):
    return JsonResponse(read_sqlite_table("app1_exam"))


def sendExamData(request):
    if request.user.is_authenticated:
        data = {}
        count = 1
        for i in ExamInfo.objects.filter(login=request.user).values("res", "startTime", "time"):
            data[count] = i
            count += 1
        return JsonResponse(data)


# Функция регистрации
def registr(request):
    if request.user.is_authenticated:
        return render(request, 'index.html')
    else:
        # Массив для передачи данных шаблонны
        data = {}
        # Проверка что есть запрос POST
        if request.method == 'POST':
            # Создаём форму
            form = UserCreationForm(request.POST)
            x = form.fields['username']
            x.label = "Почта"
            x.help_text = "Почта должна быть выдана организацией УрФУ"
            # Валидация данных из формы
            if form.is_valid() and '@urfu' in form['username'].value():
                # Сохраняем пользователя
                form.save()
                # Передача надписи, если прошло всё успешно
                response = redirect('/login/')
                return response
            else:
                data['form'] = form
                return render(request, 'registr.html', data)
        else:
            # Создаём форму
            form = UserCreationForm()
            x = form.fields['username']
            x.label = "Почта"
            x.help_text = "Почта должна быть выдана организацией УрФУ"
            # Передаём форму для рендеринга
            data['form'] = form
            return render(request, 'registr.html', data)


def sign_in(request):
    if request.user.is_authenticated:
        logout(request)
    form = AuthenticationForm()
    x = form.fields['username']
    x.label = "Почта"
    x.help_text = "Почта должна быть выдана организацией УрФУ"

    if request.method == "POST":
        form = AuthenticationForm(None, data=request.POST)
        if form.is_valid():
            form.clean()
            user = form.get_user()
            new_user = authenticate(username=form.cleaned_data['username'],
                                    password=form.cleaned_data['password'],
                                    )
            login(request, new_user)
            info, created = AdditionalInfoUser.objects.get_or_create(login=form.cleaned_data['username'])
            if created:
                pass
            else:
                info.save()
            if user is not None:
                response = redirect('/index/')
                return response
    return render(request, 'login.html', {'form': form})


def send_categories(request):
    return JsonResponse(read_sqlite_table('app1_category'))


# отправляет данные на сервер
def send_account_data(request):
    try:
        username = None
        if request.user.is_authenticated:
            username = request.user.username
        info = AdditionalInfoUser.objects.get(login=username)
        data = {'avatar': '/static/' + f'{info.avatar}', 'name': f'{info.name}', 'group': f'{info.group}', 'is_superuser': f'{info.is_superuser}'}
    except:
        data = {'avatar': '-', 'name': '-', 'group': '-', 'is_superuser': '-'}

    return JsonResponse(data)


# получает данные от сервера
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


@csrf_exempt
def get_exam_data(request):
    if request.user.is_authenticated:
        username = request.user.username
        t = ExamInfo.objects.create(
            login=username,
            res=json.loads(request.body)['res'],
            startTime=json.loads(request.body)['startTime'],
            time=json.loads(request.body)['time']
        )

        if (ExamInfo.objects.filter(login=username).count() > 10):
            ExamInfo.objects.filter(login=username)[0].delete()
            t.save(update_fields=["login", "res", "startTime", "time"])
    return JsonResponse({}, status=204)


@csrf_exempt
def print_exam_data():
    data = [["ФИО/Группа", "Результат", "Время начала", "Заняло"]]
    for j in AdditionalInfoUser.objects.all().values("login", "name", "group"):
        for i in ExamInfo.objects.filter(login=j["login"]).values("login", "res", "startTime", "time"):
            i["login"] = j["name"] + "(" + j["group"] + ")"
            data.append(i.values())
        data.append([])

    pdf = FPDF(format='A4')
    pdf.add_font('DejaVu', '', Path("static", "fonts", 'DejaVuSansCondensed.ttf'), uni=True)
    pdf.set_font('DejaVu', '', 10)
    pdf.add_page()
    pdf.cell(0, 30, txt="Результаты экзамена", ln=1, align="C")

    row_height = pdf.font_size

    for row in data:
        for item in row:
            if list(row).index(item) == 0:
                pdf.cell(pdf.w / 2, row_height * 2,
                         txt=item, border=1)
            else:
                pdf.cell(pdf.w / 8, row_height * 2,
                         txt=item, border=1)
        pdf.ln(row_height * 2)

    pdf.output(Path("static", "exam_results", "Ведомость.pdf"))


print_exam_data()
