from rest_framework import viewsets
from .models import Artist
from .serializers import ArtistSerializer

class ArtistViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing artists.
    Allows CRUD operations on Artist objects.
    """
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
