from rest_framework import serializers
from .models import Artist

# --- Artists App ---
class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'

