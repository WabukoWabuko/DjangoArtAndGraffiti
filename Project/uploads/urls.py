from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArtUploadViewSet

router = DefaultRouter()
router.register(r'', ArtUploadViewSet, basename='upload')

urlpatterns = [
    path('', include(router.urls)),
]
