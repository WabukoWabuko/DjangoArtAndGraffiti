import React, { useEffect, useState, useContext } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { updateUser, getAnalytics } from '../services/api'; // Removed getUser
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';

function UserProfilePage() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    if (user) {
      setProfile(user);
      setBio(user.bio || '');
      getAnalytics()
        .then(response => {
          const userAnalytics = response.data.filter(item => item.user === user.id);
          setAnalytics(userAnalytics);
        })
        .catch(error => console.error('Error fetching analytics:', error));
    }
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePicture) formData.append('profile_picture', profilePicture);

    updateUser(profile.id, formData)
      .then(response => {
        setProfile(response.data);
        alert('Profile updated successfully!');
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('User Activity Report', 20, 20);
    doc.text(`User: ${profile.username}`, 20, 30);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 40);

    doc.text('Activity Summary', 20, 60);
    doc.autoTable({
      startY: 70,
      head: [['Date', 'Views', 'Uploads']],
      body: analytics.map(item => [
        new Date(item.timestamp).toLocaleDateString(),
        item.views,
        item.uploads,
      ]),
    });

    doc.save('user-report.pdf');
  };

  const analyticsData = analytics.map(item => ({
    date: new Date(item.timestamp).toLocaleDateString(),
    views: item.views,
    uploads: item.uploads,
  }));

  if (!profile) return <Container className="my-5"><p>Loading...</p></Container>;

  return (
    <Container className="my-5">
      <h2 className="mb-4">User Profile</h2>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{profile.username}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {profile.email}<br />
            <strong>Bio:</strong> {profile.bio || 'No bio yet.'}<br />
            {profile.profile_picture && (
              <img
                src={`http://localhost:8000${profile.profile_picture}`}
                alt="Profile"
                style={{ width: '100px', borderRadius: '50%' }}
              />
            )}
          </Card.Text>
        </Card.Body>
      </Card>

      {analytics.length > 0 && (
        <>
          <h4 className="mb-3">Your Activity</h4>
          <BarChart width={600} height={300} data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="views" fill="#ff4b2b" />
            <Bar dataKey="uploads" fill="#ff416c" />
          </BarChart>
          <Button variant="success" onClick={generatePDF} className="mt-3">Generate PDF Report</Button>
        </>
      )}

      <h4 className="mt-5">Update Profile</h4>
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
