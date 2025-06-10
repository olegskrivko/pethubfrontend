import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAuth } from '../../../contexts/AuthContext';

const PrivateRoute = () => {
  const { user, isAuthLoading } = useAuth();

  // Show full-page spinner while auth is loading
  if (isAuthLoading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render nested protected route
  return <Outlet />;
};

export default PrivateRoute;
