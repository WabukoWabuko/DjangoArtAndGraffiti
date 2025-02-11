import { useEffect, useState } from 'react';
import API from '../../api/axiosConfig';

const RecentUploads = () => {
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        const fetchUploads = async () => {
            const { data } = await API.get('/uploads/');
            setUploads(data);
        };
        fetchUploads();
    }, []);

    return (
        <div>
            <h2>Recent Uploads</h2>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {uploads.map((upload) => (
                    <div key={upload.id}>
                        <img src={upload.image_url} alt={upload.title} width="200" />
                        <h4>{upload.title}</h4>
                        <p>{upload.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentUploads;
