from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts.views import RegisterView, LoginView, LogoutView, ProfileView
from events.views import EventViewSet
from uploads.views import ArtUploadViewSet
from artists.views import ArtistViewSet
from community.views import CommunityPostViewSet, RatingViewSet
from django.contrib import admin

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'uploads', ArtUploadViewSet)
router.register(r'artists', ArtistViewSet)
router.register(r'community-posts', CommunityPostViewSet)
router.register(r'ratings', RatingViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/profile/', ProfileView.as_view(), name='profile'),
]
