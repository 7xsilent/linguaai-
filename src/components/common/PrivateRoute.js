import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // You can optionally show a loading spinner here if you want
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
