from django.db import models


class Sign(models.Model):
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=50)

    objectOnTheMap = models.ImageField(upload_to='images/')
    objectInThePhoto = models.ImageField(upload_to='images/')

    def __str__(self):
        return f"{self.name}, {self.category}, {self.objectOnTheMap}, {self.objectInThePhoto}"
