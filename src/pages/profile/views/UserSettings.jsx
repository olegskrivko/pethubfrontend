import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  Card,
  IconButton,
  Slider,
  Tooltip,
  CardContent,
  Container,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import axios from 'axios';

import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import SendIcon from '@mui/icons-material/Send';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import CancelIcon from '@mui/icons-material/Cancel';
import LeafletAddNotificationMap from "../../../shared/maps/LeafletAddNotificationMap";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 


const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

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
  uint8Array.forEach(byte => {
    binary += String.fromCharCode(byte);
  });
  return window.btoa(binary);
};
function UserSettings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [location, setLocation] = useState({ lat: 56.946285, lng: 24.105078 });
  const [distance, setDistance] = useState(5); // Default 5 km

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
    }
  }, [user]);

  console.log("User:", user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    logout();
    navigate("/logout");
  };

  const handleDeleteAccount = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
  
      if (!accessToken) {
        console.error("No access token found");
        return;
      }
  
      await axios.delete(`${API_BASE_URL}/api/auth/user/delete/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      // Logout the user after account deletion
      logout();
      navigate("/account-deleted"); // Redirect to signup or homepage
    } catch (err) {
      console.error("Error deleting account:", err);
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
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(`${API_BASE_URL}/api/notifications/user-location/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user location");
      }

      const data = await response.json();
      console.log("Fetched location data:", data);

      // Make sure lat/lng exist before setting
      if (data.lat && data.lon) {
        setLocation({ lat: data.lat, lng: data.lon });
        if (data.distance) setDistance(data.distance);
      }
    } catch (error) {
      console.error("Error fetching user location:", error);
    }
  };

  const askForNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        await subscribeUserToPush();
      }
    } catch (error) {
      console.error("Permission request failed", error);
    }
  };

  const subscribeUserToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js");

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BOZTcqsdJXUbELTV3ax5lK3X3Wh4S33MuJAZ75MVWCxjtrcn7nVr2Xp-JPiPlVJCE9gqmLv23_PR_f-7uKgU8iU"),
      });

      setSubscription(subscription);
      setIsSubscribed(true);
      await saveSubscriptionToBackend(subscription);
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  const saveSubscriptionToBackend = async (subscription) => {
    try {
      const accessToken = localStorage.getItem("access_token");

const subscriptionData = {
  endpoint: subscription.endpoint,
  p256dh: arrayBufferToBase64(subscription.getKey("p256dh")),
  auth: arrayBufferToBase64(subscription.getKey("auth")),
  lat: location.lat,
  lon: location.lng,
  distance,
};

      const response = await fetch(`${API_BASE_URL}/api/notifications/subscribe/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(subscriptionData),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Subscription error:", error);
      }
    } catch (error) {
      console.error("Error saving subscription:", error);
    }
  };

  const checkExistingSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();

      if (!existingSubscription) return setIsSubscribed(false);

      setSubscription(existingSubscription);

      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(
        `${API_BASE_URL}/api/notifications/is_subscribed/?endpoint=${encodeURIComponent(existingSubscription.endpoint)}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const result = await response.json();
      setIsSubscribed(result.subscribed);

      if (!result.subscribed) {
        await saveSubscriptionToBackend(existingSubscription);
      }
    } catch (error) {
      console.error("Subscription check failed:", error);
    }
  };

  const unsubscribeUser = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      const subscription = await registration.pushManager.getSubscription();
      const accessToken = localStorage.getItem("access_token");

      if (subscription) {
        await subscription.unsubscribe();
        await fetch(`${API_BASE_URL}/api/notifications/unsubscribe/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });

        setIsSubscribed(false);
        setSubscription(null);
      }
    } catch (error) {
      console.error("Unsubscribe failed:", error);
    }
  };

  const sendTestNotification = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      await fetch(`${API_BASE_URL}/api/notifications/send_notification/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: "Test Notification",
          body: "This is a test notification.",
          url: "https://example.com",
        }),
      });
    } catch (error) {
      console.error("Send notification failed:", error);
    }
  };

  const fetchSubscriptionStatus = async () => {
    try {
      setLoadingSubscription(true);
      setSubscriptionError(null);
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(`${API_BASE_URL}/api/payment/subscription/status/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      setSubscriptionStatus(data);
    } catch (error) {
      setSubscriptionError("Failed to fetch subscription status");
      console.error("Error fetching subscription status:", error);
    } finally {
      setLoadingSubscription(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setLoadingSubscription(true);
      setSubscriptionError(null);
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(`${API_BASE_URL}/api/payment/subscription/cancel/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      setSubscriptionStatus(prev => ({
        ...prev,
        cancel_at_period_end: true,
        cancel_at: data.cancel_at
      }));
      setCancelDialogOpen(false);
    } catch (error) {
      setSubscriptionError("Failed to cancel subscription");
      console.error("Error canceling subscription:", error);
    } finally {
      setLoadingSubscription(false);
    }
  };

  // const handleReactivateSubscription = async () => {
  //   try {
  //     setLoadingSubscription(true);
  //     setSubscriptionError(null);
  //     const accessToken = localStorage.getItem("access_token");
  //     const response = await fetch(`${API_BASE_URL}/api/payment/subscription/reactivate/`, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${accessToken}`
  //       }
  //     });
  //     const data = await response.json();
  //     setSubscriptionStatus(prev => ({
  //       ...prev,
  //       cancel_at_period_end: false,
  //       cancel_at: null
  //     }));
  //   } catch (error) {
  //     setSubscriptionError("Failed to reactivate subscription");
  //     console.error("Error reactivating subscription:", error);
  //   } finally {
  //     setLoadingSubscription(false);
  //   }
  // };
 
  useEffect(() => {
   checkExistingSubscription();
  fetchSubscriptionStatus();
  }, []);
  if (!user) {
    return <Typography>Loading user data...</Typography>;
  }

  return (
    <>
  <Container component="main" maxWidth="lg" >
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" align="center" sx={{ mb: 5, fontWeight: 800,
                 
                        
                                
                                background: "linear-gradient(60deg, #16477c 0%, #00b5ad 100%)",
                                WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                     }}>Lietotāja iestatījumi</Typography>
          <Box sx={{ textAlign: "start" }}>
            <TextField
              fullWidth
              margin="normal"
              label="Lietotājvārds"
              name="username"
              value={formData.username}
              onChange={handleChange}
              InputProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="E-pasts"
              name="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{ readOnly: true }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
      <Box sx={{ py: 4 }}>
      {/* <Typography variant="h6" gutterBottom>
        Push Notifications
      </Typography> */}






  
      <Card  sx={{
            // px: 2,
            p: 3,
            borderRadius: 3,
            background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            // boxShadow: '0px 3px 10px rgba(0,0,0,0.06)',
            // cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            // '&:hover': {
            //   // boxShadow: '0px 6px 20px rgba(0,0,0,0.1)',
            //   // transform: 'scale(1.01)',
            //   background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
            // },
            // '&:focus': {
            //   outline: '2px solid #00b5ad',
            // },
          }}>
             <Box display="flex" alignItems="center" mb={2}>
                  <NotificationsActiveIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Push Notification Management</Typography>
                </Box>
            <LeafletAddNotificationMap onLocationChange={handleLocationChange} location={location} />
                  <Box sx={{ my: 3 }}>
