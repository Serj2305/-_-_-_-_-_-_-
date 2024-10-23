from django.db import models
from django.utils.safestring import mark_safe


class Category(models.Model):
    class Meta:
        verbose_name = 'категорию знака'
        verbose_name_plural = 'Категория'

    name = models.CharField(max_length=5000, verbose_name='Название')
    description = models.CharField(max_length=5000, verbose_name='Описание', blank=True)
    category = models.CharField(max_length=5000, verbose_name='Категория')

    def __str__(self):
        return f"{self.name}, {self.description}, {self.category}"


def __str__(self):
    return str(self.user)


class Sign(models.Model):
    class Meta:
        verbose_name = "знак"
        verbose_name_plural = 'Добавить знак (Смотреть)'

    name = models.CharField(max_length=500, verbose_name='Название знака')
    description = models.CharField(max_length=500, verbose_name='Описание знака', blank=True)
    category = models.CharField(max_length=500, verbose_name="Категория")
    photo = models.ImageField(upload_to='images/', verbose_name='Изображение знака')
    realObjectPhoto = models.ImageField(upload_to='images/', verbose_name='Изображение реального объекта', blank=True)

    def photo_image(self):
        if self.photo:
            return mark_safe('<img src="%s" style="width: 100px; height:100px;" />' % self.photo.url)
        else:
            return 'No Image Found'

    photo_image.short_description = 'Изображение знака'

    def realObjectPhoto_image(self):
        if self.realObjectPhoto:
            return mark_safe('<img src="%s" style="width: 100px; height:100px;" />' % self.realObjectPhoto.url)
        else:
            return 'No Image Found'

    realObjectPhoto_image.short_description = 'Изображение реального объекта'

    def __str__(self):
        return f"{self.name}, {self.description}, {self.category}," \
               f" {self.photo}, {self.realObjectPhoto}"


class Test(models.Model):
    class Meta:
        verbose_name = "знак"
        verbose_name_plural = 'Добавить знак (Тест)'

    category = models.CharField(max_length=500, verbose_name="Категория")
    complexity = models.CharField(max_length=500, choices=[("A", "А"), ("B", "B"), ("C", "C")],
                                  verbose_name="Сложность")

    photo = models.ImageField(upload_to='images/', verbose_name='Изображение знака')
    realObjectPhoto = models.ImageField(upload_to='images/', verbose_name='Изображение реального объекта', blank=True)

    question1 = models.CharField(max_length=500, verbose_name="Вопрос 1", blank=True)
    answer1 = models.CharField(max_length=500, verbose_name="Ответ 1", blank=True)
    question2 = models.CharField(max_length=500, verbose_name="Вопрос 2", blank=True)
    answer2 = models.CharField(max_length=500, verbose_name="Ответ 2", blank=True)
    question3 = models.CharField(max_length=500, verbose_name="Вопрос 3", blank=True)
    answer3 = models.CharField(max_length=500, verbose_name="Ответ 3", blank=True)
    question4 = models.CharField(max_length=500, verbose_name="Вопрос 4", blank=True)
    answer4 = models.CharField(max_length=500, verbose_name="Ответ 4", blank=True)
    question5 = models.CharField(max_length=500, verbose_name="Вопрос 5", blank=True)
    answer5 = models.CharField(max_length=500, verbose_name="Ответ 5", blank=True)

    def photo_image(self):
        if self.photo:
            return mark_safe('<img src="%s" style="width: 100px; height:100px;" />' % self.photo.url)
        else:
            return 'No Image Found'

    photo_image.short_description = 'Изображение знака'

    def realObjectPhoto_image(self):
        if self.realObjectPhoto:
            return mark_safe('<img src="%s" style="width: 100px; height:100px;" />' % self.realObjectPhoto.url)
        else:
            return 'No Image Found'

    realObjectPhoto_image.short_description = 'Изображение реального объекта'

    def __str__(self):
        return f"{self.category}," \
               f"{self.complexity}, {self.photo}, {self.realObjectPhoto}, {self.question1}, {self.answer1}" \
               f"{self.question2}, {self.answer2}, {self.question3}, {self.answer3}, {self.question4}, {self.answer4}" \
               f"{self.question5}, {self.answer5}"


class Exam(models.Model):
    class Meta:
        verbose_name = "знак"
        verbose_name_plural = 'Добавить знак (Экзамен)'

    category = models.CharField(max_length=500, verbose_name="Категория")
    complexity = models.CharField(max_length=500, choices=[("A", "А"), ("B", "B"), ("C", "C")],
                                  verbose_name="Сложность")

    photo = models.ImageField(upload_to='images/', verbose_name='Изображение знака')
    realObjectPhoto = models.ImageField(upload_to='images/', verbose_name='Изображение реального объекта', blank=True)

    question1 = models.CharField(max_length=500, verbose_name="Вопрос 1", blank=True)
    answer1 = models.CharField(max_length=500, verbose_name="Ответ 1", blank=True)
    question2 = models.CharField(max_length=500, verbose_name="Вопрос 2", blank=True)
    answer2 = models.CharField(max_length=500, verbose_name="Ответ 2", blank=True)
    question3 = models.CharField(max_length=500, verbose_name="Вопрос 3", blank=True)
    answer3 = models.CharField(max_length=500, verbose_name="Ответ 3", blank=True)
    question4 = models.CharField(max_length=500, verbose_name="Вопрос 4", blank=True)
    answer4 = models.CharField(max_length=500, verbose_name="Ответ 4", blank=True)
    question5 = models.CharField(max_length=500, verbose_name="Вопрос 5", blank=True)
    answer5 = models.CharField(max_length=500, verbose_name="Ответ 5", blank=True)

    def photo_image(self):
        if self.photo:
            return mark_safe('<img src="%s" style="width: 100px; height:100px;" />' % self.photo.url)
        else:
            return 'No Image Found'

    photo_image.short_description = 'Изображение знака'

    def realObjectPhoto_image(self):
        if self.realObjectPhoto:
            return mark_safe('<img src="%s" style="width: 100px; height:100px;" />' % self.realObjectPhoto.url)
        else:
            return 'No Image Found'

    realObjectPhoto_image.short_description = 'Изображение реального объекта'

    def __str__(self):
        return f"{self.category}," \
               f"{self.complexity}, {self.photo}, {self.realObjectPhoto}, {self.question1}, {self.answer1}" \
               f"{self.question2}, {self.answer2}, {self.question3}, {self.answer3}, {self.question4}, {self.answer4}" \
               f"{self.question5}, {self.answer5}"


class AdditionalInfoUser(models.Model):
    login = models.CharField(max_length=500, verbose_name='Логин', default="Логин")
    avatar = models.ImageField(upload_to="avatars/", verbose_name="Аватарка", default="img/personal-img.png")
    name = models.CharField(max_length=500, verbose_name='ФИО', default="Фамилия Имя Отчество")
    group = models.CharField(max_length=500, verbose_name="Группа", default="Ваша группа")
    is_superuser = models.CharField(max_length=500, verbose_name='Суперпользователь', default=False)


class ExamInfo(models.Model):
    login = models.CharField(max_length=500, verbose_name='Логин', default="Логин")
    res = models.CharField(max_length=500, verbose_name="Результат", default="-")
    startTime = models.CharField(max_length=500, verbose_name='Время начала экзамена', default="-")
    time = models.CharField(max_length=500, verbose_name='Время прохождения экзамена', default="-")
