import React from 'react';

import { Box, Button, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import cookieIcon from '../assets/cookie-icon.png';

/**
 * Styled component for the cookie consent banner
 * Provides a fixed position banner at the bottom of the screen
 */
const StyledCookieConsent = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(135deg, #2474A3 0%, #1a5c82 100%)',
  color: '#fff',
  fontFamily: theme.typography.fontFamily,
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '20px',
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 9999,
  backdropFilter: 'blur(10px)',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '15px',
    textAlign: 'center',
  },
}));

/**
 * Styled component for the button group container
 * Handles responsive layout for action buttons
 */
const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    justifyContent: 'center',
  },
}));

/**
 * Styled component for action buttons
 * Provides consistent styling for accept/decline buttons
 */
const StyledButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: '30px',
  padding: '10px 24px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '14px',
  transition: 'all 0.3s ease',
  ...(variant === 'contained' && {
    background: '#21ABCD',
    '&:hover': {
      background: '#1a8fa8',
      transform: 'translateY(-2px)',
    },
  }),
  ...(variant === 'outlined' && {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    color: '#fff',
    '&:hover': {
      borderColor: '#fff',
      background: 'rgba(255, 255, 255, 0.1)',
    },
  }),
}));

/**
 * Styled component for the cookie icon
 * Provides consistent sizing and styling for the icon
 */
const CookieIcon = styled('img')({
  width: '32px',
  height: '32px',
  marginRight: '12px',
  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
});

/**
 * Cookie Consent Component
 * Displays a banner to inform users about cookie usage and collect consent
 * 
 * @param {Function} onAccept - Callback function when user accepts cookies
 * @param {Function} onDecline - Callback function when user declines cookies
 */
const CookieConsent = ({ onAccept, onDecline }) => {
  return (
    <StyledCookieConsent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <CookieIcon src={cookieIcon} alt="Cookie Icon" />
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px',
            lineHeight: 1.5,
            '& a': {
              color: '#fff',
              textDecoration: 'underline',
              '&:hover': {
                color: '#21ABCD',
              },
            },
          }}
        >
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
          <Link
            href="/policies"
            sx={{
              color: 'inherit',
              textDecoration: 'underline',
              '&:hover': {
                color: '#21ABCD',
              },
            }}
          >
            Learn more
          </Link>
        </Typography>
      </Box>
      <ButtonGroup>
        <StyledButton variant="outlined" onClick={onDecline}>
          Decline
        </StyledButton>
        <StyledButton variant="contained" onClick={onAccept}>
          Accept
        </StyledButton>
      </ButtonGroup>
    </StyledCookieConsent>
  );
};

export default CookieConsent;
