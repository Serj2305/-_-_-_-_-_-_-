from django.db import models

from readDB import read_sqlite_table


class Sign(models.Model):
    categories = tuple(read_sqlite_table('app1_category', list=True))

    class Meta:
        verbose_name = "знак"
        verbose_name_plural = 'Добавить знак'

    name = models.CharField(max_length=500, verbose_name='Название знака')
    description = models.CharField(max_length=500, verbose_name='Описание знака', blank=True)
    category = models.CharField(max_length=1, choices=categories, verbose_name="Категория")

    photo = models.ImageField(upload_to='images/', verbose_name='Изображение знака')
    realObjectPhoto = models.ImageField(upload_to='images/', verbose_name='Изображение реального объекта', blank=True)

    def __str__(self):
        return f"{self.name}, {self.description}, {self.category}, {self.photo}, {self.realObjectPhoto}"


class Test(models.Model):
    class Meta:
        verbose_name = "новые вопросы и ответы для теста"
        verbose_name_plural = 'Настройка теста'

    question = models.CharField(max_length=500, verbose_name='Вопросы (вводить через запятую)')
    answer = models.CharField(max_length=500, verbose_name='Ответы (вводить через запятую)')
    photo = models.ImageField(upload_to='images/', verbose_name='Изображение')
    realObjectPhoto = models.ImageField(upload_to='images/', verbose_name='Изображение реального объекта', blank=True)

    def __str__(self):
        return f"{self.question}, {self.answer}, {self.photo}, {self.realObjectPhoto}"


class Category(models.Model):
    class Meta:
        verbose_name = 'категорию знака'
        verbose_name_plural = 'Категория'

    name = models.CharField(max_length=500, verbose_name='Название')
    description = models.CharField(max_length=500, verbose_name='Описание', blank=True)
    category = models.CharField(max_length=500, verbose_name='Категория')

    def __str__(self):
        return f"{self.name}, {self.description}, {self.category}"
