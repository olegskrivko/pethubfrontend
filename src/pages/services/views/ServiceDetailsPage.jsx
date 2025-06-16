import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Alert,
  IconButton,
  Chip,
  Divider,
  CardMedia,
  Stack,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LocationOn, AccessTime, Phone, Email, Euro } from '@mui/icons-material';
import { Facebook, Instagram, Language, YouTube, Twitter, LinkedIn } from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MapIcon from '@mui/icons-material/Map';
import { Rating } from '@mui/material';

import { Link as MuiLink } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LeafletServiceDetailsMap from '../../../shared/maps/LeafletServiceDetailsMap';
// import HolidayCard from '../../HolidayCard';
import PublicIcon from '@mui/icons-material/Public';
import { useSnackbar } from 'notistack';
// import spinnerGif from '../../images/features/paws.gif';
import RatingForm from '../components/RatingForm';
import ServiceRatingDisplay from '../components/ServiceRatingDisplay';
import Lottie from 'lottie-react';
import spinnerAnimation from '../../../assets/Animation-1749725645616.json';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ServiceDetail = () => {
  const { id } = useParams();
  const [userRating, setUserRating] = useState(0);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  const [distances, setDistances] = useState([]);
  const [centerCoords, setCenterCoords] = useState([56.946285, 24.105078]);
  const { enqueueSnackbar } = useSnackbar();

  // Handle map location pan to the given latitude and longitude
  const handlePanToLocation = (lat, lng) => {
    console.log('lat, lng', lat, lng);
    setCenterCoords([lat, lng]);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserCoords({ latitude, longitude });

      if (service?.locations?.length) {
        const calculatedDistances = service.locations.map((loc) =>
          calculateDistance(latitude, longitude, loc.latitude, loc.longitude)
        );
        setDistances(calculatedDistances);
      }
    });
  }, [service]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // km
  };

  // Fetch service details with or without authentication
  useEffect(() => {
    const fetchService = async () => {
      const accessToken = localStorage.getItem('access_token');
      try {
        const response = await axios.get(`${API_BASE_URL}/api/services/${id}`);
        setService(response.data);

        if (accessToken) {
          // If the user is authenticated, fetch favorite status
          fetchFavoriteStatus(accessToken);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service details:', error);
        setError('Failed to load service details. Please try again later.');
        setLoading(false);
      }
    };

    // Fetch favorite status
    const fetchFavoriteStatus = async (accessToken) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/accounts/favorite-services/${id}/`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.is_favorite);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    fetchService();
  }, [id]);

  // Handle favorite toggle
  const handleFavorite = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert('You must be logged in to manage favorites.');
      return;
    }

    const url = `${API_BASE_URL}/api/accounts/favorite-services/${id}/`;
    try {
      const response = await fetch(url, {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
        enqueueSnackbar(isFavorite ? 'Service removed from favorites' : 'Service added to favorites', {
          variant: 'success',
        });
      } else {
        const errorData = await response.json();
        enqueueSnackbar(errorData.detail || 'Something went wrong', {
          variant: 'error',
        });
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      enqueueSnackbar('Error updating favorite status. Please try again later.', { variant: 'error' });
    }
  };

  // Allow unauthenticated users to view the service details but block certain actions
  if (loading && !service) {
    return (
      // <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      //   {/* <CircularProgress /> */}
      //   {/* <img src={spinnerGif} alt="Loading..." /> */}
      // </Box>
      <Box
        sx={{
          minHeight: '100vh',
          // background: 'linear-gradient(135deg, #6a1b9a, #9c27b0)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          overflow: 'hidden',
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
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="lg">
      {/* Service Image */}
      <Box mb={5}>
        <Card elevation={4} sx={{ borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
          <CardMedia
            component="img"
            // image={service.service_image}
            image={service.service_image_1}
            alt={service.title}
            sx={{ maxHeight: 500, objectFit: 'cover' }}
          />

          {/* Favorite Button Positioned Absolutely */}
          {localStorage.getItem('access_token') && (
            <IconButton
              onClick={handleFavorite}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: '#FFFFFF',
                zIndex: 2,
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
              aria-label="toggle favorite"
            >
              {isFavorite ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
            </IconButton>
          )}

          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {service.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {service.description || 'No description provided.'}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Stack direction="row" spacing={2} alignItems="center">
              <Euro color="action" />
              <Typography variant="body2">
                {service.price_type === 4
                  ? 'Cena pēc vienošanās'
                  : `Cena sākot no ${service.price} EUR / ${service.price_type_display.toLowerCase()}`}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Locations */}
      <Typography variant="h5" fontWeight={600} my={3}>
        Vietas
      </Typography>
      <LeafletServiceDetailsMap shelters={service.locations} centerCoords={centerCoords} />

      {service.locations?.length > 0 ? (
        service.locations.map((location, index) => (
          <Card
            key={index}
            elevation={3}
            sx={{
              borderRadius: 4,
              mb: 4,
              p: { xs: 2, md: 3 },
              backgroundColor: '#fafafa',
            }}
          >
            <Box display="flex" alignItems="center" gap={2} justifyContent="space-between">
              <Box display="flex" flexDirection="column" alignItems="flex-start" gap={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton
                    style={{ backgroundColor: '#555', color: '#fff' }}
                    onClick={() => handlePanToLocation(location.latitude, location.longitude)}
                  >
                    <LocationOn />
                  </IconButton>

                  <Typography variant="body1">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${location.street}, ${location.city}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#90caf9',
                        textDecoration: 'underline',
                        marginLeft: '0.3rem',
                      }}
                    >
                      {location.city}, {location.street}
                    </a>
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <ArrowOutwardIcon />
                {distances.length > index && (
                  <Typography variant="body2" color="text.secondary">
                    {distances[index]} km
                  </Typography>
                )}
              </Box>
            </Box>
          </Card>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No locations available for this service.
        </Typography>
      )}

      {/* Contact & Social Info */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Kontakti un socilālie tīkli
        </Typography>

        <Card elevation={3} sx={{ borderRadius: 3, p: { xs: 2, md: 3 } }}>
          <Stack spacing={2}>
            {/* Display contact info and social media */}
            {/* Similar logic for phone, email, website, and social media */}

            {/* Phone */}
            {service.phone_number && service.phone_code && (
              <Box display="flex" alignItems="center" gap={2}>
                <IconButton
                  style={{
                    backgroundColor: '#555',
                    color: '#4FCE5D',
                    pointerEvents: 'none',
                  }}
                >
                  <WhatsAppIcon />
                </IconButton>{' '}
                <MuiLink href={`tel:${service.phone_code}${service.phone_number}`} underline="hover" color="inherit">
                  {service.phone_code} {service.phone_number}
                </MuiLink>
              </Box>
            )}
            {/* Email */}
            {service.email && (
              <Box display="flex" alignItems="center" gap={2}>
                <IconButton
                  style={{
                    backgroundColor: '#555',
                    color: '#FFDE21',
                    pointerEvents: 'none',
                  }}
                >
                  <Email />
                </IconButton>{' '}
                <MuiLink href={`mailto:${service.email}`} underline="hover" color="inherit">
                  {service.email}
                </MuiLink>
              </Box>
            )}

            {/* Website */}

            {service.website && (
              <Box display="flex" alignItems="center" gap={2}>
                <IconButton
                  style={{
                    backgroundColor: '#555',
                    color: '#90D5FF',
                    pointerEvents: 'none',
                  }}
                >
                  <Language />
                </IconButton>{' '}
                <MuiLink href={service.website} target="_blank" rel="noopener" underline="hover" color="inherit">
                  {service.website.replace(/^https?:\/\//, '')}
                </MuiLink>
              </Box>
            )}

            {/* Socials */}
            {Array.isArray(service.social_media) && service.social_media.length > 0 && (
              <>
                {service.social_media.map((social, idx) => {
                  const iconMap = {
                    Facebook: <Facebook color="primary" />,
                    Instagram: <Instagram sx={{ color: '#E4405F' }} />,
                    Twitter: <Twitter sx={{ color: '#1DA1F2' }} />,
                    LinkedIn: <LinkedIn sx={{ color: '#0077B5' }} />,
                    YouTube: <YouTube sx={{ color: '#FF0000' }} />,
                  };

                  const icon = iconMap[social.platform] || null;

                  return (
                    <Typography key={idx} variant="body1" sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
                      <IconButton
                        style={{
                          backgroundColor: '#555',
                          color: '#90D5FF',
                          pointerEvents: 'none',
                        }}
                      >
                        {icon}
                      </IconButton>

                      <MuiLink
                        href={social.profile_url}
                        target="_blank"
                        rel="noopener"
                        underline="hover"
                        color="inherit"
                      >
                        {social.profile_url.replace(/^https?:\/\//, '')}
                      </MuiLink>
                    </Typography>
                  );
                })}
              </>
            )}
          </Stack>
        </Card>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Alert severity="warning">
          Uzmanību! Pirms jebkādu maksājumu veikšanas pārliecinieties par pakalpojuma sniedzēja uzticamību...
        </Alert>
      </Box>

      {/* Reviews */}
      <Divider sx={{ my: 3 }} />
      <RatingForm serviceId={id} />
      <ServiceRatingDisplay
        serviceId={service.id}
        rating={service.rating}
        reviewCount={service.review_count}
        reviews={service.reviews}
      />
    </Container>
  );
};

export default ServiceDetail;
