from rest_framework import viewsets
from .models import Rating
from .serializers import RatingSerializer
from .permissions import IsAuthorOrReadOnly


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [IsAuthorOrReadOnly]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
