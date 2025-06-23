import { useLayoutEffect, useRef, useState } from 'react';
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

import { useAuth } from '../../../contexts/AuthContext';

const LoginPage = () => {
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
    setError('');

    if (!email || !password) {
      setError('Lūdzu, ievadiet savu e-pastu un paroli');
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Radās kļūda pieteikšanās laikā');
    } finally {
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
          my: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" color="primary" fontWeight="bold" textAlign="center" gutterBottom>
          Pieteikties
        </Typography>

        {error && (
          <Typography variant="body1" color="error" textAlign="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }} noValidate>
          <TextField
            fullWidth
            required
            id="email"
            label="E-pasts"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Pieteikties'}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 3 }}>
          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
            sx={{ color: '#00b5ad', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            Nav konta? Reģistrējieties
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

export default LoginPage;
