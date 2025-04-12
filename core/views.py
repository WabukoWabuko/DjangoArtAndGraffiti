from django.contrib.auth import authenticate, login
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer

@api_view(['POST'])
def admin_login(request):
    """
    API endpoint for admin login.
    Authenticates staff users and logs them in, returning user data.
    """
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    
    if user is not None and user.is_staff:
        login(request, user)
        serializer = UserSerializer(user)
        return Response({
            'message': 'Admin login successful',
            'user': serializer.data
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'error': 'Invalid credentials or not an admin'
        }, status=status.HTTP_401_UNAUTHORIZED)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing users.
    Allows CRUD operations on User objects.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
