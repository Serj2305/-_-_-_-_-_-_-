from app1.models import Sign, Category
from django.contrib import admin


@admin.register(Sign)
class SignRegister(admin.ModelAdmin):
    list_display = ("name", "description", "category", "complexity", "photo_image", "realObjectPhoto_image", 'question1', 'answer1', 'question2', 'answer2', 'question3', 'answer3', 'question4', 'answer4', 'question5', 'answer5')
    search_fields = ("name",)


@admin.register(Category)
class CategoryRegister(admin.ModelAdmin):
    list_display = ("name", "description", "category")
    search_fields = ("name",)


admin.site.site_header = 'Топографические (картографические) условные знаки'
