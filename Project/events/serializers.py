from rest_framework import serializers
from .models import Event

# --- Events App ---
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

