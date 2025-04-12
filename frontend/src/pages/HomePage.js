import React, { useEffect, useState } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { getEvents, getArtworks, getArtists } from '../services/api';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [artists, setArtists] = useState([]);

  // Fetch data using the API service
  useEffect(() => {
    getEvents()
      .then(response => setEvents(response.data.slice(0, 2)))
      .catch(error => console.error('Error fetching events:', error));

    getArtworks()
      .then(response => setArtworks(response.data.slice(0, 3)))
      .catch(error => console.error('Error fetching artworks:', error));

    getArtists()
      .then(response => setArtists(response.data.slice(0, 3)))
      .catch(error => console.error('Error fetching artists:', error));
  }, []);

  return (
    <Container className="my-5">
      {/* Hero Section */}
      <div className="text-center mb-5" style={{ background: 'linear-gradient(to right, #ff4b2b, #ff416c)', padding: '50px', borderRadius: '15px', color: 'white' }}>
        <h1 className="display-4">The Spirit of Graffiti</h1>
        <p className="lead">Explore the Streets in Color</p>
        <Button variant="primary" size="lg" href="/gallery">Explore Gallery</Button>
      </div>

      {/* Upcoming Events */}
      <h2 className="mb-4">Upcoming Events</h2>
      <Row>
        {events.map(event => (
          <Col md={6} key={event.id} className="mb-4">
            <Card style={{ background: event.title.includes('Expo') ? '#ff4b2b' : '#ffc107', color: 'white' }}>
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>
                  {event.description}<br />
                  <strong>Date:</strong> {event.date}<br />
                  <strong>Location:</strong> {event.location}<br />
                  <strong>Time:</strong> {event.time}
                </Card.Text>
                <Button variant="light">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Art Uploads */}
      <h2 className="mb-4">Recent Art Uploads</h2>
      <Row>
        {artworks.map(artwork => (
          <Col md={4} key={artwork.id} className="mb-4">
            <Card>
              {artwork.image && <Card.Img variant="top" src={`http://localhost:8000${artwork.image}`} />}
              <Card.Body>
                <Card.Title>{artwork.title}</Card.Title>
                <Card.Text>{artwork.description}</Card.Text>
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Artist Spotlight */}
      <h2 className="mb-4">Artist Spotlight</h2>
      <Row>
        {artists.map(artist => (
          <Col md={4} key={artist.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{artist.user.username}</Card.Title>
                <Card.Text>{artist.specialty}</Card.Text>
                <Button variant="primary">View Portfolio</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
