// export default RecentPets;
import React, { useEffect, useState } from 'react';
// Import MUI components
import { Link } from 'react-router-dom';

// Assuming PetCard is in the same directory or adjust the path
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';

import { useAuth } from '../contexts/AuthContext';
import PetCard from '../pages/pets/components/PetCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RecentPets = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state to handle login errors
  const accessToken = localStorage.getItem('access_token');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Small screens (xs, sm)
  useEffect(() => {
    if (!accessToken) {
      setError('You must be logged in to view shelters.');
      setLoading(false);
      return;
    }

    // Fetch the latest 4 pets from the backend
    axios
      .get(`${API_BASE_URL}/api/pets/recent-pets/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setPets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the pets:', error);
        setLoading(false);
      });
  }, [accessToken]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress /> {/* Show loading spinner while fetching data */}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Grid container spacing={3} justifyContent="center">
        {pets.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary" textAlign="center">
              No pets found
            </Typography>
          </Grid>
        ) : (
          pets.map((pet) => (
            <Grid item xs={6} sm={6} md={3} key={pet.id} mt={4}>
              <PetCard
                pet={pet}
                onPanToLocation={(lat, lon) => {
                  /* Handle pan to location */
                }}
              />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default RecentPets;
