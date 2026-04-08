import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // We check for a "user" item in localStorage to see if they are logged in
    const isAuthenticated = localStorage.getItem('user');

    if (!isAuthenticated) {
        // If not logged in, kick them back to Login
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;