from django.db import models


class Sign(models.Model):
    name = models.CharField(max_length=500)
    description = models.CharField(max_length=500)
    category = models.CharField(max_length=500)

    photo = models.ImageField(upload_to='images/')

    def __str__(self):
        return f"{self.name}, {self.category}, {self.category}, {self.photo}"


class Test(models.Model):
    question = models.CharField(max_length=500)
    answer = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.question}, {self.answer}"
