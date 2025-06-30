import React, { useCallback, useState, useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const MapTilerLayerComponent = () => {
  const map = useMap();
  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: 'zqJA9kfFpP2bX0hmViWr',
      style: 'basic-v2',
    });
    mtLayer.addTo(map);
    return () => {
      map.removeLayer(mtLayer);
    };
  }, [map]);
  return null;
};

const LocationMarker = ({ position, onLocationChange }) => {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng);
    },
  });

  const iconMarkup = renderToStaticMarkup(<LocationOnIcon style={{ color: '#D30A0A', fontSize: '2rem' }} />);
  const customIcon = L.divIcon({
    html: iconMarkup,
    className: 'custom-icon',
  });

  const handleDragEnd = useCallback(
    (event) => {
      const newPos = event.target.getLatLng();
      onLocationChange(newPos);
    },
    [onLocationChange],
  );

  return (
    position && (
      <Marker
        position={position}
        icon={customIcon}
        draggable={true}
        eventHandlers={{
          dragend: handleDragEnd,
        }}
      />
    )
  );
};

const LeafletSubscribeMap = ({ onLocationChange, initialLocation }) => {
  const [position, setPosition] = useState(initialLocation ? [initialLocation.lat, initialLocation.lon] : [56.946285, 24.105078]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [solutionMessage, setSolutionMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch stored location on mount
  useEffect(() => {
    const fetchStoredLocation = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/notifications/user-location/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPosition([data.lat, data.lon]);
          onLocationChange({ lat: data.lat, lng: data.lon });
        }
      } catch (error) {
        console.error('Error fetching stored location:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!initialLocation) {
      fetchStoredLocation();
    } else {
      setIsLoading(false);
    }
  }, [initialLocation, onLocationChange]);

  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        onLocationChange({ lat: latitude, lng: longitude });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMessage('Geolocation Permission Denied');
            setSolutionMessage('Please enable GPS and allow location access in your browser settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMessage('Location Information Unavailable');
            setSolutionMessage("Please check your device's location settings or try again later.");
            break;
          case error.TIMEOUT:
            setErrorMessage('Geolocation Request Timed Out');
            setSolutionMessage('Please ensure your device has a stable connection and try again.');
            break;
          case error.UNKNOWN_ERROR:
            setErrorMessage('Unknown Error Occurred');
            setSolutionMessage('An unknown error occurred while retrieving your location. Please try again.');
            break;
          default:
            setErrorMessage('An Error Occurred');
            setSolutionMessage('An unexpected error occurred. Please try again.');
        }
      },
    );
  };

  const handleLocationChange = useCallback(
    (newPosition) => {
      setPosition([newPosition.lat, newPosition.lng]);
      onLocationChange(newPosition);
    },
    [onLocationChange],
  );

  if (isLoading) {
    return <div>Loading map...</div>;
  }

  return (
    <div style={{ position: 'relative' }}>
      {errorMessage && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 1000,
            backgroundColor: 'white',
            padding: '8px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          <Typography color="error">{errorMessage}</Typography>
          <Typography>{solutionMessage}</Typography>
        </div>
      )}
      <Button
        variant="contained"
        onClick={handleUseMyLocation}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1000,
        }}
      >
        Use My Location
      </Button>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <MapTilerLayerComponent />
        <LocationMarker position={position} onLocationChange={handleLocationChange} />
      </MapContainer>
    </div>
  );
};

export default LeafletSubscribeMap;
