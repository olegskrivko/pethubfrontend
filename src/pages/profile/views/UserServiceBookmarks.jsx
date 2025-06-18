import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  Link as MuiLink,
  Tooltip,
  Typography,
} from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UserServiceBookmarks() {
  const { user } = useAuth(); // Assuming you are managing user state in context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoritedServices, setFavoritedServices] = useState([]);

  useEffect(() => {
    const fetchFavoritedServices = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setError('You must be logged in to view favorited services.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/accounts/favorite-services/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add Authorization header with token
          },
        });

        setFavoritedServices(response.data); // Since axios already parses the response
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error('Error fetching favorited services data:', error);
        setError('Failed to fetch favorited services data');
        setLoading(false); // Stop loading even when there’s an error
      }
    };

    fetchFavoritedServices();
  }, []);

  // const handleDeletePet = async (petId) => {
  //   const accessToken = localStorage.getItem('access_token');
  //   if (!accessToken) {
  //     alert('You must be logged in to delete pets.');
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`https://petfinderbackend-production.up.railway.app/api/user-profile/favorite-pets/${petId}/remove/`, {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.ok) {
  //       alert('Pet removed from favorites successfully');
  //       // You can trigger a re-fetch or update your UI accordingly
  //     } else {
  //       const errorData = await response.json();
  //       alert(`Error: ${errorData.detail}`);
  //     }
  //   } catch (error) {
  //     console.error('Error removing pet from favorites:', error);
  //     alert('Error removing pet from favorites');
  //   }
  // };
  const handleDeleteService = async (serviceId) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert('You must be logged in to delete services.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/accounts/favorite-services/${serviceId}/remove/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the deleted service from state
        setFavoritedServices((prevServices) => prevServices.filter((service) => service.id !== serviceId));
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error removing service from favorites:', error);
      alert('Error removing service from favorites');
    }
  };

  const handleEditService = (serviceId) => {
    navigate(`/user-profile/edit-service/${serviceId}`);
  };

  // Loading and error state handling
  if (loading) {
    return (
      <Container>
        <Typography variant="h5" align="center">
          Loading your favorited services...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h5" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="lg">
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 5,
          fontWeight: 800,

          background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Saglabātie pakalpojumi
      </Typography>
      {favoritedServices.length === 0 ? (
        // Show message when no bookmarks are available
        <Card
          sx={{
            p: 2,
            borderRadius: 3,
            background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
            },
          }}
        >
          {/* <CardContent  sx={{paddingBottom: "1rem !important"}}> */}

          <Box display="flex" alignItems="center">
            <BookmarkIcon color="primary" sx={{ fontSize: 28, marginRight: '1rem' }} />
            <Typography variant="body2" color="textSecondary">
              Jums vēl nav saglabātu sludinājumu.
            </Typography>
          </Box>
          {/* </CardContent> */}
        </Card>
      ) : (
        <Grid container spacing={2}>
          {favoritedServices.map((service) => (
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={service.id}>
              <Card
                sx={{
                  px: 2,

                  borderRadius: 3,
                  background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                  // boxShadow: '0px 3px 10px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    // boxShadow: '0px 6px 20px rgba(0,0,0,0.1)',
                    // transform: 'scale(1.01)',
                    background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                  },
                  // '&:focus': {
                  //   outline: '2px solid #00b5ad',
                  // },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={service.service_image_1}
                      alt={service.title}
                      sx={{ width: 64, height: 64, marginRight: 2 }}
                    />
                    <Box flexGrow={1}>
                      <Typography variant="h6">
                        <MuiLink href={`/services/${service.id}`} underline="none">
                          <Chip
                            label={service.title || 'Nezināms'}
                            size="small"
                            variant="contained"
                            style={{
                              backgroundColor: '#5B9BD5',
                              color: '#fff',
                            }}
                          />
                        </MuiLink>
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {service.title || 'Nav statusa'}
                      </Typography>
                    </Box>
                    <Tooltip title="Izdzēst">
                      <IconButton
                        edge="end"
                        color="error"
                        aria-label="delete"
                        style={{ backgroundColor: '#FF746C', color: '#fff' }}
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Box textAlign="center" style={{ display: 'flex', justifyContent: 'space-between' }} mt={4}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIcon />}
              component={Link}
              to={`/user-profile`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Atpakaļ
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserServiceBookmarks;
