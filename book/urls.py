from django.urls import path
import book.views as views 
from rest_framework.routers import DefaultRouter

""" ============ Start class generic view ============== """
""" urlpatterns = [
    path('', views.GenericBooKListAndCreate.as_view()),
    path('<int:pk>/', views.GenericBookDetailChangeAndDelete.as_view()),
]  """


""" =========== Start viewsets ============= """
""" router = DefaultRouter()
router.register(r'', views.ViewsetsBooK)
urlpatterns = router.urls """

""" ============= Start class base view ============== """
urlpatterns = [
    path('', views.BaseViewBooKListAndCreate.as_view()),
    path('<int:pk>/', views.BaseViewBookDetailChangeAndDelete.as_view()),
] 

""" =========== Start api_view ============= """
""" 
urlpatterns = [
    path('', views.listBooks),
    path('<int:pk>/', views.bookDetailsPutDelete),
] 
"""

