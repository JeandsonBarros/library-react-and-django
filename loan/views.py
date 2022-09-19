from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from loan.models import Loan
from loan.serializers import LoanSerializer

class LoanListAndCreate(generics.ListCreateAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

   
class LoanDetailChangeAndDelete(APIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

