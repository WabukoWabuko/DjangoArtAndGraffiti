from rest_framework import serializers
from .models import Artwork

class ArtworkSerializer(serializers.ModelSerializer):
    """
    Serializer for the Artwork model.
    Converts Artwork objects to JSON for API responses.
    """
    class Meta:
        model = Artwork
        fields = '__all__'
