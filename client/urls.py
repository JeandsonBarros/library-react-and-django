from django.urls import path
from client.views import GenericClientListAndCreate, GenericClienteDetailChangeAndDelete

urlpatterns = [
    path('', GenericClientListAndCreate.as_view()),
    path('<int:pk>/', GenericClienteDetailChangeAndDelete.as_view())
]