from django.db import models
from django.conf import settings

# Create your models here.

class WorkoutPreference(models.Model):
    SPLIT_CHOICES = [
        ("Full_BODY", "Full Body"),
        ("UPPER_LOWER", "Upper / Lower"),
        ("PPL", "Push / Pull / Legs"),
    ]

    EQUIPMENT_CHOICES = [
        ("GYM", "Gym"),
        ("HOME", "Home"),
        ("BODYWEIGHT", "Bodyweight"),
    ]

    FOCUS_CHOICES = [
        ("HYPERTROPHY", "Hypertrophy"),
        ("STRENGTH", "Strength"),
        ("FAT_LOSS", "Fat Loss"),
        ("GENERAL", "General Fitness"),
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="workout_preference",
    )

    split = models.CharField(
        max_length=20,
        choices=SPLIT_CHOICES,
        default="FULL_BODY",

    )

    days_per_week = models.PositiveIntegerField(default=3)

    equipment = models.CharField(
        max_length=20,
        choices=EQUIPMENT_CHOICES,
        default="GYM",
    )

    focus = models.CharField(
        max_length=20,
        choices=FOCUS_CHOICES,
        default="GENERAL",
    )

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} workout preferences"