import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!token) {
      setError('Invalid reset link.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
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
          Reset Password
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

        <Box component="form" onSubmit={handleResetPassword} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ borderRadius: 2, py: 1.5, mt: 2 }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Reset Password'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
