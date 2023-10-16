from app1.models import Sign, Test, Category
from django.contrib import admin


@admin.register(Sign)
class SignRegister(admin.ModelAdmin):
    list_display = ("name", "description", "category", "photo_image", "realObjectPhoto_image")
    search_fields = ("name", )


@admin.register(Test)
class TestRegister(admin.ModelAdmin):
    fieldsets = (
        ("Сторона карточки с вопросами", {
            'fields': ('question', 'answer'),
        }),
        ("Общее", {
            'fields': ('photo',),
        }),
        ("Сторона карточки с ответами", {
            'fields': ('realObjectPhoto',),
        }),
    )
    list_display = ("question", "answer", "photo_image", "realObjectPhoto_image")
    search_fields = ("question", "answer",)


@admin.register(Category)
class CategoryRegister(admin.ModelAdmin):
    list_display = ("name", "description", "category")
    search_fields = ("name",)


admin.site.site_header = 'Топографические (картографические) условные знаки'
