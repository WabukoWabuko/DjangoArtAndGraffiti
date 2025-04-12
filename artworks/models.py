from django.db import models
from artists.models import Artist

class Artwork(models.Model):
    """
    Artwork model for storing graffiti and art pieces.
    Includes media files (image/video) and metadata.
    """
    title = models.CharField(
        max_length=200,
        help_text="Title of the artwork."
    )
    artist = models.ForeignKey(
        Artist,
        on_delete=models.CASCADE,
        related_name='artworks',
        help_text="The artist who created this artwork."
    )
    image = models.ImageField(
        upload_to='artworks/images/',
        blank=True,
        null=True,
        help_text="Image of the artwork."
    )
    video = models.FileField(
        upload_to='artworks/videos/',
        blank=True,
        null=True,
        help_text="Video of the artwork (if applicable)."
    )
    description = models.TextField(
        help_text="Description of the artwork."
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Price of the artwork in USD."
    )
    upload_date = models.DateTimeField(
        auto_now_add=True,
        help_text="Date the artwork was uploaded."
    )
    category = models.CharField(
        max_length=100,
        help_text="Category of the artwork (e.g., graffiti, mural)."
    )

    def __str__(self):
        return self.title
