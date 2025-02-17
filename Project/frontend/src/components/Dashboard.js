import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig';
import './Dashboard.css'; // Assuming you have a CSS file for styling

const Dashboard = () => {
    const [featuredArtworks, setFeaturedArtworks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedArtworks = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data } = await API.get('/artworks/featured/');
                setFeaturedArtworks(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch featured artworks.');
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedArtworks();
    }, []);

    return (
        <div className="dashboard">
            <h1>Welcome to the Art & Graffiti Dashboard</h1>
            <p>Explore the latest and greatest in urban art and graffiti.</p>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <section className="featured-artworks">
                <h2>Featured Artworks</h2>
                <div className="artworks-grid">
                    {featuredArtworks.length > 0 ? (
                        featuredArtworks.map((artwork) => (
                            <div key={artwork.id} className="artwork-card">
                                <img src={artwork.image_url} alt={artwork.title} className="artwork-image" />
                                <h3>{artwork.title}</h3>
                                <p>{artwork.artist}</p>
                                <p>{artwork.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No featured artworks available.</p>
                    )}
                </div>
            </section>

            <section className="dashboard-stats">
                <h2>Quick Stats</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Artworks</h3>
                        <p>1,234</p>
                    </div>
                    <div className="stat-card">
                        <h3>New This Week</h3>
                        <p>56</p>
                    </div>
                    <div className="stat-card">
                        <h3>Top Artist</h3>
                        <p>Banksy</p>
                    </div>
                </div>
            </section>

            <section className="recent-activity">
                <h2>Recent Activity</h2>
                <ul>
                    <li>User123 liked "Urban Dream"</li>
                    <li>Artist456 uploaded a new artwork</li>
                    <li>GraffitiLover commented on "City Lights"</li>
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;