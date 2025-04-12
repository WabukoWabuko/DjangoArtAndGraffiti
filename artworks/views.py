from rest_framework import viewsets, permissions
from .models import Artwork
from .serializers import ArtworkSerializer

class ArtworkViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing artworks.
    Allows CRUD operations on Artwork objects (admin only).
    """
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    permission_classes = [permissions.IsAdminUser]
