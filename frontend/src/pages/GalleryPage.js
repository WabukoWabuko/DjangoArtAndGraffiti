import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function GalleryPage() {
  const [artworks, setArtworks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Fetch artworks from Django API
  useEffect(() => {
    axios.get('http://localhost:8000/api/artworks/')
      .then(response => setArtworks(response.data))
      .catch(error => console.error('Error fetching artworks:', error));
  }, []);

  // Handle modal open/close
  const handleShow = (artwork) => {
    setSelectedArtwork(artwork);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  return (
    <Container className="my-5">
      <h2 className="mb-4">Explore the Gallery</h2>
      <Row>
        {artworks.map(artwork => (
          <Col md={4} key={artwork.id} className="mb-4">
            <Card onClick={() => handleShow(artwork)} style={{ cursor: 'pointer' }}>
              {artwork.image && <Card.Img variant="top" src={`http://localhost:8000${artwork.image}`} />}
              {artwork.video && (
                <video controls className="w-100" style={{ height: '200px' }}>
                  <source src={`http://localhost:8000${artwork.video}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <Card.Body>
                <Card.Title>{artwork.title}</Card.Title>
                <Card.Text>{artwork.category}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for full-screen view */}
      {selectedArtwork && (
        <Modal show={showModal} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedArtwork.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedArtwork.image && (
              <img src={`http://localhost:8000${selectedArtwork.image}`} alt={selectedArtwork.title} className="img-fluid" />
            )}
            {selectedArtwork.video && (
              <video controls className="w-100">
                <source src={`http://localhost:8000${selectedArtwork.video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <p className="mt-3">{selectedArtwork.description}</p>
            <p><strong>Price:</strong> ${selectedArtwork.price}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default GalleryPage;
