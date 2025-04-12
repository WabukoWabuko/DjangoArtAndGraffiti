from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    """
    Serializer for the Event model.
    Converts Event objects to JSON for API responses.
    """
    class Meta:
        model = Event
        fields = '__all__'
