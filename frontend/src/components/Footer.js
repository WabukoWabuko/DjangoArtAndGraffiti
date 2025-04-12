import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Contact Us</h5>
            <p>Email: contact@graffitihub.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </Col>
          <Col md={6} className="text-md-end">
            <h5>Follow Us</h5>
            <p>
              <a href="https://twitter.com/graffitihub" className="text-white me-2">Twitter</a>
              <a href="https://instagram.com/graffitihub" className="text-white me-2">Instagram</a>
              <a href="https://facebook.com/graffitihub" className="text-white">Facebook</a>
            </p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Graffiti Hub. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
