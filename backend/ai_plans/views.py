from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import AIPlan
from .serializers import AIPlanSerializer
from profiles.models import Profile
from ai.gemini_service import generate_fitness_plan


# Create your views here.

def calculate_macros(profile):
    bmr = (
        10 * profile.weight_kg
        + 6.25 * profile.height_cm
        - 5 * profile.age
        + (5 if profile.sex == "MALE" else -161)
    )

    activity_multiplier = {
        "SEDENTARY": 1.2,
        "MODERATE": 1.55,
        "ACTIVE": 1.75,
    }.get(profile.activity_level, 1.2)

    calories = int(bmr * activity_multiplier)

    if profile.goal == "CUTTING":
        calories -= 400
    elif profile.goal == "BULKING":
        calories += 300

    protein = int(profile.weight_kg * 2)
    fats = int((calories * 0.25) / 9)
    carbs = int((calories - protein * 4 -fats * 9 ) / 4)

    return {
        "calories": calories,
        "protein": protein,
        "carbs": carbs,
        "fats": fats,
    }

@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def ai_plan_view(request):
    user = request.user

    try:
        profile = Profile.objects.get(user=user)
    except Profile.DoesNotExist:
        return Response(
            {"details": "Profile not found!"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    
    if request.method == 'GET':
        plan, created = AIPlan.objects.get_or_create(
            user=user,
            defaults={
                "plan_text": generate_fitness_plan(
                    profile,
                    calculate_macros(profile),
                )
            },
        )

        serializer = AIPlanSerializer(plan)
        return Response(serializer.data)
    
    plan_text = generate_fitness_plan(
        profile,
        calculate_macros(profile),
    )
    plan, _ = AIPlan.objects.update_or_create(
        user=user,
        defaults={"plan_text": plan_text},
    )

    serializer = AIPlanSerializer(plan)
    return Response(serializer.data, status=status.HTTP_201_CREATED)