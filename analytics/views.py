from rest_framework import viewsets, permissions
from .models import Analytics
from .serializers import AnalyticsSerializer

class AnalyticsViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing analytics.
    Allows CRUD operations on Analytics objects (admin only).
    """
    queryset = Analytics.objects.all()
    serializer_class = AnalyticsSerializer
    permission_classes = [permissions.IsAdminUser]
