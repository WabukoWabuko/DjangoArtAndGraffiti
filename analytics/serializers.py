from rest_framework import serializers
from .models import Analytics

class AnalyticsSerializer(serializers.ModelSerializer):
    """
    Serializer for the Analytics model.
    Converts Analytics objects to JSON for API responses.
    """
    class Meta:
        model = Analytics
        fields = '__all__'
