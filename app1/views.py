from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.messages import get_messages
from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from readDB import read_sqlite_table


def index_page(request):
    return render(request, 'index.html')


def project_page(request):
    return render(request, 'project-page.html')


def signs_page(request):
    return render(request, 'signs-page.html')


def test_page(request):
    return render(request, 'test-page.html')


def exam_page(request):
    return render(request, 'exam-page.html')


# отправляет словарь для списка знаков
def send(request):
    return JsonResponse(read_sqlite_table("app1_sign"))


# отправляет словарь для теста
def sendTest(request):
    return JsonResponse(read_sqlite_table("app1_test"))


# Функция регистрации
def registr(request):
    # Массив для передачи данных шаблонны
    data = {}
    # Проверка что есть запрос POST
    if request.method == 'POST':
        # Создаём форму
        form = UserCreationForm(request.POST)
        # Валидация данных из формы
        if form.is_valid():
            # Сохраняем пользователя
            form.save()
            # Передача формы к рендару
            data['form'] = form
            # Передача надписи, если прошло всё успешно
            return render(request, 'registr.html', data)
        elif not form.is_valid():
            data['form'] = form
            return render(request, 'registr.html', data)
    else:
        # Создаём форму
        form = UserCreationForm()
        # Передаём форму для рендеринга
        data['form'] = form
        return render(request, 'registr.html', data)


def sign_in(request):
    form = AuthenticationForm()
    if request.method == "POST":
        form = AuthenticationForm(None, data=request.POST)
        if form.is_valid():
            form.clean()
            user = form.get_user()
            if user is not None:
                login(request, user)
                messages.info(request, 'Вы успешно зашли в аккаунт')
                return render(request, 'login.html', {'form': form})
    return render(request, 'login.html', {'form': form})
