from rest_framework.decorators import api_view
from book.models import Book
from book.serializers import BookSerializer
from rest_framework.response import Response
from rest_framework import status, generics, viewsets
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from rest_framework.permissions import DjangoModelPermissions, IsAuthenticated, AllowAny

""" =========== Start viewsets ============= """

class ViewsetsBooK(viewsets.ModelViewSet):

    #permission_classes = [IsAuthenticated]

    queryset = Book.objects.all()
    serializer_class = BookSerializer
   


""" ============ Start class generic view ============== """

""" class GenericBooKListAndCreate(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class GenericBookDetailChangeAndDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer 
"""


""" ============= Start class base view ============== """

""" class BooKListAndCreate(APIView):
    def get(self, request):
        books = Book.objects.all()
        booksSerializer = BookSerializer(books, many=True)
        return Response(booksSerializer.data)
    
    def post(self, request):
        booksSerializer = BookSerializer(data=request.data)
        if booksSerializer.is_valid():
            booksSerializer.save()
            return Response(booksSerializer.data, status=status.HTTP_201_CREATED)
        return Response(booksSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookDetailChangeAndDelete(APIView):

    def get_object(self, pk):
        try:
            return Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            raise NotFound()

    def get(self, request, pk):
        book = self.get_object(pk)
        bookSerializer = BookSerializer(book)
        return Response(bookSerializer.data)
    
    def put(self, request, pk):
        book = self.get_object(pk)
        bookSerializer = BookSerializer(book, data=request.data)
        if bookSerializer.is_valid():
            bookSerializer.save()
            return Response(bookSerializer.data)
        return Response(bookSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        book = self.get_object(pk)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) """


""" =========== Start api_view ============= """

""" @api_view(['GET', 'POST'])
def listBooks(request):

    if request.method == 'GET':
        books = Book.objects.all()
        booksSerializer = BookSerializer(books, many=True)
        return Response(booksSerializer.data)

    elif request.method == 'POST':
        booksSerializer = BookSerializer(data=request.data)
        if booksSerializer.is_valid():
            booksSerializer.save()
            return Response(booksSerializer.data, status=status.HTTP_201_CREATED)
        return Response(booksSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def bookDetailsPutDelete(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        bookSerializer = BookSerializer(book)
        return Response(bookSerializer.data)

    elif request.method == 'PUT':
        bookSerializer = BookSerializer(book, data=request.data)
        if bookSerializer.is_valid():
            bookSerializer.save()
            return Response(bookSerializer.data)
        return Response(bookSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) """
