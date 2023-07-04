from django.shortcuts import render
# Подключение стандартной формы для регистрации
from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
from readDB import read_sqlite_table


def index_page(request):
    return render(request, 'index.html')


# Create your views here.
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
            data['res'] = "Всё прошло успешно"
            return render(request, 'registr.html', data)
        elif not form.is_valid():
            data['form'] = form
            data['res'] = "Ошибка"
            return render(request, 'registr.html', data)
    else:  # Иначе
        # Создаём форму
        form = UserCreationForm()
        # Передаём форму для рендеринга
        data['form'] = form
        data['res'] = "Mistakes"
        return render(request, 'registr.html', data)

