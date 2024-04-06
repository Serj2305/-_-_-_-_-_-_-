from django.contrib.auth import logout, authenticate, login
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.shortcuts import render, redirect

from app1.models import AdditionalInfoUser


def sign_up(request):
    """
    Данная функция реализует функционал регистрации на сайте
    """
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
    """
    Данная функция реализует функционал входа на сайт
    """
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
