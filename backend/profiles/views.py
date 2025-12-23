from django.shortcuts import render
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_profile(request):
    try:
        profile = Profile.objects.get(user = request.user)
        return Response(
            {
            "profile_exists": True,
            "profile_id": profile.id
            },
            status = status.HTTP_200_OK
        )
    except Profile.DoesNotExist:
        return Response(
            {
                "profile_exists": False
            },
            status = status.HTTP_404_NOT_FOUND
        )
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_profile(request):
    if Profile.objects.filter(user=request.user).exists():
        return Response(
            {"details": "Profile already exists"},
            status = status.HTTP_400_BAD_REQUEST
        )
    
    serializer = ProfileSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    profile = serializer.save(user=request.user)

    return Response(
        {"details": "Profile created Successfully!"},
        status=status.HTTP_201_CREATED
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_profile_detail(request):
    profile = Profile.objects.get(user=request.user)
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)



