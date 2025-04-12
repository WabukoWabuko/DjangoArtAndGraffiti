import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { registerUser } from '../services/api';

function RegisterPage() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isArtist, setIsArtist] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    registerUser(username, email, password, isArtist)
      .then(response => {
        setUser(response.data.user);
        navigate('/');
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Registration failed');
      });
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Register</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="isArtist">
          <Form.Check
            type="checkbox"
            label="I am an artist"
            checked={isArtist}
            onChange={(e) => setIsArtist(e.target.checked)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Register</Button>
      </Form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </Container>
  );
}

export default RegisterPage;
