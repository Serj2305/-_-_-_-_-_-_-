from django.contrib import admin
from app1.models import Sign


@admin.register(Sign)
class PersonAdmin(admin.ModelAdmin):
    pass
