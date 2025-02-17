import { useEffect, useContext, useState, useCallback } from 'react';
import { AuthContext } from '../../context/authContext';
import API from '../../api/axiosConfig';

const GoogleAuth = () => {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState(null);

    // Memoize the handleCredentialResponse function
    const handleCredentialResponse = useCallback(async (response) => {
        try {
            const { data } = await API.post('/auth/google/', {
                token: response.credential,
            });
            login(data.access, data.refresh); // Update the AuthContext with the new tokens
        } catch (err) {
            setError('Failed to authenticate with Google. Please try again.');
            console.error('Google authentication error:', err);
        }
    }, [login]);

    useEffect(() => {
        /* global google */
        if (window.google) {
            google.accounts.id.initialize({
                client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
                callback: handleCredentialResponse,
            });
            google.accounts.id.renderButton(document.getElementById('google-signin'), {
                theme: 'outline',
                size: 'large',
            });
        } else {
            setError('Google Sign-In library failed to load. Please try again.');
        }
    }, [handleCredentialResponse]); // Add handleCredentialResponse to the dependency array

    return (
        <div>
            <div id="google-signin"></div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default GoogleAuth;