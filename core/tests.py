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
        self.admin = User.objects.create_user(
            username='adminuser',
            email='admin@example.com',
            password='adminpass123',
            is_staff=True  # Admin user
        )

    def test_get_users(self):
        """Test retrieving the list of users via API."""
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_admin_login_success(self):
        """Test successful admin login via API."""
        url = reverse('admin_login')
        data = {
            'username': 'adminuser',
            'password': 'adminpass123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Admin login successful')

    def test_admin_login_failure(self):
        """Test failed admin login via API (non-admin user)."""
        url = reverse('admin_login')
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('error', response.data)
