from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CommunityPostViewSet, RatingViewSet

router = DefaultRouter()
router.register(r'posts', CommunityPostViewSet, basename='community_post')
router.register(r'ratings', RatingViewSet, basename='rating')

urlpatterns = [
    path('', include(router.urls)),
]
