from rest_framework import viewsets
from .models import Analytics
from .serializers import AnalyticsSerializer

class AnalyticsViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing analytics.
    Allows CRUD operations on Analytics objects.
    """
    queryset = Analytics.objects.all()
    serializer_class = AnalyticsSerializer
