from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet

# Initialize the router
router = DefaultRouter()
router.register(r'', EventViewSet, basename='events')

urlpatterns = [
    path('', include(router.urls)),  # Includes all the ViewSet routes automatically
]
