import { useEffect, useState, useContext } from 'react';
import API from '../../api/axiosConfig';
import { AuthContext } from '../../context/AuthContext';

const CommunityInsights = () => {
    const [insights, setInsights] = useState([]);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchInsights = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data } = await API.get('/community/insights/');
                setInsights(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch community insights.');
            } finally {
                setLoading(false);
            }
        };

        fetchInsights();
    }, []);

    const submitRating = async (postId) => {
        setLoading(true);
        setError(null);

        try {
            await API.post(`/community/rate/${postId}/`, { rating });
            alert('Rating submitted!');
            // Optionally, refresh the insights to show the updated average rating
            const { data } = await API.get('/community/insights/');
            setInsights(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit rating. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Community Insights</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {insights.length > 0 ? (
                insights.map((post) => (
                    <div key={post.id}>
                        <h4>{post.title}</h4>
                        <p>{post.content}</p>
                        <p>Average Rating: {post.avg_rating} ⭐</p>

                        {user && (
                            <div>
                                <label>Rate this post:</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    disabled={loading}
                                />
                                <button onClick={() => submitRating(post.id)} disabled={loading}>
                                    {loading ? 'Submitting...' : 'Submit Rating'}
                                </button>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No insights available.</p>
            )}
        </div>
    );
};

export default CommunityInsights;