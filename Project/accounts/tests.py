from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from rest_framework import status
import json

User = get_user_model()

class AccountsTestCase(TestCase):
    """
    Test cases for the accounts app, verifying plain authentication endpoints
    without sessions or tokens.
    """
    def setUp(self):
        """Set up test client and test user."""
        self.client = Client()
        self.user = User.objects.create_user(
            email='test@example.com',
            full_name='Test User',
            password='testpassword123'
        )

    def test_register_success(self):
        """Test successful user registration."""
        data = {
            'email': 'newuser@example.com',
            'full_name': 'New User',
            'password': 'newpassword123',
            'password2': 'newpassword123'
        }
        response = self.client.post('/auth/register/', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('user', response.json())
        self.assertIn('message', response.json())
        self.assertEqual(response.json()['message'], 'Registration successful')

    def test_login_success(self):
        """Test successful user login."""
        data = {
            'email': 'test@example.com',
            'password': 'testpassword123'
        }
        response = self.client.post('/auth/login/', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('user', response.json())
        self.assertIn('message', response.json())
        self.assertEqual(response.json()['message'], 'Login successful')

    def test_logout_success(self):
        """Test successful user logout."""
        response = self.client.post('/auth/logout/', content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()['message'], 'Logged out successfully (frontend state cleared)')

    def test_profile_success(self):
        """Test successful profile retrieval."""
        response = self.client.get('/auth/profile/?user_id=1', content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('user', response.json())
        self.assertIn('message', response.json())
        self.assertEqual(response.json()['message'], 'Profile retrieved')
