from django.contrib.auth import authenticate, login, logout
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Artist
from .serializers import UserSerializer
from .permissions import IsAdminOrReadOnly

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

@api_view(['GET'])
def current_user(request):
    """
    API endpoint to fetch the current logged-in user.
    Returns user data if authenticated, else returns null.
    """
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    return Response({'user': None}, status=status.HTTP_200_OK)

@api_view(['POST'])
def logout_user(request):
    """
    API endpoint to log out the current user.
    """
    logout(request)
    return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register_user(request):
    """
    API endpoint to register a new user.
    Optionally creates an Artist profile if is_artist is true.
    """
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    is_artist = request.data.get('is_artist', False)

    if not username or not email or not password:
        return Response({'error': 'Username, email, and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
    )
    user.save()

    if is_artist:
        Artist.objects.create(
            user=user.id,
            portfolio='',
            specialty='',
            social_links={}
        )

    login(request, user)
    serializer = UserSerializer(user)
    return Response({
        'message': 'Registration successful',
        'user': serializer.data
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def user_login(request):
    """
    API endpoint for user login.
    Authenticates users and logs them in, returning user data.
    """
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)
        serializer = UserSerializer(user)
        return Response({
            'message': 'Login successful',
            'user': serializer.data
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'error': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing users.
    Allows CRUD operations on User objects (admin only).
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
