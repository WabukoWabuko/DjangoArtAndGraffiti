import React from 'react';

const GoogleAuth = ({ onGoogleLogin, loading }) => {
    return (
        <button 
            onClick={onGoogleLogin} 
            className="google-btn"
            disabled={loading}
        >
            {loading ? 'Processing...' : 'Google'}
        </button>
    );
};

export default GoogleAuth;
