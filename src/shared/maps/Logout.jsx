// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import { useAuth } from '../contexts/AuthContext';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from the context
    navigate('/login'); // Optionally, redirect to login page after logout
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
