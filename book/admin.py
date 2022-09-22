from django.contrib import admin
from book.models import Book

class BookAdmin(admin.ModelAdmin):
    list_display = [
        'title', 
        'author',
        'synopsis',
        'isbn',
        'image',
        'user'
    ]

    list_filter = [
        'title'
    ]

    search_fields = [ 
        'title',
        'synopsis'
    ]

admin.site.register(Book, BookAdmin)

 