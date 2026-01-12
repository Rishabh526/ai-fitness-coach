from rest_framework import serializers
from .models import WorkoutPreference

class WorkoutPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutPreference
        fields = [
            "split",
            "days_per_week",
            "equipment",
            "focus",
            "notes",
        ]