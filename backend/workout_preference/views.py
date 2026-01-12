from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import WorkoutPreference
from .serializers import WorkoutPreferenceSerializer

# Create your views here.

@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def workout_preference_view(request):
    preference, _ = WorkoutPreference.objects.get_or_create(
        user = request.user
    )

    if request.method == "GET":
        serializer = WorkoutPreferenceSerializer(preference)
        return Response(serializer.data)
    
    serializer = WorkoutPreferenceSerializer(
        preference, data=request.data, partial=True
    )
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)