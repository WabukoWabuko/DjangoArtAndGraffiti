# accounts/urls.py
from django.urls import path
from .views import CustomRegisterView, CustomLoginView, LogoutView, ProfileView

urlpatterns = [
    path('register/', CustomRegisterView.as_view(), name='custom-register'),
    path('login/', CustomLoginView.as_view(), name='custom-login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='profile'),
]
