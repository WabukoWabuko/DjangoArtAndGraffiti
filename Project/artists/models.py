from django.db import models

# Artist Spotlight
class Artist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()
    profile_image = models.ImageField(upload_to='artist_profiles/')
    spotlight_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
