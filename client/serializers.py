from client.models import Client
from rest_framework import serializers

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'CPF', 'name', 'birthDate', 'profession', 'address', 'telephone']
