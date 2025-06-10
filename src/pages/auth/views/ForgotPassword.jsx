import React, { useState } from 'react';
import {
  Typography,
  Container,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('A password reset link has been sent to your email.');
        setLoading(false);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ paddingLeft: 0, paddingRight: 0 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
   
   <Typography component="h1" variant="h5" align="center" sx={{color:"#16477c"}}>
           Aizmirsi paroli?
        </Typography>
        {message && (
          <Typography
            variant="body2"
            color="success"
            align="center"
            sx={{ mb: 2 }}
          >
            {message}
          </Typography>
        )}
        {error && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            sx={{ mb: 2 }}
          >
            {error}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleForgotPassword}
          noValidate
          sx={{ width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-pasts"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
             sx={{ mt: 2, mb: 2, background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)" }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Saņemt paroles atiestatīšanas saiti'
            )}
          </Button>

          <Typography variant="body2" align="center">
            <Link to="/login" style={{
                        color: '#00b5ad',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}>Atpakaļ uz pieteikšanās lapu!</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
