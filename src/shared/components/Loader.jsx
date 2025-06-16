import { Box, CircularProgress } from '@mui/material';
import Lottie from 'lottie-react';
// import spinnerAnimation from '../../assets/Animation-1748807031338.json';
// import spinnerAnimation from '../../assets/Animation-1747323887708.json';

const Loader = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <CircularProgress color="secondary" /> */}
      {/* <Box sx={{ width: 180, height: 180 }}>
          <Lottie animationData={spinnerAnimation} loop autoplay />
        </Box> */}
    </Box>
  );
};

export default Loader;
