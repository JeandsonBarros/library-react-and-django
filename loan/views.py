from rest_framework import  generics, status
from loan.models import Loan
from loan.serializers import LoanSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.pagination import LimitOffsetPagination

from client.models import Client
from book.models import Book

#https://drf-yasg.readthedocs.io/en/stable/custom_spec.html?highlight=APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

search_param = openapi.Parameter('book', openapi.IN_QUERY, description="Search loan for book id", type=openapi.TYPE_INTEGER)
returned = openapi.Parameter(
    'returned',
    openapi.IN_QUERY,
    description="List orders for books that have already been returned",
    type=openapi.TYPE_BOOLEAN)

class LoanListAndCreate(APIView, LimitOffsetPagination):
    
   
    def getBook(self, user, pk):
        try:
            return Book.objects.get(pk=pk, user=user)
        except Book.DoesNotExist:
            raise NotFound()

    def getClient(self, user, pk):
        try:
            return Client.objects.get(pk=pk, user=user)
        except Client.DoesNotExist:
            raise NotFound()
    
    @swagger_auto_schema(
        manual_parameters=[search_param, returned],
        responses={200: LoanSerializer(many=True)},
        operation_description="All user loans",)     
    def get (self, request):
        loans = Loan.objects.filter(user=request.user)

        bookId = request.query_params.get('book')
        returnedBooks = request.query_params.get('returned')

        if bookId is not None and returnedBooks is not None:
            returned = True if returnedBooks == 'true' else False
            loans = Loan.objects.filter(book=bookId, returned=returned)

        elif bookId is not None:
            loans = Loan.objects.filter(book=bookId)

        elif returnedBooks is not None:
            returned = True if returnedBooks == 'true' else False
            loans = Loan.objects.filter(returned=returned)

        
        results = self.paginate_queryset(loans, request, view=self)
        serializer = LoanSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    @swagger_auto_schema(
        request_body=LoanSerializer,
        operation_description="Save loan")
    def post(self, request):
        loanSerializer = LoanSerializer(data=request.data)
        if loanSerializer.is_valid():

            book = self.getBook(request.user, loanSerializer.data['book'])
            client = self.getClient(request.user, loanSerializer.data['client'])
           
            if Loan.objects.filter(book=book).exists():
                loanReturned = Loan.objects.filter(book=book)[0].returned
                if not loanReturned:
                    return Response(
                    {"detail": "The book is not available as it has already been rented."},
                    status=status.HTTP_400_BAD_REQUEST)

            loan = Loan.objects.create(
                returnDate = loanSerializer.data['returnDate'],
                value = loanSerializer.data['value'],
                returned = loanSerializer.data['returned'],
                book = book,
                client = client,
                user = request.user
            )

            loan.save()
            return Response(loanSerializer.data, status=status.HTTP_201_CREATED)
        return Response(loanSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
                 
class LoanDetailChangeAndDelete(APIView):
    
    def get_object(self, user, pk):
        try:
            return Loan.objects.get(pk=pk, user=user)
        except Loan.DoesNotExist:
            raise NotFound()

    @swagger_auto_schema(
        responses={200: LoanSerializer()},
        operation_description="Retrieve a loan")
    def get(self, request, pk):
        loan = self.get_object(request.user, pk)
        loanSerializer = LoanSerializer(loan)
        return Response(loanSerializer.data)

    @swagger_auto_schema(
        request_body=LoanSerializer,
        operation_description="Update a loan")
    def put(self, request, pk):
        loan = self.get_object(request.user, pk)
        loanSerializer = LoanSerializer(loan, request.data)

        if loanSerializer.is_valid():
            loanSerializer.save()
            return Response(loanSerializer.data)
        return Response(loanSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @swagger_auto_schema(
        response=204,
        operation_description="Delete a loan")
    def delete(self, request, pk):
        loan = self.get_object(request.user, pk)
        loan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


