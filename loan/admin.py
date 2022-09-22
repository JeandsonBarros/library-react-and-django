from django.contrib import admin
from loan.models import Loan

@admin.action(description="Book returned")
def bookReturned(modeladmin, request, queryset):
    queryset.update(returned=True)

@admin.action(description="Book no returned")
def bookNoReturned(modeladmin, request, queryset):
    queryset.update(returned=False)


class LoanAdmin(admin.ModelAdmin):
    list_display = [
        'returnDate',
        'rentalDate',
        'value',
        'returned',
        'book',
        'client',
        'user',
    ]

    list_filter = [
        'returnDate',
        'rentalDate',
    ]

    search_fields = [
        'book',
        'client',
    ]

    actions = [
        bookReturned,
        bookNoReturned
    ]


admin.site.register(Loan, LoanAdmin)