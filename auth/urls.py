from django.urls import path
from auth.views import MyObtainTokenPairView, RegisterView, UserView

from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [   
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('user/', UserView.as_view(), name='auth_get_user'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

