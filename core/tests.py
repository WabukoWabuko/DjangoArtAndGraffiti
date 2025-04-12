from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import User

class UserModelTest(TestCase):
    """
    Test cases for the User model.
    Ensures user creation and fields work as expected.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            is_artist=True,
            is_member=True
        )

    def test_user_creation(self):
        """Test that a user is created with the correct fields."""
        self.assertEqual(self.user.username, 'testuser')
        self.assertTrue(self.user.is_artist)
        self.assertTrue(self.user.is_member)

class UserAPITest(APITestCase):
    """
    Test cases for the User API endpoints.
    Ensures API endpoints return correct responses.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )

    def test_get_users(self):
        """Test retrieving the list of users via API."""
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
