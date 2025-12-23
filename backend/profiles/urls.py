from django.urls import path
from .views import get_my_profile, create_profile, get_my_profile_detail

urlpatterns = [
    path('mep/', get_my_profile),
    path('create/', create_profile),
    path('me/detail/', get_my_profile_detail),
]
