import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import FlagIcon from '@mui/icons-material/Flag';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import PetsIcon from '@mui/icons-material/Pets';
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
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Lottie from 'lottie-react';

import spinnerAnimation from '../../../assets/Animation-1749725645616.json';
import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UserPetBookmarks() {
  const { user } = useAuth(); // Assuming you are managing user state in context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favoritedPets, setFavoritedPets] = useState([]);

  useEffect(() => {
    const fetchFavoritedPets = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setError('You must be logged in to view favorited pets.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/accounts/favorite-pets/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Add Authorization header with token
          },
        });

        setFavoritedPets(response.data); // Since axios already parses the response
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error('Error fetching favorited pets data:', error);
        setError('Failed to fetch favorited pets data');
        setLoading(false); // Stop loading even when there’s an error
      }
    };

    fetchFavoritedPets();
  }, []);

  const handleDeletePet = async (petId) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert('You must be logged in to delete pets.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/accounts/favorite-pets/${petId}/remove/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the deleted pet from state
        setFavoritedPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error removing pet from favorites:', error);
      alert('Error removing pet from favorites');
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: 180, height: 180 }}>
          <Lottie animationData={spinnerAnimation} loop autoplay />
        </Box>
      </Box>
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
    <Container component="main" maxWidth="lg" disableGutters>
      <Box sx={{ my: { xs: 2, sm: 2, md: 3, lg: 4, xl: 4 } }}>
        <Typography
          component="h1"
          align="center"
          sx={{
            fontWeight: 800,
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
              lg: '2.5rem',
            },
            mb: 5,
            background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Saglabātie sludinājumi
        </Typography>
        {favoritedPets.length === 0 ? (
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Paper
              sx={{
                p: { xs: 1, sm: 2 },
                borderRadius: 3,
                background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',

                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                },
              }}
            >
              <Box display="flex" alignItems="center">
                <IconButton color="primary" style={{ backgroundColor: '#f7f9fd', cursor: 'default' }}>
                  <BookmarkIcon />
                </IconButton>
                <Typography variant="body1" color="textSecondary" sx={{ ml: { xs: 1, sm: 2 } }}>
                  Jums vēl nav saglabātu sludinājumu
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {favoritedPets.map((pet) => (
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={pet.id}>
                <Card
                  sx={{
                    p: { xs: 1, sm: 2 },
                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                    textAlign: 'left',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                    },
                  }}
                >
                  {' '}
                  {/* <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    sx={{
                      gap: 0.5,
                    }}
                  >
                    <Chip
                      label={pet.status_display}
                      size="small"
                      color="info"
                      sx={{ fontWeight: 400, fontSize: '0.8rem' }}
                    />
                    <DoubleArrowIcon fontSize="small" sx={{ color: 'text.disabled' }} />

                    <Chip
                      label={pet.final_status_display}
                      size="small"
                      color={pet.final_status === 1 ? 'default' : 'primary'}
                      sx={{ fontWeight: 400, fontSize: '0.8rem' }}
                    />
                  </Box> */}
                  <Box display="flex" alignItems="center">
                    <MuiLink href={`/pets/${pet.id}`} underline="none">
                      <Avatar
                        src={pet.pet_image_1}
                        alt={pet.species_display}
                        sx={{ width: 64, height: 64, mr: { xs: 1, sm: 2 }, cursor: 'pointer' }}
                      />
                    </MuiLink>
                    <Box flexGrow={1}>
                      <Typography variant="h6">
                        <Chip label={pet.species_display} size="small" color="primary" />
                      </Typography>
                      {/* <Typography variant="body2" color="textSecondary" fontSize="0.8rem">
                        {pet.status_display}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" fontSize="0.8rem">
                        {pet.final_status_display}
                      </Typography> */}
                      <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1.5}>
                        {/* Status text - primary color */}
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.6rem',
                            color: 'primary.main',
                            textTransform: 'uppercase',
                          }}
                        >
                          {pet.status_display}
                        </Typography>

                        {/* Arrow icon */}
                        <DoubleArrowIcon
                          sx={{
                            color: '#00b5ad',
                            fontSize: 16,
                            opacity: 0.7,
                          }}
                        />

                        {/* Final status text - conditional color */}
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.6rem',
                            color: pet.final_status === 1 ? 'slategray' : 'primary.main',
                            textTransform: 'uppercase',
                          }}
                        >
                          {pet.final_status_display}
                        </Typography>
                      </Box>
                    </Box>

                    {pet.is_closed ? (
                      <Tooltip title="Sludinājums aizvērts">
                        <IconButton edge="end" size="small" aria-label="delete" sx={{ mr: 1 }}>
                          <LockOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Sludinājums atvērts">
                        <IconButton edge="end" size="small" aria-label="delete" sx={{ mr: 1 }}>
                          <LockOpenIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    <Tooltip title="Izdzēst">
                      <IconButton
                        edge="end"
                        color="error"
                        size="small"
                        aria-label="delete"
                        onClick={() => handleDeletePet(pet.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Box mt={4} display="flex" justifyContent="space-between" alignItems="center" textAlign="center">
              <Link
                to="/user-profile"
                style={{
                  color: '#00b5ad',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                <ArrowBackIcon fontSize="small" />
                Atpakaļ
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default UserPetBookmarks;
