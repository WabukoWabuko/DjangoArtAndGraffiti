import { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import API from '../../api/axiosConfig';

const GoogleAuth = () => {
    const { login } = useContext(AuthContext);

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: 'YOUR_GOOGLE_CLIENT_ID',
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(document.getElementById('google-signin'), {
            theme: 'outline',
            size: 'large'
        });
    }, []);

    const handleCredentialResponse = async (response) => {
        const { data } = await API.post('/auth/google/', {
            token: response.credential
        });
        login(data.access, data.refresh);
    };

    return <div id="google-signin"></div>;
};

export default GoogleAuth;
