from rest_framework.response import Response
from rest_framework.permissions import  AllowAny
from auth.serializers import MyTokenObtainPairSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from django.contrib.auth.models import User

class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class UserView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def put(self, request):
        
        userSerializer = UserSerializer(request.user, data=request.data)
        if userSerializer.is_valid():
            userSerializer.save()
            return Response(userSerializer.data)
        return Response(userSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        userSerializer = UserSerializer(request.user, data=request.data, partial=True)
        if userSerializer.is_valid():
            userSerializer.save()
            return Response(userSerializer.data)
        return Response(userSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        userSerializer = UserSerializer(request.user)
        return Response(userSerializer.data)
    
    def delete(self, request):
        try:
            request.user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except NameError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

""" class UserView(APIView):

    def put(self, request):
        userSerializer = UserSerializer(request.user, data=request.data)
        if userSerializer.is_valid():
            userSerializer.save()
            return Response(userSerializer.data)
        return Response(userSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        userSerializer = UserSerializer(request.user)
        return Response(userSerializer.data)
    
    def delete(self, request):
        try:
            request.user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except NameError:
            return Response(status=status.HTTP_400_BAD_REQUEST) """




