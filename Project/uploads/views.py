from rest_framework import viewsets, permissions
from .models import ArtUpload
from .serializers import ArtworkSerializer

class IsArtistOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated

class ArtUploadViewSet(viewsets.ModelViewSet):
    queryset = ArtUpload.objects.all()
    serializer_class = ArtworkSerializer
    permission_classes = [IsArtistOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(artist=self.request.user)
