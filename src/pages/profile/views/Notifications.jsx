import React, { useEffect, useState } from 'react';

import { Box, Button, Slider, TextField, Typography } from '@mui/material';

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

const NotificationsPage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [lat, setLat] = useState(56.946); // Default to Riga
  const [lon, setLon] = useState(24.1059); // Default to Riga
  const [distance, setDistance] = useState(5); // Default 5 km

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
        lat,
        lon,
        distance,
      };

      const response = await fetch(`${API_BASE_URL}/notifications/subscribe/`, {
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
        `${API_BASE_URL}/notifications/is_subscribed/?endpoint=${encodeURIComponent(existingSubscription.endpoint)}`,
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
        await fetch(`${API_BASE_URL}/notifications/unsubscribe/`, {
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

  const sendTestNotification = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await fetch(`${API_BASE_URL}/notifications/send_notification/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: 'Test Notification',
          body: 'This is a test notification.',
          url: 'https://example.com',
        }),
      });
    } catch (error) {
      console.error('Send notification failed:', error);
    }
  };

  useEffect(() => {
    checkExistingSubscription();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Push Notifications
      </Typography>

      <Box sx={{ my: 3 }}>
        <TextField
          label="Latitude"
          type="number"
          value={lat}
          onChange={(e) => setLat(parseFloat(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Longitude"
          type="number"
          value={lon}
          onChange={(e) => setLon(parseFloat(e.target.value))}
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

      {isSubscribed ? (
        <Box>
          <Typography>You are subscribed to push notifications.</Typography>
          <Button variant="contained" color="error" onClick={unsubscribeUser} sx={{ mt: 2, mr: 2 }}>
            Unsubscribe
          </Button>
          <Button variant="outlined" onClick={sendTestNotification} sx={{ mt: 2 }}>
            Send Test Notification
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography>You are not subscribed yet.</Typography>
          <Button variant="contained" onClick={askForNotificationPermission} sx={{ mt: 2 }}>
            Subscribe
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default NotificationsPage;
