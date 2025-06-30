import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// REACT MUI
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Loader from '../../shared/components/Loader';
import DrawerAppBar from './DrawerAppBar';
// CUSTOM
import Footer from './Footer';

const Layout = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient( #e3f2fd, #ffffff)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* HEADER */}
      <Box component="header">
        <DrawerAppBar />
      </Box>

      {/* MAIN */}
      <Box
        component="main"
        sx={{
          flex: '1 0 auto',
          width: '100%',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
            px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
            flexGrow: 1,
          }}
        >
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Container>
      </Box>
      {/* FOOTER */}
      <Box component="footer">
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
