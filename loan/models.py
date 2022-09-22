from django.db import models
from book.models import Book
from client.models import Client
from django.contrib.auth.models import User

class Loan(models.Model):
    returnDate = models.DateTimeField(auto_now_add=False)
    rentalDate = models.DateTimeField(auto_now_add=True, editable=False)
    value = models.FloatField()
    returned = models.BooleanField(default=False)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
