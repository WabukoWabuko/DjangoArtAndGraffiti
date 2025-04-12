import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getEvents } from '../services/api';

function EventsPage() {
  const [events, setEvents] = useState([]);

  // Fetch events using the API service
  useEffect(() => {
    getEvents()
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4">Upcoming Events</h2>
      <Row>
        {events.map(event => (
          <Col md={6} key={event.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>
                  {event.description}<br />
                  <strong>Date:</strong> {event.date}<br />
                  <strong>Location:</strong> {event.location}<br />
                  <strong>Time:</strong> {event.time}
                </Card.Text>
                <Button variant="primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default EventsPage;
