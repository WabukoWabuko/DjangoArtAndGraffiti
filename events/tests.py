from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Event

class EventModelTest(TestCase):
    """
    Test cases for the Event model.
    """
    def setUp(self):
        self.event = Event.objects.create(
            title="Test Event",
            description="A test event",
            date="2025-04-15",
            location="Downtown",
            time="10:00 AM - 6:00 PM"
        )

    def test_event_creation(self):
        """Test that an event is created with the correct fields."""
        self.assertEqual(self.event.title, "Test Event")

class EventAPITest(APITestCase):
    """
    Test cases for the Event API endpoints.
    """
    def setUp(self):
        self.event = Event.objects.create(
            title="Test Event",
            description="A test event",
            date="2025-04-15",
            location="Downtown",
            time="10:00 AM - 6:00 PM"
        )

    def test_get_events(self):
        """Test retrieving the list of events via API."""
        url = reverse('event-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
