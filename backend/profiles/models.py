from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    GOAL_CHOICES = [
        ('BULKING', 'Bulking'),
        ('CUTTING', 'Cutting'),
        ('MAINTAINING', 'Maintaining'),
    ]

    SEX_CHOICES = [
        ('MALE', 'Male'),
        ('FEMALE', 'Female'),
    ]

    ACTIVITY_CHOICES = [
        ('SEDENTARY', 'Sedentary'),
        ('MODERATE', 'Moderate'),
        ('ACTIVE', 'Active'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    age = models.PositiveIntegerField()
    height_cm = models.PositiveIntegerField()
    weight_kg = models.PositiveIntegerField()
    sex = models.CharField(max_length=10, choices=SEX_CHOICES)
    goal = models.CharField(max_length=15, choices=GOAL_CHOICES)
    activity_level = models.CharField(max_length=15, choices=ACTIVITY_CHOICES, default='SEDENTARY')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)