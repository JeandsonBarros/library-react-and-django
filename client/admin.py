from django.contrib import admin
from client.models import Client

class ClientAdmin(admin.ModelAdmin):
    list_display = [
        'CPF',
        'name',
        'birthDate',
        'profession',
        'address',
        'telephone',
        'user',
    ]

    list_filter = [
        'name',
        'CPF'
    ]

    search_fields = [
        'name',
        'CPF'
    ]

admin.site.register(Client, ClientAdmin)
