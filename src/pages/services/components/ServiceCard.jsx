import React from 'react';
import { Link } from 'react-router-dom';

import WorkIcon from '@mui/icons-material/Work';
import { Box, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';

import logo from '../../../assets/react.svg';

const ServiceCard = ({ service }) => {
  const isNew = () => {
    const createdDate = new Date(service.created_at);
    const now = new Date();
    const diffInDays = (now - createdDate) / (1000 * 60 * 60 * 24); // convert ms to days
    return diffInDays <= 7;
  };

  return (
    <Card>
      <Link to={`/services/${service.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box position="relative" sx={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image={service.service_image_1 || logo}
            alt={service.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {isNew() && (
            <Chip
              label="Jauns"
              variant="contained"
              sx={{
                backgroundColor: 'rgba(0, 179, 164, 0.6)',
                color: 'white',
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 3,
              }}
            />
          )}
        </Box>
      </Link>
      <CardActions disableSpacing style={{ justifyContent: 'start' }}>
        <Box sx={{ gap: 1 }} style={{ display: 'flex', alignItems: 'center', color: '#343a40' }}>
          <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }}>
            <WorkIcon />
          </IconButton>
          <Typography variant="body1">
            {service.title?.length > 20 ? `${service.title.slice(0, 20)}...` : service.title}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
