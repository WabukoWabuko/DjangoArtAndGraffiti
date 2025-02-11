import { useEffect, useState, useContext } from 'react';
import API from '../../api/axiosConfig';
import { AuthContext } from '../../context/AuthContext';

const CommunityInsights = () => {
    const [insights, setInsights] = useState([]);
    const [rating, setRating] = useState(0);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchInsights = async () => {
            const { data } = await API.get('/community/insights/');
            setInsights(data);
        };
        fetchInsights();
    }, []);

    const submitRating = async (postId) => {
        await API.post(`/community/rate/${postId}/`, { rating });
        alert('Rating submitted!');
    };

    return (
        <div>
            <h2>Community Insights</h2>
            {insights.map((post) => (
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
                                onChange={(e) => setRating(e.target.value)}
                            />
                            <button onClick={() => submitRating(post.id)}>Submit Rating</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommunityInsights;
