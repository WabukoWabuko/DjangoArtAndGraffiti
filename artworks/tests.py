from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Artwork
from artists.models import Artist
from core.models import User

class ArtworkModelTest(TestCase):
    """
    Test cases for the Artwork model.
    Ensures artwork creation works as expected.
    """
    def setUp(self):
        user = User.objects.create_user(
            username='artist',
            email='artist@example.com',
            password='testpass123',
            is_artist=True
        )
        self.artist = Artist.objects.create(user=user)
        self.artwork = Artwork.objects.create(
            title="Test Artwork",
            artist=self.artist,
            description="A test artwork",
            price=100.00,
            category="Graffiti"
        )

    def test_artwork_creation(self):
        """Test that an artwork is created with the correct fields."""
        self.assertEqual(self.artwork.title, "Test Artwork")
        self.assertEqual(self.artwork.price, 100.00)

class ArtworkAPITest(APITestCase):
    """
    Test cases for the Artwork API endpoints.
    """
    def setUp(self):
        user = User.objects.create_user(
            username='artist',
            email='artist@example.com',
            password='testpass123',
            is_artist=True
        )
        self.artist = Artist.objects.create(user=user)
        self.artwork = Artwork.objects.create(
            title="Test Artwork",
            artist=self.artist,
            description="A test artwork",
            price=100.00,
            category="Graffiti"
        )

    def test_get_artworks(self):
        """Test retrieving the list of artworks via API."""
        url = reverse('artwork-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
