"""
URL configuration for DjangoArtAndGraffiti project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from core.views import admin_login

# Set up Swagger schema view
schema_view = get_schema_view(
    openapi.Info(
        title="Graffiti API",
        default_version='v1',
        description="API for DjangoArtAndGraffiti project",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin-login/', admin_login, name='admin_login'),
    path('api/', include('core.urls')),
    path('api/', include('artworks.urls')),
    path('api/', include('events.urls')),
    path('api/', include('artists.urls')),
    path('api/', include('payments.urls')),
    path('api/', include('analytics.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
