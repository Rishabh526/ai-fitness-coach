from rest_framework import serializers
from .models import AIPlan

class AIPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIPlan
        fields = ["plan_text", "created_at", "updated_at"]


