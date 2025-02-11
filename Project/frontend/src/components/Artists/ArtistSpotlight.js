import { useEffect, useState } from 'react';
import API from '../../api/axiosConfig';

const ArtistSpotlight = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            const { data } = await API.get('/artists/spotlight/');
            setArtists(data);
        };
        fetchArtists();
    }, []);

    return (
        <div>
            <h2>Artist Spotlight</h2>
            {artists.map((artist) => (
                <div key={artist.id}>
                    <h3>{artist.name}</h3>
                    <p>{artist.bio}</p>
                    <img src={artist.profile_picture} alt={artist.name} width="150" />
                </div>
            ))}
        </div>
    );
};

export default ArtistSpotlight;
