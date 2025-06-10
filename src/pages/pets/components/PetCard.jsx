import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import { IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const PetCard = ({ pet, onPanToLocation }) => {
  const [userCoords, setUserCoords] = useState(null);
  const [distance, setDistance] = useState(null);

  const petLatitude = pet.latitude;
  const petLongitude = pet.longitude;

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserCoords({ latitude, longitude });

      // Calculate distance if pet coordinates exist
      if (petLatitude && petLongitude) {
        const distance = calculateDistance(latitude, longitude, petLatitude, petLongitude);
        setDistance(distance);
      }
    });
  }, [petLatitude, petLongitude]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance.toFixed(2); // Round to two decimal places
  };

    const handleLocationClick = () => {
    console.log('Pet coords from pet card:', petLatitude, petLongitude);
    onPanToLocation(petLatitude, petLongitude);
  };

  // Construct the URL for the pet detail page using only the pet's ID
  const petDetailUrl = `/pets/${pet.id}`;

  return (
    <Card>
      <Link to={petDetailUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box position="relative">
          <CardMedia
            component="img"
            src={pet.pet_image_1}
            alt=""
            sx={{ width: '100%', height: 'auto' }}
          />
          <Chip
            label={pet.status_display}
            // size="small"
            variant="contained"
            sx={{
              // backgroundColor: 'rgba(0, 0, 0, 0.6)',
               backgroundColor: 'rgba(0, 179, 164, 0.6)' ,

              color: 'white',
              position: 'absolute',
              top: '8px',
              right: '8px',
              zIndex: 3,
            }}
          />
        </Box>
      </Link>
      <CardActions disableSpacing style={{ justifyContent: 'start',  }}>
        <Box style={{ display: 'flex', alignItems: 'center', color: '#343a40',}}>
           <IconButton onClick={handleLocationClick} color="primary" style={{ backgroundColor: '#f7f9fd' }}>
    <LocationOnIcon />
  </IconButton>
  <Typography variant="body1" style={{ marginLeft: '4px' }}>
    {distance !== null ? `${distance} km` : 'Calculating...'}
  </Typography>
          
        </Box>
      </CardActions>
    </Card>
  );
};

export default PetCard;