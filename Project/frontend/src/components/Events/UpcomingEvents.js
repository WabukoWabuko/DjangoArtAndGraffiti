import { useEffect, useState, useContext } from 'react';
import API from '../../api/axiosConfig';
import { AuthContext } from '../../context/AuthContext';

const UpcomingEvents = () => {
    const [events, setEvents] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchEvents = async () => {
            const { data } = await API.get('/events/');
            setEvents(data);
        };
        fetchEvents();
    }, []);

    return (
        <div>
            <h2>Upcoming Events</h2>
            {user?.is_staff && (
                <button onClick={() => alert('Redirect to Event Creation Page')}>Create Event</button>
            )}
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <p>Date: {event.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpcomingEvents;
