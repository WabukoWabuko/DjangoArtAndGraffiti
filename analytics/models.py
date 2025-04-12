from django.db import models
from core.models import User
from artists.models import Artist

class Analytics(models.Model):
    """
    Analytics model for tracking user/artist activity.
    Stores metrics like views, sales, and uploads.
    """
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='analytics',
        null=True,
        help_text="The user associated with this analytics entry."
    )
    artist = models.ForeignKey(
        Artist,
        on_delete=models.CASCADE,
        related_name='analytics',
        null=True,
        help_text="The artist associated with this analytics entry."
    )
    views = models.IntegerField(
        default=0,
        help_text="Number of views for the user/artist."
    )
    sales = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
        help_text="Total sales amount for the user/artist."
    )
    uploads = models.IntegerField(
        default=0,
        help_text="Number of uploads by the user/artist."
    )
    timestamp = models.DateTimeField(
        auto_now_add=True,
        help_text="Date and time of the analytics entry."
    )

    def __str__(self):
        return f"Analytics for {self.user or self.artist}"
