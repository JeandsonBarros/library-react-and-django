from rest_framework import  generics
from loan.models import Loan
from loan.serializers import LoanSerializer

class LoanListAndCreate(generics.ListCreateAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

   
class LoanDetailChangeAndDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

