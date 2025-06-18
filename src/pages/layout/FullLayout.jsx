import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Loader from '../../shared/components/Loader';
import DrawerAppBar from './DrawerAppBar';
import Footer from './Footer';

const AuthLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* HEADER */}
      <DrawerAppBar />
      {/* MAIN */}
      <Box component="main" sx={{ flex: '1 0 auto', width: '100%' }}>
        {/* <Container disableGutters sx={{ flexGrow: 1,  py: { xs: 2, sm: 3, md: 3, lg: 4, xl: 5, }, }}> */}
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
        {/* </Container> */}
      </Box>
      {/* FOOTER */}
      <Footer />
    </Box>
  );
};

export default AuthLayout;
