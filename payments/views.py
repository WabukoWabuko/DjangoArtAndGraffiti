from rest_framework import viewsets, permissions
from .models import Purchase
from .serializers import PurchaseSerializer

class PurchaseViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing purchases.
    Allows CRUD operations on Purchase objects (admin only).
    """
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAdminUser]
