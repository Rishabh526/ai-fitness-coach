from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'age',
            'height_cm',
            'weight_kg',
            'sex',
            'goal',
            'activity_level', 
        ]

        def validate(self, data):
            required_fields = ['age', 'height_cm', 'weight_kg', 'sex', 'goal']
            for field in required_fields:
                if field not in data:
                    raise serializers.ValidationError(f"{field} is required")
            return data
        

class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'age',
            'height_cm',
            'weight_kg',
            'sex',
            'goal',
            'activity_level'
        ]