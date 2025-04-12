import React from 'react';
import { Container } from 'react-bootstrap';

function ContactPage() {
  return (
    <Container className="my-5">
      <h2 className="mb-4">Contact Us</h2>
      <p><strong>Email:</strong> thee_UrbanKreative@artworld.com</p>
      <p><strong>Location:</strong> 45 Urban Walls, Allsops, Nairobi</p>
      <p><strong>Phone:</strong> +254123456789</p>
      <h4>Connect with Us</h4>
      <p>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a> | 
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a> | 
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a> | 
        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
      </p>
    </Container>
  );
}

export default ContactPage;