<TextField
  label="Latitude"
  type="number"
  value={location.lat}
  onChange={(e) =>
    setLocation({ ...location, lat: parseFloat(e.target.value) })
  }
  fullWidth
  sx={{ mb: 2 }}
/>
<TextField
  label="Longitude"
  type="number"
  value={location.lng}
  onChange={(e) =>
    setLocation({ ...location, lng: parseFloat(e.target.value) })
  }
  fullWidth
  sx={{ mb: 2 }}
/>

        <Typography gutterBottom>Distance (km)</Typography>
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
          color="error"
          onClick={unsubscribeUser}
           startIcon={<CancelIcon />}
        >
          Unsubscribe
        </Button>
        <Button
          variant="outlined"
          startIcon={<SendIcon />}
          onClick={sendTestNotification}
        >
          Send Test Notification
        </Button>
      </>
    ) : (
      <Button
        variant="contained"
        onClick={askForNotificationPermission}
      >
        Subscribe
      </Button>
    )}
  </Box>
</Card>
    </Box>
        </Grid>
      
{/* 
      <Container container spacing={2} sx={{ mt: 4 }}> */}
        <Grid container spacing={2}>
          {/* Add Subscription Management Card */}
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Card sx={{
            // px: 2,
            p: 3,
            borderRadius: 3,
            background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            // boxShadow: '0px 3px 10px rgba(0,0,0,0.06)',
            // cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            // '&:hover': {
            //   // boxShadow: '0px 6px 20px rgba(0,0,0,0.1)',
            //   // transform: 'scale(1.01)',
            //   background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
            // },
            // '&:focus': {
            //   outline: '2px solid #00b5ad',
            // },
          }}>
              {/* <CardContent> */}
                <Box display="flex" alignItems="center" mb={2}>
                  <CardMembershipIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Subscription Management</Typography>
                </Box>
                
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
                      <Box sx={{display:'flex', flexDirection: "column"}}>
                        <Alert severity="success" sx={{ mb: 2 }}>
                          Active Subscription: {subscriptionStatus.subscription_type}
                        </Alert>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Started: {new Date(subscriptionStatus.subscription_start).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Current Period Ends: {new Date(subscriptionStatus.subscription_end).toLocaleDateString()}
                        </Typography>
                        
                        {subscriptionStatus.cancel_at_period_end ? (
                          <Box mt={2}>
                            <Alert severity="warning" sx={{ mb: 2 }}>
                              Subscription will end on {new Date(subscriptionStatus.cancel_at).toLocaleDateString()}
                            </Alert>
                            {/* <Button
                              variant="contained"
                              color="primary"
                              onClick={handleReactivateSubscription}
                              startIcon={<CardMembershipIcon />}
                            >
                              Reactivate Subscription
                            </Button> */}
                          </Box>
                        ) : (
                          <Box>
                          {/* <Button
                            variant="contained"
                            color="error"
                            onClick={() => setCancelDialogOpen(true)}
                            startIcon={<CancelIcon />}
                            sx={{ mt: 2 }}
                          >
                            Cancel Subscription
                          </Button> */}
                          <Button
  variant="contained"
  color="error"
  onClick={() => setCancelDialogOpen(true)}
  startIcon={<CancelIcon />}
  sx={{ mt: 2 }}
  
  disabled={subscriptionStatus.cancel_at_period_end}  // Disable if cancel is scheduled
>
  Cancel Subscription
</Button>

                          </Box>
                        )}
                      </Box>
                    ) : (
                      <Alert severity="info">
                        No active subscription
                      </Alert>
                    )}
                  </Box>
                ) : null}
              {/* </CardContent> */}
            </Card>
          </Grid>
        </Grid>
      {/* </Container> */}

      <Grid container spacing={2} sx={{ mt: 4 }}>
        {/* Logout Card */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Card sx={{
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
          }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "0.5rem !important",
                paddingTop: "0.5rem !important",
              }}
            >
              <Typography variant="body1">Izrakstīties</Typography>
              <Tooltip title="Izrakstīties">
                <IconButton
                  edge="end"
                  color="primary"
                  aria-label="logout"
                  onClick={handleLogout}
                  sx={{ cursor: "pointer" }}
                >
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </CardContent>
          </Card>
        </Grid>

        {/* Delete Account Card */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Card sx={{
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
          }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "0.5rem !important",
                paddingTop: "0.5rem !important",
              }}
            >
              <Typography variant="body1" color="error" fontWeight="bold">
                Dzēst profilu
              </Typography>
              <Tooltip title="Izdzēst">
                <IconButton
                  edge="end"
                  color="error"
                  aria-label="delete"
                  onClick={() => setOpenDialog(true)}
                  sx={{ cursor: "pointer" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Vai tiešām vēlaties dzēst savu profilu?</DialogTitle>
        <DialogContent>
          <Typography>Šī darbība neatgriezeniski dzēsīs jūsu kontu un visus datus.</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDeleteAccount} color="error">Dzēst</Button>
          <Button onClick={() => setOpenDialog(false)} color="primary">Atcelt</Button>
        </DialogActions>
      </Dialog>

      {/* Back Button */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
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
      </Grid>
      </Container>

      {/* Add Cancel Subscription Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
      >
        <DialogTitle>Cancel Subscription</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel your subscription? You'll continue to have access until the end of your current billing period.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>Keep Subscription</Button>
          <Button onClick={handleCancelSubscription} color="error">
            Cancel Subscription
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserSettings;
