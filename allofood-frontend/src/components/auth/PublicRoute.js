import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'context/auth/AuthContext';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) return <Navigate to={location.state?.from?.pathname || '/'} replace />
  
  return children;
};

export default PublicRoute;