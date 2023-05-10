from django.db import models


class Sign(models.Model):
    class Meta:
        verbose_name = "знак"
        verbose_name_plural = 'Добавить знак'

    name = models.CharField(max_length=500, verbose_name='Название знака')
    description = models.CharField(max_length=500, verbose_name='Описание знака')
    category = models.CharField(max_length=500, verbose_name='Категория знака')

    photo = models.ImageField(upload_to='images/', verbose_name='Изображение знака')
    realObjectPhoto = models.ImageField(upload_to='images/', verbose_name='Изображение реального объекта')

    def __str__(self):
        return f"{self.name}, {self.description}, {self.category}, {self.photo}, {self.realObjectPhoto}"


class Test(models.Model):
    class Meta:
        verbose_name = "новые вопросы и ответы для теста"
        verbose_name_plural = 'Настройка теста'

    question = models.CharField(max_length=500, verbose_name='Вопросы (вводить через запятую)')
    answer = models.CharField(max_length=500, verbose_name='Ответы (вводить через запятую)')

    photo = models.ImageField(upload_to='images/', verbose_name='Изображение')

    def __str__(self):
        return f"{self.question}, {self.answer}, {self.photo}"
