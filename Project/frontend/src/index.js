import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/authContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="894285230969-3ue2gbc9aj5prl1l2qlsqihsje41m61j.apps.googleusercontent.com">
        <AuthProvider>
            <App />
        </AuthProvider>
    </GoogleOAuthProvider>
);
