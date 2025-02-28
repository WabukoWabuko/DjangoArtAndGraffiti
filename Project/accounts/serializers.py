from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
import logging

logger = logging.getLogger(__name__)

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration, returning plain JSON with user data and no tokens.
    
    Validates email, full_name, and password, ensuring passwords match and meet Django's
    password validation rules. Supports plain authentication without sessions or tokens.
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('email', 'full_name', 'password', 'password2')

    def validate(self, attrs):
        """Validate that password and password2 match for registration."""
        logger.debug(f"Validating registration data: {attrs}")
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        """Create a new user with validated data, no sessions or tokens."""
        logger.debug(f"Creating user with validated data: {validated_data}")
        try:
            validated_data.pop('password2')
            user = User.objects.create_user(
                email=validated_data['email'],
                full_name=validated_data['full_name'],
                password=validated_data['password']
            )
            logger.debug(f"User created: {user.email}")
            return user
        except Exception as e:
            logger.error(f"Failed to create user: {str(e)}")
            raise serializers.ValidationError(f"Registration failed: {str(e)}")

class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for user login, returning plain JSON with user data and no tokens.
    
    Validates email and password for plain authentication, ensuring credentials are valid
    without relying on sessions or tokens.
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        """Validate email and password for login, ensuring a valid user exists."""
        logger.debug(f"Validating login data: {attrs}")
        email = attrs.get('email')
        password = attrs.get('password')
        if email and password:
            user = authenticate(email=email, password=password)  # Plain auth without request
            if user is None:
                raise serializers.ValidationError({"error": "Invalid credentials"})
        return attrs

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for retrieving or updating user profile data, plain JSON with no tokens.
    
    Supports plain authentication, returning or updating user details based on user_id
    passed from the frontend.
    """
    class Meta:
        model = User
        fields = ('id', 'email', 'full_name', 'is_active', 'date_joined')
