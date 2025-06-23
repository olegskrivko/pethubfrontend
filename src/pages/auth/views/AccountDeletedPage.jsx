import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Typography } from '@mui/material';

const AccountDeletedPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
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
          Jūsu konts ir izdzēsts
        </Typography>

        <Typography variant="body1" textAlign="center" component="p" color="text.secondary" sx={{ mb: 3 }}>
          Paldies, ka bijāt daļa no mūsu kopienas. Mums žēl, ka jūs aizejat! Ja kādreiz izlemsiet atgriezties, mēs jūs
          labprāt uzņemsim atpakaļ.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ borderRadius: 2, py: 1, px: 3 }}
        >
          Atgriezties sākumlapā
        </Button>
      </Box>
    </Container>
  );
};

export default AccountDeletedPage;
