from loan.models import Loan
from rest_framework import serializers

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ['id', 'returnDate', 'value', 'returned', 'book', 'client', 'rentalDate']

        