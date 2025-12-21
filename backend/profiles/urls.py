from django.urls import path
from .views import get_my_profile, create_profile

urlpatterns = [
    path('mep/', get_my_profile),
    path('create/', create_profile),
]
