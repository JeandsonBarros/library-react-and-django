from django.db import models
from book.models import Book
from client.models import Client

class Loan(models.Model):
    returnDate = models.DateTimeField(auto_now_add=False)
    rentalDate = models.DateTimeField(auto_now_add=True, editable=False)
    value = models.FloatField()
    returned = models.BooleanField(default=False)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
