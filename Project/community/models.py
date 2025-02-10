from django.db import models

# Community Insights with Ratings
class CommunityPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    image = models.ImageField(upload_to='community_posts/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post by {self.author.username}"

class Rating(models.Model):
    post = models.ForeignKey(CommunityPost, related_name='ratings', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField(choices=[(i, i) for i in range(1, 6)])  # 1 to 5 stars

    def __str__(self):
        return f"{self.stars} Stars by {self.user.username}"
