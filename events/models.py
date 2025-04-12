from django.db import models

class Event(models.Model):
    """
    Event model for upcoming graffiti events.
    Stores event details like date, location, and time.
    """
    title = models.CharField(
        max_length=200,
        help_text="Title of the event."
    )
    description = models.TextField(
        help_text="Description of the event."
    )
    date = models.DateField(
        help_text="Date of the event."
    )
    location = models.CharField(
        max_length=200,
        help_text="Location of the event."
    )
    time = models.CharField(
        max_length=50,
        help_text="Time of the event (e.g., 10:00 AM - 6:00 PM)."
    )

    def __str__(self):
        return self.title
