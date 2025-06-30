import React, { useCallback, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, Marker, useMap, useMapEvents } from 'react-leaflet';
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { IconButton, Tooltip } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LocationMarker = ({ position, onLocationChange }) => {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng);
    },
  });

  const iconMarkup = renderToStaticMarkup(<LocationOnIcon style={{ color: '#D30A0A', fontSize: '2rem' }} />);
  const customIcon = L.divIcon({ html: iconMarkup, className: 'custom-icon' });

  return (
    position && (
      <Marker
        position={position}
        icon={customIcon}
        draggable={true}
        eventHandlers={{
          dragend: (event) => {
            const newPos = event.target.getLatLng();
            onLocationChange(newPos);
          },
        }}
      />
    )
  );
};

const MapTilerLayerComponent = () => {
  const map = useMap();
  React.useEffect(() => {
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

const LeafletAddNotificationMap = ({ onLocationChange, location }) => {
  const [error, setError] = useState(null);
  const [position, setPosition] = useState([location.lat, location.lng]);

  // Sync marker position with location prop from parent
  React.useEffect(() => {
    setPosition([location.lat, location.lng]);
  }, [location]);

  // Only update marker position when user interacts (no auto-centering)
  const handleLocationChange = useCallback(
    (newPosition) => {
      setPosition([newPosition.lat, newPosition.lng]);
      onLocationChange({ lat: newPosition.lat, lng: newPosition.lng });
    },
    [onLocationChange],
  );

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        onLocationChange({ lat: latitude, lng: longitude });
        setError(null);
      },
      (err) => {
        setError("Couldn't get your location. Please enable GPS and try again.");
        console.error('Geolocation error:', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      {error && (
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
          {error}
        </div>
      )}
      <Tooltip title="Use my current location">
        <IconButton
          onClick={handleUseMyLocation}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'white',
            zIndex: 1000,
            boxShadow: 3,
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          <MyLocationIcon sx={{ color: '#007bff' }} />
        </IconButton>
      </Tooltip>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
        whenCreated={(map) => {
          map.on('click', (e) => {
            handleLocationChange(e.latlng);
          });
        }}
      >
        <MapTilerLayerComponent />
        <LocationMarker position={position} onLocationChange={handleLocationChange} />
      </MapContainer>
    </div>
  );
};

export default LeafletAddNotificationMap;
