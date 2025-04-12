from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Purchase
from core.models import User
from artworks.models import Artwork
from artists.models import Artist

class PurchaseModelTest(TestCase):
    """
    Test cases for the Purchase model.
    """
    def setUp(self):
        user = User.objects.create_user(
            username='buyer',
            email='buyer@example.com',
            password='testpass123'
        )
        artist_user = User.objects.create_user(
            username='artist',
            email='artist@example.com',
            password='testpass123',
            is_artist=True
        )
        artist = Artist.objects.create(user=artist_user)
        artwork = Artwork.objects.create(
            title="Test Artwork",
            artist=artist,
            description="A test artwork",
            price=100.00,
            category="Graffiti"
        )
        self.purchase = Purchase.objects.create(
            user=user,
            artwork=artwork,
            amount=100.00,
            transaction_id="TEST123"
        )

    def test_purchase_creation(self):
        """Test that a purchase is created with the correct fields."""
        self.assertEqual(self.purchase.amount, 100.00)

class PurchaseAPITest(APITestCase):
    """
    Test cases for the Purchase API endpoints.
    """
    def setUp(self):
        user = User.objects.create_user(
            username='buyer',
            email='buyer@example.com',
            password='testpass123'
        )
        artist_user = User.objects.create_user(
            username='artist',
            email='artist@example.com',
            password='testpass123',
            is_artist=True
        )
        artist = Artist.objects.create(user=artist_user)
        artwork = Artwork.objects.create(
            title="Test Artwork",
            artist=artist,
            description="A test artwork",
            price=100.00,
            category="Graffiti"
        )
        self.purchase = Purchase.objects.create(
            user=user,
            artwork=artwork,
            amount=100.00,
            transaction_id="TEST123"
        )

    def test_get_purchases(self):
        """Test retrieving the list of purchases via API."""
        url = reverse('purchase-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
