import React, { useState, useContext } from 'react';
import { Container, Form, Button, Card, Dropdown, Tabs, Tab } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login, registerUser } from '../services/api';

function AuthPage() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); // Toggle between login and register
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    role: 'user'
  });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    is_artist: false
  });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(loginData.username, loginData.password, loginData.role)
      .then(response => {
        setUser(response.data.user);
        navigate('/');
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Login failed');
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    registerUser(
      registerData.username,
      registerData.email,
      registerData.password,
      registerData.is_artist
    )
      .then(response => {
        setUser(response.data.user);
        navigate('/');
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Registration failed');
      });
  };

  return (
    <div
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-2c7ed3ab7221?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
          backgroundColor: 'rgba(0, 0, 0, 0.7)' // Dark overlay
        }}
      />
      <Container style={{ maxWidth: '500px', position: 'relative', zIndex: 1 }}>
        <Card
          className="p-4"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '15px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-4" style={{ fontFamily: 'Montserrat, sans-serif', color: '#ff4b2b' }}>
              Graffiti Hub
            </h2>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-4"
              justify
              style={{ borderBottom: '2px solid #ff4b2b' }}
            >
              <Tab eventKey="login" title="Login">
                <Form onSubmit={handleLogin}>
                  {error && <p className="text-danger text-center">{error}</p>}
                  <Form.Group className="mb-3" controlId="loginUsername">
                    <Form.Label style={{ fontFamily: 'Open Sans, sans-serif', color: '#333' }}>
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={loginData.username}
                      onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                      required
                      style={{ borderRadius: '8px', borderColor: '#ff4b2b' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label style={{ fontFamily: 'Open Sans, sans-serif', color: '#333' }}>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      style={{ borderRadius: '8px', borderColor: '#ff4b2b' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="loginRole">
                    <Form.Label style={{ fontFamily: 'Open Sans, sans-serif', color: '#333' }}>
                      Login as
                    </Form.Label>
                    <Dropdown onSelect={(selectedRole) => setLoginData({ ...loginData, role: selectedRole })}>
                      <Dropdown.Toggle
                        variant="outline-primary"
                        id="dropdown-role"
                        style={{ width: '100%', borderRadius: '8px', borderColor: '#ff4b2b', color: '#ff4b2b' }}
                      >
                        {loginData.role.charAt(0).toUpperCase() + loginData.role.slice(1)}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ width: '100%' }}>
                        <Dropdown.Item eventKey="user">User</Dropdown.Item>
                        <Dropdown.Item eventKey="artist">Artist</Dropdown.Item>
                        <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    style={{
                      backgroundColor: '#ff4b2b',
                      borderColor: '#ff4b2b',
                      borderRadius: '8px',
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                  >
                    Login
                  </Button>
                </Form>
              </Tab>
              <Tab eventKey="register" title="Register">
                <Form onSubmit={handleRegister}>
                  {error && <p className="text-danger text-center">{error}</p>}
                  <Form.Group className="mb-3" controlId="registerUsername">
                    <Form.Label style={{ fontFamily: 'Open Sans, sans-serif', color: '#333' }}>
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={registerData.username}
                      onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                      required
                      style={{ borderRadius: '8px', borderColor: '#ff4b2b' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="registerEmail">
                    <Form.Label style={{ fontFamily: 'Open Sans, sans-serif', color: '#333' }}>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                      style={{ borderRadius: '8px', borderColor: '#ff4b2b' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="registerPassword">
                    <Form.Label style={{ fontFamily: 'Open Sans, sans-serif', color: '#333' }}>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                      style={{ borderRadius: '8px', borderColor: '#ff4b2b' }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="registerIsArtist">
                    <Form.Check
                      type="checkbox"
                      label="I am an artist"
                      checked={registerData.is_artist}
                      onChange={(e) => setRegisterData({ ...registerData, is_artist: e.target.checked })}
                      style={{ color: '#333', fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    style={{
                      backgroundColor: '#ff4b2b',
                      borderColor: '#ff4b2b',
                      borderRadius: '8px',
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                  >
                    Register
                  </Button>
                </Form>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default AuthPage;
