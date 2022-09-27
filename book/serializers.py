from book.models import Book
from rest_framework import serializers


class BookSerializer(serializers.ModelSerializer):

    image = serializers.FileField(required=False)

    class Meta:
        model = Book
        fields = ['id', 'title', 'synopsis', 'author', 'isbn', 'image'] 

       