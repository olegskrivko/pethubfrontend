import { Box, CircularProgress } from '@mui/material';

/**
 * Loader Component
 * Displays a loading spinner while content is being fetched or processed
 */
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
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default Loader;
