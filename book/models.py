from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    title = models.CharField(max_length=250)
    synopsis = models.CharField(max_length=250)
    author = models.CharField(max_length=250)
    isbn = models.IntegerField()
    image = models.ImageField(upload_to='images', blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
