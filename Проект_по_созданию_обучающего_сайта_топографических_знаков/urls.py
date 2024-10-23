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
from django.contrib.auth.decorators import login_required

from app1 import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.sign_up, name='registr'),
    path('project-page/', views.project_page, name='project'),
    path('signs-page/', views.signs_page, name='signs'),
    path('test-page/', views.test_page, name='test'),
    path('exam-page/', views.exam_page, name='exam'),
    path('account-page/', views.account_page, name='account'),
    path('signs-page/send_signs', views.send_signs, name='send_signs'),
    path('test-page/send_test', views.send_test, name='send_test'),
    path('exam-page/send_exam', views.send_exam, name='send_exam'),
    path('index/', views.index_page, name='index'),
    path('login/', views.sign_in, name='login'),
    path('signs-page/send_categories', views.send_categories, name='send_categories'),
    path('account-page/send_account_data', views.send_account_data, name='send_account_send'),
    path('account-page/get_account_data', views.get_account_data, name='get_account_data'),
    path('exam-page/get_exam_data', views.get_exam_data, name="get_exam_data"),
    path('account-page/send_exam_data', views.send_exam_data, name="send_exam_send"),
    path('account-page/send_to_email', views.send_to_email, name="send_to_email"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)