import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  // Fetch the current user (placeholder until we implement proper auth)
  useEffect(() => {
    // For now, fetch a user as an example; we'll replace this with proper auth later
    axios.get('http://localhost:8000/api/users/1/', { withCredentials: true })
      .then(response => {
        setUser(response.data);
        setBio(response.data.bio);
      })
      .catch(error => console.error('Error fetching user:', error));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePicture) formData.append('profile_picture', profilePicture);

    axios.patch(`http://localhost:8000/api/users/${user.id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    })
      .then(response => {
        setUser(response.data);
        alert('Profile updated successfully!');
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  if (!user) return <Container className="my-5"><p>Loading...</p></Container>;

  return (
    <Container className="my-5">
      <h2 className="mb-4">User Profile</h2>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{user.username}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user.email}<br />
            <strong>Bio:</strong> {user.bio || 'No bio yet.'}<br />
            {user.profile_picture && (
              <img
                src={`http://localhost:8000${user.profile_picture}`}
                alt="Profile"
                style={{ width: '100px', borderRadius: '50%' }}
              />
            )}
          </Card.Text>
        </Card.Body>
      </Card>
      <h4>Update Profile</h4>
      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-3" controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="profilePicture">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Update Profile</Button>
      </Form>
    </Container>
  );
}

export default UserProfilePage;
