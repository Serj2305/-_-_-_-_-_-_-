from django import forms
from .models import *


class SignForm(forms.ModelForm):
    class Meta:
        model = Sign
        fields = ['name', 'description', 'category', 'photo']