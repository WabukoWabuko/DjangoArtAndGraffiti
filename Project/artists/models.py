from django.db import models
from django.conf import settings  # Import settings

class Artist(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,  # Use AUTH_USER_MODEL here
        on_delete=models.CASCADE
    )
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='artists/', blank=True)

    def __str__(self):
        return self.user.full_name
