from django.db import models
from django.contrib.auth.models import User


# Upcoming Events (Admin Only)
class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    image = models.ImageField(upload_to='events/')

    def __str__(self):
        return self.title