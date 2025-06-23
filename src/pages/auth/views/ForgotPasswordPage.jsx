import { useState } from 'react';
import { Link } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setSuccess('');
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
        setSuccess('Paroles atiestatīšanas saite ir nosūtīta uz jūsu e-pastu.');
      } else {
        setError(data.error || 'Kaut kas nogāja greizi. Lūdzu, mēģiniet vēlreiz.');
      }
    } catch {
      setError('Radās kļūda. Lūdzu, mēģiniet vēlreiz vēlāk.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          my: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" color="primary" fontWeight="bold" textAlign="center" gutterBottom>
          Aizmirsi paroli?
        </Typography>

        {success && (
          <Typography variant="body1" color="success.main" textAlign="center" sx={{ mb: 2 }}>
            {success}
          </Typography>
        )}

        {error && (
          <Typography variant="body1" color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleForgotPassword} sx={{ width: '100%' }}>
          <TextField
            fullWidth
            required
            id="email"
            label="E-pasta adrese"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ borderRadius: 2, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Saņemt atiestatīšanas saiti'}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 3 }}>
          <Link
            to="/login"
            style={{
              color: '#00b5ad',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ArrowBackIcon fontSize="small" />
            Atpakaļ uz pieteikšanās lapu
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
