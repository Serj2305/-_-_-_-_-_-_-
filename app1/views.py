from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.shortcuts import render
from django.shortcuts import redirect
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

def account_page(request):
    return render(request, 'personal-account-page.html')

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
    form = AuthenticationForm()
    if request.method == "POST":
        form = AuthenticationForm(None, data=request.POST)
        if form.is_valid():
            form.clean()
            user = form.get_user()
            if user is not None:
                response = redirect('/index/')
                return response
    return render(request, 'login.html', {'form': form})


def send_categories(request):
    return JsonResponse(read_sqlite_table('app1_category'))
