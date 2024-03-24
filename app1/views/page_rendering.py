from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from app1.views import send_exam_data_pdf


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
    try:
        if request.user.is_superuser:
            send_exam_data_pdf()
    except:
        pass
    return render(request, 'personal-account-page.html')