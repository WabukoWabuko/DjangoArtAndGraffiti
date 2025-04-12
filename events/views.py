from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing events.
    Allows CRUD operations on Event objects.
    """
    queryset = Event.objects.all()
    serializer_class = EventSerializer
