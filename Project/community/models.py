from django.db import models
from django.conf import settings

class CommunityPost(models.Model):
    author = models.ForeignKey(  # Change from User to AUTH_USER_MODEL
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post by {self.author.full_name}"


class Rating(models.Model):
    user = models.ForeignKey(  # Update this too
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    post = models.ForeignKey(CommunityPost, on_delete=models.CASCADE)
    stars = models.IntegerField()

    def __str__(self):
        return f"{self.user.full_name} - {self.stars} Stars"
