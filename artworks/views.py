from rest_framework import viewsets
from .models import Artwork
from .serializers import ArtworkSerializer
from core.permissions import IsAdminOrReadOnly  # Import the custom permission

class ArtworkViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing artworks.
    Allows read-only access for all, write operations for admins.
    """
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    permission_classes = [IsAdminOrReadOnly]  # Use the custom permission
