from django.urls import path
import book.views as views 
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'', views.ViewsetsBooK)
urlpatterns = router.urls

""" 
urlpatterns = [
    path('', views.GenericBooKListAndCreate.as_view()),
    path('<int:pk>/', views.GenericBookDetailChangeAndDelete.as_view()),
] 
"""


""" 
urlpatterns = [
    path('', views.BooKListAndCreate.as_view()),
    path('<int:pk>/', views.GenericBookDetailChangeAndDelete.as_view()),
] 
"""


""" 
urlpatterns = [
    path('', views.listBooks),
    path('<int:pk>/', views.bookDetailsPutDelete),
] 
"""

