import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, CardMedia, Container, Link as MuiLink, Typography } from '@mui/material';

import NotFoundImage from '../assets/images/pagenotfound/monster_404_error_rafiki.svg';

/**
 * 404 Page Not Found Component
 * Displays a user-friendly error page when a route is not found
 */
const PageNotFound = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* 404 Error Illustration */}
        <CardMedia
          component="img"
          src={NotFoundImage}
          alt="404 Not Found"
          sx={{
            width: {
              xs: '100%',
              sm: '80%',
              md: '80%',
              lg: '80%',
            },
            objectFit: 'contain',
            pointerEvents: 'none',
            userSelect: 'none',
            border: 'none',
          }}
        />
        
        {/* Image Attribution */}
        <MuiLink
          href="https://storyset.com/web"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            fontSize: '0.6rem',
            fontStyle: 'italic',
            color: '#999',
            fontWeight: '300',
          }}
        >
          Web illustrations by Storyset
        </MuiLink>
        
        {/* Error Message */}
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2, mt: 4 }}>
          404 - Lapa Nav Atrasta
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 4 }}>
          Oops! Lapa, kuru meklējat, neeksistē.
        </Typography>

        {/* Navigation Button */}
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)',
            px: 4,
          }}
          component={Link}
          to="/"
          fullWidth
        >
          Atpakaļ uz sākumlapu
        </Button>
      </Box>
    </Container>
  );
};

export default PageNotFound;
