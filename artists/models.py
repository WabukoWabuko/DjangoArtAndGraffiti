from django.db import models
from core.models import User

class Artist(models.Model):
    """
    Artist model linked to a User.
    Stores additional info like portfolio and specialty.
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='artist_profile',
        help_text="The user associated with this artist profile."
    )
    portfolio = models.TextField(
        blank=True,
        help_text="A description of the artist's portfolio."
    )
    specialty = models.CharField(
        max_length=100,
        blank=True,
        help_text="The artist's specialty (e.g., graffiti, murals)."
    )
    social_links = models.JSONField(
        blank=True,
        null=True,
        help_text="Social media links stored as JSON."
    )

    def __str__(self):
        return self.user.username
