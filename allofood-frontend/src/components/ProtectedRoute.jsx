import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';

const ProtectedRoute = ({ Component, roles, ...rest }) => {
  const { user } = useAuth();

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="login" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;