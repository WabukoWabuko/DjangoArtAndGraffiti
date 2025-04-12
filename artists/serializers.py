from rest_framework import serializers
from .models import Artist

class ArtistSerializer(serializers.ModelSerializer):
    """
    Serializer for the Artist model.
    Converts Artist objects to JSON for API responses.
    """
    class Meta:
        model = Artist
        fields = '__all__'
