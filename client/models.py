from django.db import models

class Client(models.Model):
    
    CPF = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    birthDate = models.DateField(auto_now_add=False)
    profession = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    telephone = models.IntegerField()
   

