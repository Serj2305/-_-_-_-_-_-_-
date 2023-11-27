"""Проект_по_созданию_обучающего_сайта_топографических_знаков URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from app1 import views
from app1.views import project_page, signs_page, test_page, exam_page, account_page

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.registr, name='registr'),
    path('project-page/', project_page, name='project'),
    path('signs-page/', signs_page, name='signs'),
    path('test-page/', test_page, name='test'),
    path('exam-page/', exam_page, name='exam'),
    path('account-page/', account_page, name='account'),
    path('signs-page/send', views.send, name='send'),
    path('test-page/sendTest', views.sendTest, name='sendTest'),
    path('exam-page/sendExam', views.sendExam, name='sendExam'),
    path('index/', views.index_page, name='index'),
    path('login/', views.sign_in, name='login'),
    path('signs-page/send_categories', views.send_categories, name='categories'),
    path('account-page/send_account_data', views.send_account_data, name='account_send'),
    path('account-page/get_account_data', views.get_account_data, name='account_get'),
    path('exam-page/get_exam_data', views.get_exam_data, name="exam_get"),
    path('account-page/sendExamData', views.sendExamData, name="exam_send"),
]

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)
