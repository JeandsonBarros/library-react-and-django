from email.mime import image
from rest_framework.decorators import api_view
from book.models import Book
from book.serializers import BookSerializer
from rest_framework.response import Response
from rest_framework import status, generics, viewsets
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from rest_framework.permissions import DjangoModelPermissions, IsAuthenticated, AllowAny
from rest_framework.pagination import LimitOffsetPagination

#https://drf-yasg.readthedocs.io/en/stable/custom_spec.html?highlight=APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

search_param = openapi.Parameter('title', openapi.IN_QUERY, description="Search book for title", type=openapi.TYPE_STRING)

""" ============= Start class base view ============== """
class BaseViewBooKListAndCreate(APIView, LimitOffsetPagination):

    @swagger_auto_schema(
        manual_parameters=[search_param],
        responses={200: BookSerializer(many=True)},
        operation_description="All user books /book/ or /book/?title=example")
    def get(self, request):
        books = Book.objects.filter(user=request.user)

        title = request.query_params.get('title')
        if title is not None:
            books = Book.objects.filter(title__contains=title, user=request.user)

        results = self.paginate_queryset(books, request, view=self)
        serializer = BookSerializer(results, many=True)
        return self.get_paginated_response(serializer.data,)

    
    @swagger_auto_schema(
        request_body=BookSerializer,
        operation_description="Save book")
    def post(self, request):
        
        booksSerializer = BookSerializer(data=request.data)
        if booksSerializer.is_valid():
            book = Book.objects.create(
                title = booksSerializer.data['title'],
                synopsis = booksSerializer.data['synopsis'],
                author = booksSerializer.data['author'],
                isbn = booksSerializer.data['isbn'],
                user = request.user,         
            )

            if 'image' in request.data:
                if  request.data['image'] is not None:
                    book.image = request.data['image'] 
           
            book.save()
            return Response(booksSerializer.data, status=status.HTTP_201_CREATED)
        return Response(booksSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BaseViewBookDetailChangeAndDelete(APIView):

    
    def get_object(self, user, pk):
        try:
            return Book.objects.get(pk=pk, user=user)
        except Book.DoesNotExist:
            raise NotFound()

    @swagger_auto_schema(
        responses={200: BookSerializer()},
        operation_description="Retrieve a book")
    def get(self, request, pk):
        book = self.get_object(request.user, pk)
        bookSerializer = BookSerializer(book)
        return Response(bookSerializer.data)
    
    @swagger_auto_schema(
        request_body=BookSerializer,
        operation_description="Update a book")
    def put(self, request, pk):
        book = self.get_object(request.user, pk)
        bookSerializer = BookSerializer(book, data=request.data)
        if bookSerializer.is_valid():
            bookSerializer.save()
            return Response(bookSerializer.data)
        return Response(bookSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        response=204,
        operation_description="Delete a book")
    def delete(self, request, pk):
        book = self.get_object(request.user, pk)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


""" ============ Start class generic view ============== """
""" class GenericBooKListAndCreate(generics.ListCreateAPIView):
    #permission_classes = [permissions.AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class GenericBookDetailChangeAndDelete(generics.RetrieveUpdateDestroyAPIView):
    #permission_classes = [permissions.AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookSerializer """


""" =========== Start viewsets ============= """
""" class ViewsetsBooK(viewsets.ModelViewSet):

    #permission_classes = [AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookSerializer """

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
