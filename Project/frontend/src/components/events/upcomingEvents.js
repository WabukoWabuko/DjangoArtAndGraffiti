import { useEffect, useState, useContext } from 'react';
import API from '../../api/axiosConfig';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data } = await API.get('/events/');
                setEvents(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch upcoming events.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleCreateEvent = () => {
        navigate('/events/create'); // Redirect to the event creation page
    };

    return (
        <div>
            <h2>Upcoming Events</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {user?.is_staff && (
                <button onClick={handleCreateEvent}>Create Event</button>
            )}
            {events.length > 0 ? (
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No upcoming events.</p>
            )}
        </div>
    );
};

export default UpcomingEvents;