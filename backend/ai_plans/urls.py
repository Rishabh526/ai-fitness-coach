from django.urls import path
from .views import ai_plan_view

urlpatterns = [
    path("plan/", ai_plan_view),
]
