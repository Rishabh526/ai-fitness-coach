from django.urls import path
from .views import workout_preference_view

urlpatterns = [
    path("preferences/", workout_preference_view),
]
