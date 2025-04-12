import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { getArtworks, getEvents, getArtists } from '../services/api';

function MainPage() {
  const [artworks, setArtworks] = useState([]);
  const [events, setEvents] = useState([]);
  const [artists, setArtists] = useState([]);
  const [artworksError, setArtworksError] = useState('');
  const [eventsError, setEventsError] = useState('');
  const [artistsError, setArtistsError] = useState('');

  useEffect(() => {
    getArtworks()
      .then(response => setArtworks(response.data))
      .catch(err => setArtworksError('Failed to load artworks'));
    getEvents()
      .then(response => setEvents(response.data))
      .catch(err => setEventsError('Failed to load events'));
    getArtists()
      .then(response => setArtists(response.data))
      .catch(err => {
        setArtistsError('Failed to load artists');
        console.error('Error fetching artists:', err);
      });
  }, []);

  const carouselItems = [
    {
      image: 'https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      title: 'Urban Art Festival',
      description: 'Join us for a vibrant celebration of street art in the heart of the city.'
    },
    {
      image: 'https://images.unsplash.com/photo-1579783902614-a33179db7f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      title: 'Graffiti Workshops',
      description: 'Learn the art of graffiti from renowned artists in our hands-on workshops.'
    },
    {
      image: 'https://images.unsplash.com/photo-1558584707-4d9d1f258685?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      title: 'Street Art Gallery',
      description: 'Explore a curated collection of street art from around the world.'
    },
    {
      image: 'https://images.unsplash.com/photo-1561214078-9a2c16c59c80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      title: 'Artist Meetups',
      description: 'Connect with fellow artists and share your passion for graffiti.'
    }
  ];

  return (
    <div>
      {/* Hero Section with Carousel */}
      <section
        id="home"
        className="text-white text-center py-5"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-2c7ed3ab7221?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px',
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)' // Dark overlay for better text visibility
          }}
        />
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="mb-4">Welcome to Graffiti Hub</h1>
          <p className="mb-4">Discover the best street art and graffiti events in your area.</p>
          <Carousel className="mb-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {carouselItems.map((item, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={item.image}
                  alt={item.title}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          <Button variant="primary" href="#gallery">Explore Gallery</Button>
        </Container>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-5">
        <Container>
          <h2 className="mb-4 text-center">Gallery</h2>
          {artworksError && <p className="text-danger text-center">{artworksError}</p>}
          {artworks.length === 0 && !artworksError && <p className="text-center">No artworks available.</p>}
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
          {eventsError && <p className="text-danger text-center">{eventsError}</p>}
          {events.length === 0 && !eventsError && <p className="text-center">No events available.</p>}
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
          {artistsError && <p className="text-danger text-center">{artistsError}</p>}
          {artists.length === 0 && !artistsError && <p className="text-center">No artists available.</p>}
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
