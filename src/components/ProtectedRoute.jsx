import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AUTH_STATUS } from '@/types/auth';

const ProtectedRoute = ({ children, allowedTypes }) => {
  const { user, status } = useAuth();
  const location = useLocation();

  if (status === AUTH_STATUS.LOADING) {
    return <div>Loading...</div>;
  }

  if (status === AUTH_STATUS.UNAUTHENTICATED) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedTypes && !allowedTypes.includes(user.type)) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 