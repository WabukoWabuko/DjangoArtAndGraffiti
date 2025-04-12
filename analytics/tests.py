from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Analytics
from core.models import User
from artists.models import Artist

class AnalyticsModelTest(TestCase):
    """
    Test cases for the Analytics model.
    """
    def setUp(self):
        user = User.objects.create_user(
            username='user',
            email='user@example.com',
            password='testpass123'
        )
        self.analytics = Analytics.objects.create(
            user=user,
            views=100,
            sales=500.00,
            uploads=5
        )

    def test_analytics_creation(self):
        """Test that an analytics entry is created with the correct fields."""
        self.assertEqual(self.analytics.views, 100)

class AnalyticsAPITest(APITestCase):
    """
    Test cases for the Analytics API endpoints.
    """
    def setUp(self):
        user = User.objects.create_user(
            username='user',
            email='user@example.com',
            password='testpass123'
        )
        self.analytics = Analytics.objects.create(
            user=user,
            views=100,
            sales=500.00,
            uploads=5
        )

    def test_get_analytics(self):
        """Test retrieving the list of analytics via API."""
        url = reverse('analytics-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
