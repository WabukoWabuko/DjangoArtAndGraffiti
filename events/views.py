from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer
from core.permissions import IsAdminOrReadOnly

class EventViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing events.
    Allows read-only access for all, write operations for admins.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAdminOrReadOnly]
