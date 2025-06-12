import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Chip,
  CardContent,
  Avatar,
  Grid,
  Box,
  Button,
  Tooltip,
  Link as MuiLink,
  Container,
  IconButton,
} from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';  // ✅ Import missing icon
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkIcon from '@mui/icons-material/Work';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
function UserServices() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownedServices, setOwnedServices] = useState([]);

  console.log("user", user);
  console.log("ownedServices", ownedServices);

  useEffect(() => {
    const fetchUserServices = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setError('You must be logged in to view services.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/accounts/user-services/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setOwnedServices(response.data);
      } catch (error) {
        console.error('Error fetching services data:', error);
        setError('Failed to fetch services data');
      } finally {
        setLoading(false);  // ✅ Ensure loading stops after fetch
      }
    };

    fetchUserServices();
  }, []);

  const handleDeleteService = async (serviceId) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert('You must be logged in to delete services.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/accounts/user-services/${serviceId}/delete/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Service deleted successfully');
        setOwnedServices((prevServices) => prevServices.filter((service) => service.id !== serviceId));  // ✅ Remove pet from UI
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error deleting service');
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
          Ielādē pakalpojumus...
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
 <Container component="main" maxWidth="lg" >

  <Typography variant="h4" align="center" sx={{ mb: 5, fontWeight: 800,
       
              
                      
                      background: "linear-gradient(60deg, #16477c 0%, #00b5ad 100%)",
                      WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
           }}>Mani pakalpojumi</Typography>
      {ownedServices.length === 0 ? (
        // ✅ Display message when user has no pets
  

        <Card sx={{
            p: 2,
            borderRadius: 3,
            background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
            },
          }}>
        <CardContent  sx={{paddingBottom: "1rem !important"}}>

        <Box display="flex" alignItems="center">
        <WorkIcon color="primary" sx={{ fontSize: 28, marginRight: "1rem"  }} />
          <Typography variant="body2" color="textSecondary">
            Jums vēl nav pievienotu pakalpojumu.
          </Typography>
        
          </Box>
        </CardContent>
      </Card>
      ) : (
        <Grid container spacing={2}>
          {ownedServices.map((service) => (
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={service.id}>
              <Card sx={{
            p: 2,
            borderRadius: 3,
            background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            // cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
            },
          }}>
                {/* <CardContent> */}
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
                            style={{ backgroundColor: '#5B9BD5', color: '#fff' }}
                          />
                        </MuiLink>
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {service.title || 'Nav statusa'}
                      </Typography>
                    </Box>

                    <Tooltip title="Rediģēt">
                      <IconButton
                        edge="end"
                        color="primary"
                        style={{ marginLeft: '0.5rem' }}
                        aria-label="edit"
                        onClick={() => handleEditService(service.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Izdzēst">
                      <IconButton
                        edge="end"
                        color="error"
                        style={{ marginLeft: '0.5rem' }}
                        aria-label="delete"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                {/* </CardContent> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Box textAlign="center" style={{ display: "flex", justifyContent: "space-between" }} mt={4}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIcon />}
              component={Link}
              to={`/user-profile`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Atpakaļ
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserServices;
