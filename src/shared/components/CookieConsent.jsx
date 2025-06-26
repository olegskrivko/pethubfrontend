import React, { useEffect, useState } from 'react';

import { Box, Button, Card, CardContent, Link, Stack, Typography } from '@mui/material';
import Cookies from 'js-cookie';

import cookiesImg from '../../assets/cookies.svg';

const COOKIE_NAME = 'userAcceptedCookies';
const COOKIE_EXPIRY_DAYS = 150;

const CookieConsent = () => {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookieAccepted = Cookies.get(COOKIE_NAME);
    if (cookieAccepted === 'true') {
      setAccepted(true);
    }
    setLoading(false);
  }, []);

  const handleAccept = () => {
    Cookies.set(COOKIE_NAME, 'true', { expires: COOKIE_EXPIRY_DAYS });
    setAccepted(true);
    console.log('User accepted cookies');
  };

  const handleDecline = () => {
    setAccepted(true);
    console.log('User declined cookies');
  };

  if (loading || accepted) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        left: { xs: 0, sm: 20 },
        right: { xs: 0, sm: 20 },
        zIndex: 10000,
        maxWidth: { xs: 'calc(100vw - 16px)', sm: 360 },
        mx: { xs: 'auto', sm: 0 },
        px: { xs: 1, sm: 0 }, // extra horizontal padding for xs
      }}
    >
      <Card
        sx={{
          p: 3,
          pt: 5,
          borderRadius: 3,
          textAlign: 'center',
          textAlign: 'left',
          boxShadow: 4,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -32,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <img src={cookiesImg} alt="Cookie Icon" style={{ width: 64, height: 64 }} />
        </Box>

        {/* <CardContent> */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          We use cookies for essential website functions and to better understand how you use our site, so we can create
          the best possible experience for you ❤️{' '}
          <Link href="/policies" underline="hover" sx={{ mb: 2 }}>
            Privacy Policy
          </Link>
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Button variant="outlined" color="error" size="small" onClick={handleDecline}>
            Decline
          </Button>
          <Button variant="contained" size="small" onClick={handleAccept}>
            Got it
          </Button>
        </Stack>
        {/* </CardContent> */}
      </Card>
    </Box>
  );
};

export default CookieConsent;
