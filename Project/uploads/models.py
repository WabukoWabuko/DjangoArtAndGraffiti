from django.db import models
from django.conf import settings

class ArtUpload(models.Model):
    artist = models.ForeignKey(  # Change this
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='art_uploads/')
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
