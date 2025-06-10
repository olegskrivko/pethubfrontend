import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Container,
  CardMedia,
  Link as MuiLink,
} from '@mui/material';

// Assuming you have a 404 image in the assets folder
import NotFoundImage from '../assets/images/pagenotfound/monster_404_error_rafiki.svg';

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
        {/* Image Above Text */}
        <CardMedia
  component="img"
  src={NotFoundImage}
  alt="404 Not Found"
  sx={{
    width: {
      xs: '100%',   // full width on extra small screens
      sm: '80%',  // medium size on small screens
      md: '80%',  // larger on medium screens
      lg: '80%',  // even bigger on large screens
    },
    objectFit: 'contain',
 
    pointerEvents: 'none',
    userSelect: 'none',
    border: 'none',
  }}
/>
        {/* Image Credit */}
        <MuiLink
          href="https://storyset.com/web"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            fontSize: '0.6rem', // Smaller font size for the reference link
            fontStyle: 'italic', // Italicized font for the credit
            color: '#999', // Lighter color for the credit
            fontWeight: '300', // Lighter weight for the credit
           
          }}
        >
          Web illustrations by Storyset
        </MuiLink>
        {/* 404 Page Text */}
        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{ mb: 2, mt: 4 }}
        >
          404 - Lapa Nav Atrasta
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 4 }}>
          Oops! Lapa, kuru meklējat, neeksistē.
        </Typography>

        {/* Button to Go Back Home */}
        <Button
          variant="contained"
          sx={{ background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)", px: 4 }}
          component={Link}
          to="/" // Redirect to home page
          fullWidth
        >
          Atpakaļ uz sākumlapu
        </Button>
      </Box>
    </Container>
  );
};

export default PageNotFound;
