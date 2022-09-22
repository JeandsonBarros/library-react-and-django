from rest_framework import generics, permissions, status
from client.models import Client
from client.serializers import ClientSerializer
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination

#https://drf-yasg.readthedocs.io/en/stable/custom_spec.html?highlight=APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

search_param = openapi.Parameter('name', openapi.IN_QUERY, description="Search client for name", type=openapi.TYPE_STRING)

class GenericClientListAndCreate(APIView, LimitOffsetPagination):
    permissions.IsAuthenticated
    @swagger_auto_schema(
        manual_parameters=[search_param],
        responses={200: ClientSerializer(many=True)},
        operation_description="All user clients")
    def get(self, request):
        clients = Client.objects.filter(user=request.user)

        name = request.query_params.get('name')
        if name is not None:
            clients = Client.objects.filter(name__contains=name, user=request.user)

        results = self.paginate_queryset(clients, request, view=self)
        serializer = ClientSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)
    
    @swagger_auto_schema(
        request_body=ClientSerializer,
        operation_description="Save client")
    def post(self, request):
        
        clientSerializer = ClientSerializer(data=request.data)
        if clientSerializer.is_valid():
            client = Client.objects.create(
                CPF = clientSerializer.data['CPF'],
                name = clientSerializer.data['name'],
                birthDate = clientSerializer.data['birthDate'],
                profession = clientSerializer.data['profession'],
                address = clientSerializer.data['address'],
                telephone = clientSerializer.data['telephone'],    
                user = request.user
            )

            client.save()
            return Response(clientSerializer.data, status=status.HTTP_201_CREATED)
        return Response(clientSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GenericClienteDetailChangeAndDelete(APIView):
   
   
    def get_object(self, user, pk):
        try:
            return Client.objects.get(pk=pk, user=user)
        except Client.DoesNotExist:
            raise NotFound()

    @swagger_auto_schema(
        responses={200: ClientSerializer()},
        operation_description="Retrieve a client")
    def get(self, request, pk):
        client = self.get_object(request.user, pk)
        clientSerializer = ClientSerializer(client)
        return Response(clientSerializer.data)
    
    @swagger_auto_schema(
        request_body=ClientSerializer,
        operation_description="Update a client")
    def put(self, request, pk):
        client = self.get_object(request.user, pk)
        clientSerializer = ClientSerializer(client, data=request.data)
        if clientSerializer.is_valid():
            clientSerializer.save()
            return Response(clientSerializer.data)
        return Response(clientSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        response=204,
        operation_description="Delete a client")
    def delete(self, request, pk):
        client = self.get_object(request.user, pk)
        client.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)