from django.contrib import admin

from app1.models import Sign, Test


@admin.register(Sign)
class SignRegister(admin.ModelAdmin):
    pass


@admin.register(Test)
class TestRegister(admin.ModelAdmin):
    fieldsets = (
        ("Сторона карточки с вопросами", {
            'fields': ('question', 'answer'),
        }),
        ("Общее", {
            'fields': ('photo',),
            'description': "Данные поля используются в обеих карточках"
        }),
        ("Сторона карточки с ответами", {
            'fields': ('name', 'description', 'realObjectPhoto'),
        }),
    )


admin.site.site_header = 'Топографические (картографические) условные знаки'
