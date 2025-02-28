from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated  # Use IsAuthenticated for ProfileView
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer
from .permissions import IsOwnerOrReadOnly  # Use custom permission for ProfileView
import logging

logger = logging.getLogger(__name__)

# Registration View (Plain, no sessions/tokens)
class CustomRegisterView(APIView):
    #permission_classes = [AllowAny]

    def post(self, request):
        logger.debug(f"Registration request data: {request.data}")
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                logger.debug(f"User registered: {user.email}")
                return Response({
                    'user': {
                        'id': user.id,
                        'email': user.email,
                        'full_name': user.full_name,
                    },
                    'message': 'Registration successful'
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Registration error: {str(e)}")
                return Response({"error": f"Registration failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        logger.error(f"Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login View (Plain, no sessions/tokens)
class CustomLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        logger.debug(f"Login request data: {request.data}")
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)  # Plain auth without request

            if user is None:
                logger.error("Invalid credentials provided")
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

            logger.debug(f"User authenticated: {user.email}")
            return Response({
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'full_name': user.full_name,
                },
                'message': 'Login successful'
            }, status=status.HTTP_200_OK)
        logger.error(f"Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Logout View (Plain, no sessions/tokens)
class LogoutView(APIView):
    permission_classes = [AllowAny]  # Allow anyone to "logout" (clear frontend state)

    def post(self, request):
        logger.debug("Logout request received")
        # No server-side logout needed (no sessions or tokens to clear)
        return Response({"message": "Logged out successfully (frontend state cleared)"}, status=status.HTTP_200_OK)

# Profile Management (Plain, no sessions/tokens, rely on frontend state with permissions)
class ProfileView(APIView):
    permission_classes = [IsOwnerOrReadOnly]  # Use custom permission for plain auth

    def get(self, request):
        logger.debug(f"Profile get request with user_id: {request.query_params.get('user_id')}")
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({"error": "User ID required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
            # Check if the requesting user (via query param) matches the object
            if not self.check_owner(request, user):
                return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
            serializer = UserProfileSerializer(user)
            return Response({
                'user': serializer.data,
                'message': 'Profile retrieved'
            })
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        logger.debug(f"Profile put request with user_id: {request.data.get('user_id')}")
        user_id = request.data.get('user_id')
        if not user_id:
            return Response({"error": "User ID required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
            # Check if the requesting user (via data) matches the object
            if not self.check_owner(request, user):
                return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
            serializer = UserProfileSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'user': serializer.data,
                    'message': 'Profile updated'
                })
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def check_owner(self, request, obj):
        """
        Check if the user_id in the request matches the object being accessed/edited.
        For plain auth, we rely on user_id passed in the request.
        """
        user_id = request.query_params.get('user_id') or request.data.get('user_id')
        return str(obj.id) == str(user_id) if user_id else False
