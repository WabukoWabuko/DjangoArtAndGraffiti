import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getArtworks, getEvents, getArtists } from '../services/api';

function MainPage() {
  const [artworks, setArtworks] = useState([]);
  const [events, setEvents] = useState([]);
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      getArtworks().then(response => setArtworks(response.data)).catch(err => setError('Failed to load artworks')),
      getEvents().then(response => setEvents(response.data)).catch(err => setError('Failed to load events')),
      getArtists().then(response => setArtists(response.data)).catch(err => setError('Failed to load artists')),
    ]);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="bg-dark text-white text-center py-5">
        <Container>
          <h1>Welcome to Graffiti Hub</h1>
          <p>Discover the best street art and graffiti events in your area.</p>
          <Button variant="primary"In href="#gallery">Explore Gallery</Button>
        </Container>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-5">
        <Container>
          <h2 className="mb-4 text-center">Gallery</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          {artworks.length === 0 && !error && <p className="text-center">No artworks available.</p>}
          <Row>
            {artworks.map(artwork => (
              <Col md={4} key={artwork.id} className="mb-4">
                <Card>
                  {artwork.image && (
                    <Card.Img
                      variant="top"
                      src={`http://localhost:8000${artwork.image}`}
                      alt={artwork.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{artwork.title}</Card.Title>
                    <Card.Text>{artwork.description}</Card.Text>
                    <Card.Text><strong>Price:</strong> ${artwork.price}</Card.Text>
                    <Card.Text><strong>Category:</strong> {artwork.category}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Events Section */}
      <section id="events" className="py-5 bg-light">
        <Container>
          <h2 className="mb-4 text-center">Upcoming Events</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          {events.length === 0 && !error && <p className="text-center">No events available.</p>}
          <Row>
            {events.map(event => (
              <Col md={4} key={event.id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <Card.Text><strong>Date:</strong> {event.date}</Card.Text>
                    <Card.Text><strong>Location:</strong> {event.location}</Card.Text>
                    <Card.Text><strong>Time:</strong> {event.time}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Artists Section */}
      <section id="artists" className="py-5">
        <Container>
          <h2 className="mb-4 text-center">Featured Artists</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          {artists.length === 0 && !error && <p className="text-center">No artists available.</p>}
          <Row>
            {artists.map(artist => (
              <Col md={4} key={artist.id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Artist ID: {artist.user}</Card.Title>
                    <Card.Text><strong>Portfolio:</strong> {artist.portfolio}</Card.Text>
                    <Card.Text><strong>Specialty:</strong> {artist.specialty}</Card.Text>
                    <Card.Text><strong>Social Links:</strong> {JSON.stringify(artist.social_links)}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 bg-light">
        <Container>
          <h2 className="mb-4 text-center">About Us</h2>
          <p className="text-center">
            Graffiti Hub is a platform dedicated to showcasing the vibrant world of street art and graffiti.
            We connect artists, enthusiasts, and event organizers to celebrate creativity in public spaces.
          </p>
        </Container>
      </section>
    </div>
  );
}

export default MainPage;
