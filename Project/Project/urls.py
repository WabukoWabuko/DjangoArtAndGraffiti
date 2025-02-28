from django.contrib import admin
from django.urls import path
from accounts.views import CustomRegisterView, CustomLoginView, LogoutView, ProfileView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/register/', CustomRegisterView.as_view(), name='custom-register'),
    path('auth/login/', CustomLoginView.as_view(), name='custom-login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
    # Remove or comment out dj_rest_auth.urls and allauth.socialaccount.urls for now
    # path('auth/', include('dj_rest_auth.urls')),
    # path('auth/registration/', include('dj_rest_auth.registration.urls')),
    # path('auth/', include('allauth.socialaccount.urls')),
]
