// ProtectedRoute.js
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const user = useSelector((state) => state.user.userInfo); // Assuming user data is stored in the 'user' slice

  

  // Check if the user is authenticated and has the required role
  if (!user || user.role !== role) {
    return <Navigate to="/machine_listing" replace />;
  }

  return children;
};

export default ProtectedRoute;
