import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getArtists } from '../services/api';

function ArtistsPage() {
  const [artists, setArtists] = useState([]);

  // Fetch artists using the API service
  useEffect(() => {
    getArtists()
      .then(response => setArtists(response.data))
      .catch(error => console.error('Error fetching artists:', error));
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4">Artist Spotlight</h2>
      <Row>
        {artists.map(artist => (
          <Col md={4} key={artist.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{artist.user.username}</Card.Title>
                <Card.Text>
                  <strong>Specialty:</strong> {artist.specialty}<br />
                  {artist.portfolio}
                </Card.Text>
                <Button variant="primary">View Portfolio</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ArtistsPage;
