from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from app1.views import send_exam_data_xlsx


@login_required
def index_page(request):
    """
    Данная функция отрисовывает начальную страницу
    """
    return render(request, 'index.html')


@login_required
def project_page(request):
    """
    Данная функция отрисовывает страницу о нас
    """
    return render(request, 'project-page.html')


@login_required
def signs_page(request):
    """
    Данная функция отрисовывает страницу со знаками (вкладка "Смотреть")
    """
    return render(request, 'signs-page.html')


@login_required
def test_page(request):
    """
    Данная функция отрисовывает страницу теста
    """
    return render(request, 'test-page.html')


@login_required
def exam_page(request):
    """
    Данная функция отрисовывает страницу экзамена
    """
    return render(request, 'exam-page.html')


@login_required
def account_page(request):
    """
    Данная функция отрисовывает страницу личного кабинета
    """
    try:
        if request.user.is_superuser:
            send_exam_data_xlsx()
    except:
        pass
    return render(request, 'personal-account-page.html')
