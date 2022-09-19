from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=250)
    synopsis = models.CharField(max_length=250)
    author = models.CharField(max_length=250)
    isbn = models.IntegerField()
