from rest_framework import viewsets
from .models import Artist
from .serializers import ArtistSerializer
from core.permissions import IsAdminOrReadOnly

class ArtistViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing artists.
    Allows read-only access for all, write operations for admins.
    """
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [IsAdminOrReadOnly]
