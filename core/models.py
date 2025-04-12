from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser.
    Adds fields for artist/member status, profile picture, and bio.
    """
    is_artist = models.BooleanField(
        default=False,
        help_text="Designates whether this user is an artist."
    )
    is_member = models.BooleanField(
        default=False,
        help_text="Designates whether this user is a paying member."
    )
    profile_picture = models.ImageField(
        upload_to='profiles/',
        blank=True,
        null=True,
        help_text="User's profile picture."
    )
    bio = models.TextField(
        blank=True,
        help_text="A short bio about the user."
    )

    # Fix reverse accessor clashes with auth.User
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='core_user_set',  # Unique related_name to avoid clash
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='core_user_permissions_set',  # Unique related_name to avoid clash
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.username
