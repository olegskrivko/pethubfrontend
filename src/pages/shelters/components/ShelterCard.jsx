import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../../../assets/react.svg'; 

const ShelterCard = ({ shelter }) => {
  const isNew = () => {
    const createdDate = new Date(shelter.created_at);
    const now = new Date();
    const diffInDays = (now - createdDate) / (1000 * 60 * 60 * 24); // convert ms to days
    return diffInDays <= 7;
  };

  return (
    <Card>
      <Link to={`/shelters/${shelter.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box position="relative">
        <CardMedia
          component="img"
          image={'https://picsum.photos/600/400'}
          // image={shelter.shelter_image_1 || logo}
          alt={shelter.title}
          sx={{ width: '100%', height: 'auto' }}
        />
    {isNew() && (
            <Chip
              label="Jauns"
              variant="contained"
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
      <CardContent sx={{ flexGrow: 1, paddingBottom: '1rem !important' }}>
      <Typography variant="h6">
  {shelter.title?.length > 20
    ? `${shelter.title.slice(0, 20)}...`
    : shelter.title}
</Typography>


      </CardContent>

    </Card>
  );
};

export default ShelterCard;