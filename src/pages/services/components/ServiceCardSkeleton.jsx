import React from 'react';

import { Box, Card, CardContent, Skeleton } from '@mui/material';

const ServiceCardSkeleton = () => {
  return (
    <Box>
      {/* Main image placeholder with consistent 4:3 aspect ratio */}
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '4 / 3' }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 1,
          }}
        />
      </Box>

      {/* Circle + line in one row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, px: 1 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton height={30} width="60%" />
      </Box>
    </Box>
  );
};

export default ServiceCardSkeleton;
