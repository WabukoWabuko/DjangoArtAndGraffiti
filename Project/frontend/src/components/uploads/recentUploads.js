import { useEffect, useState } from 'react';
import API from '../../api/axiosConfig';

const RecentUploads = () => {
    const [uploads, setUploads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUploads = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data } = await API.get('/uploads/');
                setUploads(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch recent uploads.');
            } finally {
                setLoading(false);
            }
        };

        fetchUploads();
    }, []);

    return (
        <div>
            <h2>Recent Uploads</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {uploads.length > 0 ? (
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {uploads.map((upload) => (
                        <div key={upload.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                            <img src={upload.image_url} alt={upload.title} width="200" style={{ borderRadius: '5px' }} />
                            <h4>{upload.title}</h4>
                            <p>{upload.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No recent uploads available.</p>
            )}
        </div>
    );
};

export default RecentUploads;