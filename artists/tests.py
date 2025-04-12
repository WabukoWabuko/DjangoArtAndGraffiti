from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Artist
from core.models import User

class ArtistModelTest(TestCase):
    """
    Test cases for the Artist model.
    """
    def setUp(self):
        user = User.objects.create_user(
            username='artist',
            email='artist@example.com',
            password='testpass123',
            is_artist=True
        )
        self.artist = Artist.objects.create(user=user)

    def test_artist_creation(self):
        """Test that an artist is created with the correct fields."""
        self.assertEqual(self.artist.user.username, "artist")

class ArtistAPITest(APITestCase):
    """
    Test cases for the Artist API endpoints.
    """
    def setUp(self):
        user = User.objects.create_user(
            username='artist',
            email='artist@example.com',
            password='testpass123',
            is_artist=True
        )
        self.artist = Artist.objects.create(user=user)

    def test_get_artists(self):
        """Test retrieving the list of artists via API."""
        url = reverse('artist-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
