from django import forms
from .models import *


class SignForm(forms.ModelForm):
    class Meta:
        model = Sign
        fields = ['name', 'description', 'category', 'photo', 'realObjectPhoto']


class TestForm(forms.ModelForm):
    class Meta:
        model = Sign
        fields = ['category', 'complexity', 'photo', 'realObjectPhoto', 'question1', 'answer1',
                  'question2', 'answer2', 'question3', 'answer3', 'question4', 'answer4', 'question5', 'answer5']


class ExamForm(forms.ModelForm):
    class Meta:
        model = Sign
        fields = ['category', 'complexity', 'photo', 'realObjectPhoto', 'question1', 'answer1',
                  'question2', 'answer2', 'question3', 'answer3', 'question4', 'answer4', 'question5', 'answer5']


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Sign
        fields = ['name', 'description', 'category']
