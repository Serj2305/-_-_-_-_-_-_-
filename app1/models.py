from django.db import models


class Sign(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=50)
    category = models.CharField(max_length=50)

    photo = models.ImageField(upload_to='images/')

    def __str__(self):
        return f"{self.name}, {self.category}, {self.category}, {self.photo}"
