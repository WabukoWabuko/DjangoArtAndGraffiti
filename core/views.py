from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer

def admin_login(request):
    """
    Custom admin login view.
    Only allows staff users to log in and redirects to admin dashboard.
    """
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_staff:
            login(request, user)
            return redirect('admin_dashboard')  # We'll create this later
        else:
            return render(request, 'core/admin_login.html', {
                'error': 'Invalid credentials or not an admin'
            })
    return render(request, 'core/admin_login.html')

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing users.
    Allows CRUD operations on User objects.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
