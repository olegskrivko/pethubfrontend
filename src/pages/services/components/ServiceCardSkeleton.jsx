import React from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

const ServiceCardSkeleton = () => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
      <Skeleton variant="rectangular" height={160} />
      <CardContent>
        <Skeleton variant="text" height={30} width="60%" />
        <Skeleton variant="text" height={20} width="80%" />
        <Skeleton variant="text" height={20} width="40%" />
      </CardContent>
    </Card>
  );
};

export default ServiceCardSkeleton;
