from django.db import models
from core.models import User
from artworks.models import Artwork

class Purchase(models.Model):
    """
    Purchase model for tracking artwork purchases.
    Links to a user and artwork, stores transaction details.
    """
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='purchases',
        help_text="The user who made the purchase."
    )
    artwork = models.ForeignKey(
        Artwork,
        on_delete=models.CASCADE,
        related_name='purchases',
        help_text="The artwork being purchased."
    )
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Amount paid for the artwork."
    )
    transaction_id = models.CharField(
        max_length=100,
        help_text="Transaction ID from Daraja API."
    )
    status = models.CharField(
        max_length=50,
        default='pending',
        help_text="Status of the transaction (e.g., pending, completed)."
    )

    def __str__(self):
        return f"Purchase {self.id} by {self.user.username}"
