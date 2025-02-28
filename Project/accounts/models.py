from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models
from django.utils import timezone
import logging

# Set up logging for debugging model operations
logger = logging.getLogger(__name__)

class UserManager(BaseUserManager):
    """
    Custom manager for the User model, handling creation of users and superusers
    for plain authentication without sessions or tokens.
    
    Uses email as the unique identifier (USERNAME_FIELD) and supports basic
    Django authentication with no token or session dependencies.
    """
    def create_user(self, email, password=None, **extra_fields):
        """Create a regular user with email, password, and optional fields."""
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        try:
            user.save(using=self._db)
            logger.debug(f"Created user: {email}")
            return user
        except Exception as e:
            logger.error(f"Failed to create user: {str(e)}")
            raise

    def create_superuser(self, email, password, **extra_fields):
        """Create a superuser with email, password, and required permissions."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom User model using email as the unique identifier (USERNAME_FIELD)
    for plain authentication without sessions or tokens.
    
    Fields include email, full_name, is_active, is_staff, and date_joined.
    Supports basic Django authentication with no token or session storage.
    """
    email = models.EmailField(unique=True, help_text="User's unique email address for login.")
    full_name = models.CharField(max_length=255, help_text="User's full name.")
    is_active = models.BooleanField(default=True, help_text="Indicates whether the user account is active.")
    is_staff = models.BooleanField(default=False, help_text="Designates whether the user can access the admin site.")
    date_joined = models.DateTimeField(default=timezone.now, help_text="Date and time the user joined.")

    # Avoid reverse accessor conflicts with Django's default User model
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_groups',
        blank=True,
        help_text="Groups this user belongs to."
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions',
        blank=True,
        help_text="Specific permissions for this user."
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        """Return a string representation of the user (email)."""
        return self.email

    class Meta:
        """Metadata for the User model."""
        verbose_name = 'User'
        verbose_name_plural = 'Users'
