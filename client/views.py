from django.shortcuts import render
from rest_framework import generics
from client.models import Client
from client.serializers import ClientSerializer

class GenericClientListAndCreate(generics.ListCreateAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class GenericClienteDetailChangeAndDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer