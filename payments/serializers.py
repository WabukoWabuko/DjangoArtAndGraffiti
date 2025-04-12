from rest_framework import serializers
from .models import Purchase

class PurchaseSerializer(serializers.ModelSerializer):
    """
    Serializer for the Purchase model.
    Converts Purchase objects to JSON for API responses.
    """
    class Meta:
        model = Purchase
        fields = '__all__'
