from rest_framework import viewsets
from .models import ArtUpload
from .serializers import ArtworkSerializer
from .permissions import IsArtistOrReadOnly


class ArtUploadViewSet(viewsets.ModelViewSet):
    queryset = ArtUpload.objects.all()
    serializer_class = ArtworkSerializer
    permission_classes = [IsArtistOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(artist=self.request.user)
