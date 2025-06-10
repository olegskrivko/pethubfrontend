// components/PetCardSkeleton.jsx

import React from 'react';
import { Box, Skeleton } from '@mui/material';

const PetCardSkeleton = () => {
  return (
    <Box sx={{ p: 1 }}>
      <Skeleton

        variant="rectangular"
        // height={200}
        sx={{
            height: {
              xs: 350, // phones / extra-small
              sm: 200, // tablets
              md: 180, // medium screens
            },
            borderRadius: 2,
          }}
      />
      <Skeleton height={30} width="80%" sx={{ mt: 1 }} />
      <Skeleton height={20} width="60%" />
    </Box>
  );
};

export default PetCardSkeleton;
