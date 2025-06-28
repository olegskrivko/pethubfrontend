import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
// Import Link from react-router-dom
import Typography from '@mui/material/Typography';

import { getSpeciesLabel, getStatusLabel } from '../../../constants/Choices';

const PetCard = ({ pet, onPanToLocation }) => {
  const { t } = useTranslation('pets');
  const { t: tPetDetails } = useTranslation('petDetails');
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
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance.toFixed(2); // Round to two decimal places
  };

  const handleLocationClick = () => {
    console.log('Pet coords from pet card:', petLatitude, petLongitude);
    onPanToLocation(petLatitude, petLongitude);
  };

  // Construct the URL for the pet detail page using only the pet's ID
  // const petDetailUrl = `/pets/${pet.id}`;

  return (
    <Card>
      <Link to={`/pets/${pet.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box position="relative" sx={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            src={pet.pet_image_1}
            alt={getSpeciesLabel(pet.species, tPetDetails)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Chip
            label={getStatusLabel(pet.status, tPetDetails)}
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
        </Box>
      </Link>
      <CardActions disableSpacing style={{ justifyContent: 'start' }}>
        <Box sx={{ gap: 1 }} style={{ display: 'flex', alignItems: 'center', color: '#343a40' }}>
          <IconButton onClick={handleLocationClick} color="primary" style={{ backgroundColor: '#f7f9fd' }}>
            <LocationOnIcon />
          </IconButton>
          <Typography variant="body1">{distance !== null ? `${distance} km` : 'Calculating...'}</Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PetCard;
