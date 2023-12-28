from django import forms
from .models import *


class SignForm(forms.ModelForm):
    class Meta:
        model = Sign
        fields = ['name', 'description', 'category', 'complexity', 'photo', 'realObjectPhoto', 'question1', 'answer1',
                  'question2', 'answer2', 'question3', 'answer3', 'question4', 'answer4', 'question5', 'answer5']


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Sign
        fields = ['name', 'description', 'category']
