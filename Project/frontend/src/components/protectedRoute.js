import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const ProtectedRoute = ({ children, roles = [] }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    // Redirect to login if user is not authenticated
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if user has the required role
    if (roles.length > 0 && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;