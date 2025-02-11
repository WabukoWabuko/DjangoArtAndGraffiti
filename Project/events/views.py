from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer
from .permissions import IsAdminOrReadOnly


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]
