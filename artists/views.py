from rest_framework import viewsets, permissions
from .models import Artist
from .serializers import ArtistSerializer

class ArtistViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing artists.
    Allows CRUD operations on Artist objects (admin only).
    """
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [permissions.IsAdminUser]
