import React, { useState, useContext } from 'react';
import { Container, Form, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/api';

function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password, role)
      .then(response => {
        setUser(response.data.user);
        navigate('/');
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Login failed');
      });
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <Form.Group className="mb-3" controlId="role">
          <Form.Label>Login as</Form.Label>
          <Dropdown onSelect={(selectedRole) => setRole(selectedRole)}>
            <Dropdown.Toggle variant="secondary" id="dropdown-role">
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="user">User</Dropdown.Item>
              <Dropdown.Item eventKey="artist">Artist</Dropdown.Item>
              <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
      <p className="mt-3">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </Container>
  );
}

export default LoginPage;
