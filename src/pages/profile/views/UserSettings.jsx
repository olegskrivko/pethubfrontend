import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from '@mui/icons-material/Cancel';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import SendIcon from '@mui/icons-material/Send';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Slider,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import Lottie from 'lottie-react';

import spinnerAnimation from '../../../assets/Animation-1749725645616.json';
import { useAuth } from '../../../contexts/AuthContext';
import LeafletAddNotificationMap from '../../../shared/maps/LeafletAddNotificationMap';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const arrayBufferToBase64 = (buffer) => {
  const uint8Array = new Uint8Array(buffer);
  let binary = '';
  uint8Array.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return window.btoa(binary);
};
function UserSettings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });
  const [location, setLocation] = useState({ lat: 56.946285, lng: 24.105078 });
  const [distance, setDistance] = useState(5); // Default 5 km
  const [quota, setQuota] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loadingSubscription, setLoadingSubscription] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
      setLoading(false); // stop loading once user data is set
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const fetchUserPetQuota = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/api/pets/pet-quota/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pet quota');
      }

      const data = await response.json();
      console.log('Pet Quota:', data);
      setQuota(data); // ✅ set the state here
    } catch (error) {
      console.error('Error fetching pet quota:', error);
      setQuota(null); // optional: set to null or default if there's an error
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/logout');
  };

  const handleDeleteAccount = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        console.error('No access token found');
        return;
      }

      await axios.delete(`${API_BASE_URL}/api/auth/user/delete/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      // Call logout
      logout();

      // Delay navigation so logout completes before rerender
      setTimeout(() => {
        navigate('/account-deleted');
      }, 100); // 100ms is usually enough
    } catch (err) {
      console.error('Error deleting account:', err);
    }
  };

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  // const [lat, setLat] = useState(56.946);     // Default to Riga
  // const [lon, setLon] = useState(24.1059);    // Default to Riga

  // Add useEffect to fetch user location on component mount
  useEffect(() => {
    fetchUserLocation();
  }, []);

  const handleLocationChange = (coords) => {
    setLocation({
      lat: coords.lat,
      lng: coords.lng,
    });
    // If user is subscribed, update the subscription with new location
    if (isSubscribed && subscription) {
      saveSubscriptionToBackend(subscription);
    }
  };

  const fetchUserLocation = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/api/notifications/user-location/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user location');
      }

      const data = await response.json();
      console.log('Fetched location data:', data);

      // Make sure lat/lng exist before setting
      if (data.lat && data.lon) {
        setLocation({ lat: data.lat, lng: data.lon });
        if (data.distance) setDistance(data.distance);
      }
    } catch (error) {
      console.error('Error fetching user location:', error);
    }
  };

  const askForNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await subscribeUserToPush();
      }
    } catch (error) {
      console.error('Permission request failed', error);
    }
  };

  const subscribeUserToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BOZTcqsdJXUbELTV3ax5lK3X3Wh4S33MuJAZ75MVWCxjtrcn7nVr2Xp-JPiPlVJCE9gqmLv23_PR_f-7uKgU8iU',
        ),
      });

      setSubscription(subscription);
      setIsSubscribed(true);
      await saveSubscriptionToBackend(subscription);
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  const saveSubscriptionToBackend = async (subscription) => {
    try {
      const accessToken = localStorage.getItem('access_token');

      const subscriptionData = {
        endpoint: subscription.endpoint,
        p256dh: arrayBufferToBase64(subscription.getKey('p256dh')),
        auth: arrayBufferToBase64(subscription.getKey('auth')),
        lat: location.lat,
        lon: location.lng,
        distance,
      };

      const response = await fetch(`${API_BASE_URL}/api/notifications/subscribe/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(subscriptionData),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Subscription error:', error);
      }
    } catch (error) {
      console.error('Error saving subscription:', error);
    }
  };

  const checkExistingSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();

      if (!existingSubscription) return setIsSubscribed(false);

      setSubscription(existingSubscription);

      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(
        `${API_BASE_URL}/api/notifications/is_subscribed/?endpoint=${encodeURIComponent(existingSubscription.endpoint)}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      const result = await response.json();
      setIsSubscribed(result.subscribed);

      if (!result.subscribed) {
        await saveSubscriptionToBackend(existingSubscription);
      }
    } catch (error) {
      console.error('Subscription check failed:', error);
    }
  };

  const unsubscribeUser = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      const subscription = await registration.pushManager.getSubscription();
      const accessToken = localStorage.getItem('access_token');

      if (subscription) {
        await subscription.unsubscribe();
        await fetch(`${API_BASE_URL}/api/notifications/unsubscribe/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });

        setIsSubscribed(false);
        setSubscription(null);
      }
    } catch (error) {
      console.error('Unsubscribe failed:', error);
    }
  };

  // const sendTestNotification = async () => {
  //   try {
  //     const accessToken = localStorage.getItem('access_token');
  //     await fetch(`${API_BASE_URL}/api/notifications/send_notification/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify({
  //         title: 'Test Notification',
  //         body: 'This is a test notification.',
  //         url: 'https://example.com',
  //       }),
  //     });
  //   } catch (error) {
  //     console.error('Send notification failed:', error);
  //   }
  // };

  useEffect(() => {
    checkExistingSubscription();

    fetchUserPetQuota(); // ✅ Add this line
  }, []);

  if (loading) {
    return (
      <Container>
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
      </Container>
    );
  }
  if (!user) {
    return <Typography>User data not found</Typography>;
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
          Lietotāja iestatījumi
        </Typography>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ mb: 3 }}>
          <Card
            sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: 3,
              background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            }}
          >
            <TextField
              fullWidth
              margin="normal"
              label="Lietotājvārds"
              name="username"
              disabled
              value={formData.username}
              onChange={handleChange}
              InputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="E-pasts"
              name="email"
              disabled
              value={formData.email}
              onChange={handleChange}
              InputProps={{ readOnly: true }}
            />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ mb: 3 }}>
          <Card
            sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: 3,
              background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              {/* <NotificationsActiveIcon sx={{ mr: 1 }} /> */}
              <Typography variant="h6">Push paziņojumu pārvaldība</Typography>
            </Box>
            <LeafletAddNotificationMap onLocationChange={handleLocationChange} location={location} />
            <Box sx={{ my: 3 }}>
              <Box sx={{ display: 'none' }}>
                <TextField
                  label="Latitude"
                  type="number"
                  value={location.lat}
                  onChange={(e) =>
                    setLocation({
                      ...location,
                      lat: parseFloat(e.target.value),
                    })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Longitude"
                  type="number"
                  value={location.lng}
                  onChange={(e) =>
                    setLocation({
                      ...location,
                      lng: parseFloat(e.target.value),
                    })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Box>
              <Typography gutterBottom>Attālums {distance ? distance : 0} km</Typography>
              <Slider
                value={distance}
                onChange={(e, newValue) => setDistance(newValue)}
                min={1}
                max={50}
                step={1}
                valueLabelDisplay="auto"
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {isSubscribed ? (
                <>
                  <Box display="flex" alignItems="center" mb={2}>
                    <NotificationsActiveIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6"> You are subscribed to push notifications.</Typography>
                  </Box>
                </>
              ) : (
                <>
                  <NotificationsOffIcon color="warning" sx={{ mr: 1 }} />
                  <Typography variant="h6" color="text.secondary">
                    You are not subscribed yet.
                  </Typography>
                </>
              )}
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {isSubscribed ? (
                <>
                  <Button
                    variant="contained"
                    fullWidth
                    color="error"
                    onClick={unsubscribeUser}
                    startIcon={<CancelIcon />}
                  >
                    Unsubscribe
                  </Button>
                  {/* <Button variant="outlined" fullWidth startIcon={<SendIcon />} onClick={sendTestNotification}>
                    Send Test Notification
                  </Button> */}
                </>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<NotificationsActiveIcon />}
                  fullWidth
                  onClick={askForNotificationPermission}
                >
                  Subscribe
                </Button>
              )}
            </Box>
          </Card>
        </Grid>

        {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Accordion elevation={1}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" alignItems="center">
                  <CardMembershipIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Subscription Management</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {loadingSubscription ? (
                  <Box display="flex" justifyContent="center" p={2}>
                    <CircularProgress />
                  </Box>
                ) : subscriptionError ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {subscriptionError}
                  </Alert>
                ) : subscriptionStatus ? (
                  <Box>
                    {subscriptionStatus.is_subscribed ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Alert severity="success" sx={{ mb: 2 }}>
                          Active Subscription: {subscriptionStatus.subscription_type}
                        </Alert>
                        <Typography variant="body2" color="text.secondary">
                          Started: {new Date(subscriptionStatus.subscription_start).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Ends: {new Date(subscriptionStatus.subscription_end).toLocaleDateString()}
                        </Typography>

                        {subscriptionStatus.cancel_at_period_end ? (
                          <Alert severity="warning" sx={{ mt: 2 }}>
                            Subscription will end on {new Date(subscriptionStatus.cancel_at).toLocaleDateString()}
                          </Alert>
                        ) : (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => setCancelDialogOpen(true)}
                            startIcon={<CancelIcon />}
                            sx={{ mt: 2 }}
                            disabled={subscriptionStatus.cancel_at_period_end}
                          >
                            Cancel Subscription
                          </Button>
                        )}
                      </Box>
                    ) : (
                      <Alert severity="info">No active subscription</Alert>
                    )}
                  </Box>
                ) : null}
              </AccordionDetails>
            </Accordion>
          </Grid> */}

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Paper
              sx={{
                p: { xs: 1, sm: 2 },
                borderRadius: 3,
                background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
              }}
            >
              <Box display="flex" alignItems="center" sx={{ mb: { xs: 1, sm: 2 } }}>
                <Tooltip title="Izrakstīties">
                  <IconButton
                    color="primary"
                    sx={{ backgroundColor: '#f7f9fd' }}
                    size="small"
                    aria-label="logout"
                    onClick={handleLogout}
                  >
                    <ExitToAppIcon />
                  </IconButton>
                </Tooltip>

                <Typography variant="body1" sx={{ ml: { xs: 1, sm: 2 } }}>
                  Izrakstīties
                </Typography>
              </Box>
              {/* <Box display="flex" alignItems="center" sx={{ mb: { xs: 1, sm: 2 } }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ExitToAppIcon />}
                  onClick={handleLogout}
                  sx={{
                    justifyContent: 'flex-start',
                    pl: 2,
                    background: 'transparent',
                    color: 'black',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Izrakstīties
                </Button>
              </Box> */}

              <Box display="flex" alignItems="center">
                <Tooltip title="Izdzēst">
                  <IconButton
                    color="primary"
                    sx={{ backgroundColor: '#f7f9fd' }}
                    size="small"
                    aria-label="delete"
                    onClick={() => setOpenDialog(true)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Box flexGrow={1}>
                  <Typography variant="body1" sx={{ ml: { xs: 1, sm: 2 } }}>
                    Dzēst lietotāju
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Vai tiešām vēlaties dzēst savu profilu?</DialogTitle>
          <DialogContent>
            <Typography>Šī darbība neatgriezeniski dzēsīs jūsu kontu un visus datus.</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleDeleteAccount} color="error">
              Dzēst
            </Button>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Atcelt
            </Button>
          </DialogActions>
        </Dialog>

        {/* Back Button */}
        {/* <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Box textAlign="left">
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ArrowBackIcon />}
                component={Link}
                to={`/user-profile`}
              >
                Atpakaļ
              </Button>
            </Box>
          </Grid>
        </Grid> */}
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
        {/* </Container> */}

        {/* Add Cancel Subscription Dialog */}
      </Box>
    </Container>
  );
}

export default UserSettings;
