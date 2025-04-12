import React from 'react';
import { Container } from 'react-bootstrap';

function AboutPage() {
  return (
    <Container className="my-5">
      <h2 className="mb-4">About Us</h2>
      <p>
        Our platform celebrates street culture, featuring emerging and established graffiti artists from around the world. Join us as we explore urban art in vibrant colors and bold statements.
      </p>
      <h4>Explore More</h4>
      <ul>
        <li>Featured Artists</li>
        <li>Street Galleries</li>
        <li>Events</li>
        <li>Submit Your Art</li>
      </ul>
    </Container>
  );
}

export default AboutPage;
