from django.urls import path
from loan.views import LoanDetailChangeAndDelete, LoanListAndCreate


urlpatterns = [
    path('', LoanListAndCreate.as_view()),
    path('<int:pk>/', LoanDetailChangeAndDelete.as_view())
]
