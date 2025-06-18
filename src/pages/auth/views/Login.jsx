import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material';

import { useAuth } from '../../../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Lūdzu, ievadiet savu e-pastu un paroli');
      return;
    }

    setLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        setLoading(false);
        navigate('/');
      } else {
        setError('Nepareizs e-pasts vai parole');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Radās kļūda pieteikšanās laikā');
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" align="center" sx={{ color: '#16477c' }}>
          Pieteikties
        </Typography>
        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
            inputRef={emailInputRef}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Parole"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              background: 'linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)',
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Pieteikties'}
          </Button>
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Jums vēl nav konta?{' '}
              <Link
                to="/register"
                style={{
                  color: '#00b5ad',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Reģistrējieties tagad!
              </Link>
            </Typography>

            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              <Link
                to="/forgot-password"
                style={{
                  color: '#00b5ad',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Aizmirsi paroli?
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
