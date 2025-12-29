import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!token) {
        // Not logged in
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Logged in but doesn't have the right role
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;