from rest_framework import serializers
from .models import ArtUpload


# --- Uploads App ---
class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtUpload
        fields = '__all__'
