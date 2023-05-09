from django import forms
from .models import *


class SignForm(forms.ModelForm):
    class Meta:
        model = Sign
        fields = ['name', 'description', 'category', 'photo', 'realObjectPhoto']


class TestForm(forms.ModelForm):
    class Meta:
        model = Sign
        fields = ['question', 'answer', 'photo']
