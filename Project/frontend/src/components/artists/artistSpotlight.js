import { useEffect, useState } from 'react';
import API from '../../api/axiosConfig';

const ArtistSpotlight = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const { data } = await API.get('/artists/spotlight/');
                setArtists(data);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching artists.');
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Artist Spotlight</h2>
            {artists.length > 0 ? (
                artists.map((artist) => (
                    <div key={artist.id}>
                        <h3>{artist.name}</h3>
                        <p>{artist.bio}</p>
                        <img src={artist.profile_picture} alt={artist.name} width="150" />
                    </div>
                ))
            ) : (
                <p>No artists found.</p>
            )}
        </div>
    );
};

export default ArtistSpotlight;