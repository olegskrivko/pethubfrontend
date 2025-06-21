import React, { useEffect, useState } from 'react';

import { AccessTime, Email, Euro, LocationOn, Phone } from '@mui/icons-material';
import { Facebook, Instagram, Language, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MapIcon from '@mui/icons-material/Map';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import moment from 'moment';

const TabNotes = ({ service }) => {
  const [userCoords, setUserCoords] = useState(null);
  const [distances, setDistances] = useState([]);
  const [centerCoords, setCenterCoords] = useState([56.946285, 24.105078]);

  const handlePanToLocation = (lat, lng) => {
    console.log('lat, lng', lat, lng);
    setCenterCoords([lat, lng]);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setUserCoords({ latitude, longitude });

      if (service?.locations?.length) {
        const calculatedDistances = service.locations.map((loc) =>
          calculateDistance(latitude, longitude, loc.latitude, loc.longitude),
        );
        setDistances(calculatedDistances);
      }
    });
  }, [service]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2); // km
  };
  return (
    // <Card
    //   sx={{
    //     borderRadius: 3,
    //     background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
    //     cursor: 'pointer',
    //     transition: 'all 0.3s ease-in-out',
    //     '&:hover': {
    //       background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
    //     },
    //   }}
    // >
    <>
      {service.locations?.length > 0 ? (
        service.locations.map((location, index) => (
          <Card
            key={index}
            elevation={3}
            sx={{
              borderRadius: 3,
              mb: 4,
              p: { xs: 2, md: 2 },
              backgroundColor: '#fafafa',
            }}
          >
            <Box display="flex" alignItems="center" gap={2} justifyContent="space-between">
              <Box display="flex" flexDirection="column" alignItems="flex-start" gap={2}>
                <Box sx={{ gap: 1 }} style={{ display: 'flex', alignItems: 'center', color: '#343a40' }}>
                  <IconButton
                    onClick={() => handlePanToLocation(location.latitude, location.longitude)}
                    color="primary"
                    style={{ backgroundColor: '#f7f9fd' }}
                  >
                    <LocationOn />
                  </IconButton>
                  <Typography variant="body1">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${location.street}, ${location.city}`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#90caf9',
                        textDecoration: 'underline',
                        marginLeft: '0.3rem',
                      }}
                    >
                      {location.city}, {location.street}
                    </a>
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <ArrowOutwardIcon />
                {distances.length > index && (
                  <Typography variant="body2" color="text.secondary">
                    {distances[index]} km
                  </Typography>
                )}
              </Box>
            </Box>
          </Card>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No locations available for this service.
        </Typography>
      )}

      {/* </Card> */}
    </>
  );
};

export default TabNotes;
