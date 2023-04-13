from django.shortcuts import render

from app1.forms import SignForm


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
