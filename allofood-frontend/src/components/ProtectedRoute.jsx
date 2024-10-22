import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ Component, roles, ...rest }) => {
  const userRole = useUser();

  if (!roles.includes(userRole)) {
    return <Navigate to="/not-found" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;