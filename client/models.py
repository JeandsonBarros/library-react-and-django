from django.db import models
from django.contrib.auth.models import User

class Client(models.Model):
    
    CPF = models.IntegerField()
    name = models.CharField(max_length=255)
    birthDate = models.DateField(auto_now_add=False)
    profession = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    telephone = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
   

