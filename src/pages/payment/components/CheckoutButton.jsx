import { useState } from 'react';

import { Alert, Button, CircularProgress, Snackbar } from '@mui/material';

import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CheckoutButton = ({ subscriptionType = 'plus' }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      setError('You need to be logged in to make a payment.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/api/payment/create-checkout-session/subscription/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ subscription_type: subscriptionType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      setError(error.message || 'Failed to connect to the payment server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckout}
        disabled={loading}
        sx={{
          mt: 2,
          px: 4,
          py: 1.5,
          fontSize: '1rem',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Subscribe Now'}
      </Button>

      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{
            width: '100%',
            '& .MuiAlert-message': {
              fontSize: '0.9rem',
            },
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CheckoutButton;
