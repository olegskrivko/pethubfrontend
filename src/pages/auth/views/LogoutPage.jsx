import { Link } from 'react-router-dom';

import { Box, Button, Container, Typography } from '@mui/material';

const LogoutPage = () => {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          my: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" textAlign="center" color="primary" fontWeight="bold" gutterBottom>
          Paldies, ka bijāt ar mums!
        </Typography>

        <Typography variant="body1" textAlign="center" component="p" color="text.secondary" sx={{ mb: 3 }}>
          Jūs esat veiksmīgi izrakstījies no sistēmas. Mēs ceram jūs atkal redzēt drīzumā!
        </Typography>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          sx={{ borderRadius: 2, py: 1, px: 3, mb: 2, width: '100%' }}
        >
          Pieteikties vēlreiz
        </Button>

        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to="/"
          sx={{ borderRadius: 2, py: 1, px: 3, width: '100%' }}
        >
          Atpakaļ uz sākumlapu
        </Button>
      </Box>
    </Container>
  );
};

export default LogoutPage;
