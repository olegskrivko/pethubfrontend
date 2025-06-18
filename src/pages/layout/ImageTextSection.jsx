// components/layout/ImageTextSection.jsx
import React from 'react';

import { Box, CardMedia, Grid, Typography } from '@mui/material';

const ImageTextSection = ({ image, imageAlt, imagePosition = 'left', title, text }) => {
  const isImageLeft = imagePosition === 'left';

  return (
    <Grid container spacing={4} alignItems="center" sx={{ mb: 6 }}>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} order={{ xs: 1, md: isImageLeft ? 1 : 2 }}>
        <CardMedia
          component="img"
          src={image}
          alt={imageAlt}
          sx={{ width: '100%', objectFit: 'contain', borderRadius: 2 }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} order={{ xs: 2, md: isImageLeft ? 2 : 1 }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ImageTextSection;
