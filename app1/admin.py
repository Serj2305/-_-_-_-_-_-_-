from django.contrib import admin
from app1.models import Sign, Test


@admin.register(Sign, Test)
class PersonAdmin(admin.ModelAdmin):
    pass
