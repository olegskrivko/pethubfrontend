import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
    setSuccess('');
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
    setSuccess('');
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Lūdzu, ievadiet savu e-pastu un paroli');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          'Konts veiksmīgi izveidots. Lūdzu, pārbaudiet savu e-pastu un apstipriniet to, lai pabeigtu reģistrāciju.',
        );
        setError('');
        setTimeout(() => {
          navigate('/login');
        }, 4000);
      } else {
        if (response.status === 429) {
          setError('Pārsniegts pieprasījumu limits. Lūdzu, mēģiniet vēlreiz pēc kāda laika.');
        } else if (typeof data === 'object') {
          const firstError = Object.values(data).flat()[0];
          setError(firstError || 'Radās kļūda reģistrācijas laikā.');
        } else {
          setError(data.error || data.detail || 'Radās kļūda reģistrācijas laikā.');
        }
        setSuccess('');
      }
    } catch (err) {
      setError('Radās kļūda reģistrācijas laikā. Mēģiniet vēlreiz.');
      setSuccess('');
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
          Reģistrēties
        </Typography>

        {error && (
          <Typography variant="body1" color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {success && (
          <Typography variant="body1" color="success.main" textAlign="center" sx={{ mb: 2 }}>
            {success}
          </Typography>
        )}

        <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }} noValidate>
          <TextField
            fullWidth
            required
            id="email"
            label="E-pasts"
            type="email"
            value={email}
            onChange={onEmailChange}
            inputRef={emailInputRef}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            required
            id="password"
            label="Parole"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={onPasswordChange}
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end" aria-label="toggle password visibility">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ borderRadius: 2, py: 1.5 }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Reģistrēties'}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 3 }}>
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{ color: '#00b5ad', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            Jau ir konts? Pieteikties
          </Link>
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          <Link
            component={RouterLink}
            to="/forgot-password"
            underline="hover"
            sx={{
              color: '#00b5ad',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ArrowBackIcon fontSize="small" />
            Aizmirsi paroli?
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
