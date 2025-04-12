from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    Converts User objects to JSON for API responses.
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_artist', 'is_member', 'profile_picture', 'bio']
