import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getEvents, createEvent, updateEvent, deleteEvent, getArtworks, createArtwork, updateArtwork, deleteArtwork, getArtists, createArtist, updateArtist, deleteArtist, getAnalytics } from '../services/api';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

function AdminDashboardPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '', time: '' });
  const [newArtwork, setNewArtwork] = useState({ title: '', artist: '', description: '', price: '', category: '', image: null });
  const [newArtist, setNewArtist] = useState({ user: '', portfolio: '', specialty: '', social_links: '' });

  // Fetch data
  useEffect(() => {
    if (!user || !user.is_staff) {
      navigate('/admin-login');
    }
    getEvents().then(response => setEvents(response.data));
    getArtworks().then(response => setArtworks(response.data));
    getArtists().then(response => setArtists(response.data));
    getAnalytics().then(response => setAnalytics(response.data));
  }, [user, navigate]);

  // Handle event CRUD
  const handleCreateEvent = (e) => {
    e.preventDefault();
    createEvent(newEvent)
      .then(response => {
        setEvents([...events, response.data]);
        setNewEvent({ title: '', description: '', date: '', location: '', time: '' });
      });
  };

  const handleUpdateEvent = (id, updatedEvent) => {
    updateEvent(id, updatedEvent)
      .then(response => {
        setEvents(events.map(event => (event.id === id ? response.data : event)));
      });
  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id)
      .then(() => {
        setEvents(events.filter(event => event.id !== id));
      });
  };

  // Handle artwork CRUD
  const handleCreateArtwork = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newArtwork).forEach(key => {
      if (key === 'image' && newArtwork[key]) {
        formData.append(key, newArtwork[key]);
      } else {
        formData.append(key, newArtwork[key]);
      }
    });
    createArtwork(formData)
      .then(response => {
        setArtworks([...artworks, response.data]);
        setNewArtwork({ title: '', artist: '', description: '', price: '', category: '', image: null });
      });
  };

  const handleUpdateArtwork = (id, updatedArtwork) => {
    updateArtwork(id, updatedArtwork)
      .then(response => {
        setArtworks(artworks.map(artwork => (artwork.id === id ? response.data : artwork)));
      });
  };

  const handleDeleteArtwork = (id) => {
    deleteArtwork(id)
      .then(() => {
        setArtworks(artworks.filter(artwork => artwork.id !== id));
      });
  };

  // Handle artist CRUD
  const handleCreateArtist = (e) => {
    e.preventDefault();
    createArtist(newArtist)
      .then(response => {
        setArtists([...artists, response.data]);
        setNewArtist({ user: '', portfolio: '', specialty: '', social_links: '' });
      });
  };

  const handleUpdateArtist = (id, updatedArtist) => {
    updateArtist(id, updatedArtist)
      .then(response => {
        setArtists(artists.map(artist => (artist.id === id ? response.data : artist)));
      });
  };

  const handleDeleteArtist = (id) => {
    deleteArtist(id)
      .then(() => {
        setArtists(artists.filter(artist => artist.id !== id));
      });
  };

  // Prepare data for charts
  const artworkCategories = artworks.reduce((acc, artwork) => {
    acc[artwork.category] = (acc[artwork.category] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.keys(artworkCategories).map(key => ({
    name: key,
    value: artworkCategories[key],
  }));

  const analyticsOverTime = analytics.map(item => ({
    timestamp: new Date(item.timestamp).toLocaleDateString(),
    views: item.views,
    sales: item.sales,
  }));

  const COLORS = ['#ff4b2b', '#ff416c', '#ffc107', '#28a745'];

  return (
    <Container className="my-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Stats Overview */}
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>{/* Placeholder until we fetch users */}50</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Artworks</Card.Title>
              <Card.Text>{artworks.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Events</Card.Title>
              <Card.Text>{events.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Analytics Visualizations */}
      <h3 className="mb-3">Platform Analytics</h3>
      <Row className="mb-5">
        <Col md={6}>
          <h4>Artwork Categories (Pie Chart)</h4>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Col>
        <Col md={6}>
          <h4>Views and Sales Over Time (Line Chart)</h4>
          <LineChart width={400} height={300} data={analyticsOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#ff4b2b" />
            <Line type="monotone" dataKey="sales" stroke="#ff416c" />
          </LineChart>
        </Col>
      </Row>

      {/* Manage Events */}
      <h3 className="mb-3">Manage Events</h3>
      <Form onSubmit={handleCreateEvent} className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              required
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              required
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              required
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="text"
              placeholder="Location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              required
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="text"
              placeholder="Time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              required
            />
          </Col>
        </Row>
        <Button type="submit" className="mt-3">Add Event</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Location</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.description}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
              <td>{event.time}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleUpdateEvent(event.id, { ...event, title: `${event.title} (Updated)` })}>
                  Update
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Manage Artworks */}
      <h3 className="mb-3 mt-5">Manage Artworks</h3>
      <Form onSubmit={handleCreateArtwork} className="mb-4">
        <Row>
          <Col md={2}>
            <Form.Control
              type="text"
              placeholder="Title"
              value={newArtwork.title}
              onChange={(e) => setNewArtwork({ ...newArtwork, title: e.target.value })}
              required
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Artist ID"
              value={newArtwork.artist}
              onChange={(e) => setNewArtwork({ ...newArtwork, artist: e.target.value })}
              required
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="text"
              placeholder="Description"
              value={newArtwork.description}
              onChange={(e) => setNewArtwork({ ...newArtwork, description: e.target.value })}
              required
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              placeholder="Price"
              value={newArtwork.price}
              onChange={(e) => setNewArtwork({ ...newArtwork, price: e.target.value })}
              required
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="text"
              placeholder="Category"
              value={newArtwork.category}
              onChange={(e) => setNewArtwork({ ...newArtwork, category: e.target.value })}
              required
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="file"
              onChange={(e) => setNewArtwork({ ...newArtwork, image: e.target.files[0] })}
            />
          </Col>
        </Row>
        <Button type="submit" className="mt-3">Add Artwork</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist ID</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {artworks.map(artwork => (
            <tr key={artwork.id}>
              <td>{artwork.title}</td>
              <td>{artwork.artist}</td>
              <td>{artwork.description}</td>
              <td>${artwork.price}</td>
              <td>{artwork.category}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleUpdateArtwork(artwork.id, { ...artwork, title: `${artwork.title} (Updated)` })}>
                  Update
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDeleteArtwork(artwork.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Manage Artists */}
      <h3 className="mb-3 mt-5">Manage Artists</h3>
      <Form onSubmit={handleCreateArtist} className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Control
              type="number"
              placeholder="User ID"
              value={newArtist.user}
              onChange={(e) => setNewArtist({ ...newArtist, user: e.target.value })}
              required
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Portfolio"
              value={newArtist.portfolio}
              onChange={(e) => setNewArtist({ ...newArtist, portfolio: e.target.value })}
              required
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Specialty"
              value={newArtist.specialty}
              onChange={(e) => setNewArtist({ ...newArtist, specialty: e.target.value })}
              required
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Social Links (JSON)"
              value={newArtist.social_links}
              onChange={(e) => setNewArtist({ ...newArtist, social_links: e.target.value })}
            />
          </Col>
        </Row>
        <Button type="submit" className="mt-3">Add Artist</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Portfolio</th>
            <th>Specialty</th>
            <th>Social Links</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {artists.map(artist => (
            <tr key={artist.id}>
              <td>{artist.user}</td>
              <td>{artist.portfolio}</td>
              <td>{artist.specialty}</td>
              <td>{JSON.stringify(artist.social_links)}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleUpdateArtist(artist.id, { ...artist, specialty: `${artist.specialty} (Updated)` })}>
                  Update
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDeleteArtist(artist.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminDashboardPage;
