import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Box, Typography } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@maptiler/leaflet-maptilersdk'; // MapTiler plugin
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import shelterIcon from '../../shared/maps/suitcase.png'; // Replace this with your icon if needed

// Icons for shelters
const defaultIcon = new L.Icon({
  iconUrl: shelterIcon,
  iconSize: new L.Point(40, 40),
});

const userPulseIcon = L.divIcon({
  className: '',
  html: `
    <div class="user-location-wrapper">
      <div class="user-location-core"></div>
      <div class="user-location-pulse"></div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// Function to create custom cluster icons
const createClusterCustomIcon = function (cluster) {
  return new L.DivIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(33, 33, true),
  });
};

// Component to update the map center and zoom level
const MapUpdater = ({ centerCoords }) => {
  const map = useMap();

  useEffect(() => {
    if (centerCoords && centerCoords.length === 2) {
      map.setView(centerCoords, 13);
    }
  }, [centerCoords, map]);

  return null;
};

// ✅ MapTiler Layer (uses official SDK)
const MapTilerLayerComponent = () => {
  const map = useMap();

  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: 'zqJA9kfFpP2bX0hmViWr',
      style: 'basic-v2', // You can change the style here if you like
    });

    mtLayer.addTo(map);

    return () => {
      map.removeLayer(mtLayer);
    };
  }, [map]);

  return null;
};

function LeafletServiceDetailsMap({ shelters, centerCoords }) {
      const [userLocation, setUserLocation] = useState(null);
  
      useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setUserLocation([latitude, longitude]);
          },
          (err) => console.error('Location error:', err)
        );
      }, []);
  return (
    <div    style={{  marginBottom: "2rem"}}>
      <MapContainer
        style={{ height: '500px' }}
        center={[56.946285, 24.105078]} // Default center (Lat, Long)
   
        zoom={13}
        scrollWheelZoom
        maxZoom={18}  // Add maxZoom
        minZoom={3}   // Optional, set a minZoom if needed
      >
        {/* MapTiler Layer */}
        <MapTilerLayerComponent />

        {/* Update map view if centerCoords are passed */}
        <MapUpdater centerCoords={centerCoords} />

        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={150}
          spiderfyOnMaxZoom={false}
          showCoverageOnHover={false}
        >
       {(shelters || []).map((shelter) =>
  shelter?.latitude && shelter?.longitude ? (

              <Marker
                key={shelter.id}
                icon={defaultIcon}
                position={[parseFloat(shelter.latitude), parseFloat(shelter.longitude)]}
              >
             <Popup offset={[0, 5]}>
  <div
    style={{
      background: 'white',
      color: '#333',
      padding: '16px',
      borderRadius: '16px',
      fontSize: '14px',
      fontWeight: 500,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      minWidth: '220px',
    }}
  >
    {shelter.working_hours && (
      <Box>
        <Typography
          variant="subtitle2"
          fontWeight={600}
          sx={{ mb: 1,   px: 1, color: '#1976d2' }}
        >
          Darba laiks:
        </Typography>

        <Box component="ul" sx={{ listStyle: 'none', pl: 0, m: 0 }}>
          {[
            { id: 0, label: 'Pirmdiena' },
            { id: 1, label: 'Otrdiena' },
            { id: 2, label: 'Trešdiena' },
            { id: 3, label: 'Ceturtdiena' },
            { id: 4, label: 'Piektdiena' },
            { id: 5, label: 'Sestdiena' },
            { id: 6, label: 'Svētdiena' },
          ].map((day) => {
            const entry = Array.isArray(shelter.working_hours)
  ? shelter.working_hours.find((time) => time.day === day.id)
  : null;
            // const entry = shelter.working_hours.find((time) => time.day === day.id);
            const isToday = new Date().getDay() === (day.id === 0 ? 1 : day.id + 1) % 7;

            return (
              <Box
                key={day.id}
                component="li"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  fontWeight: isToday ? 700 : 400,
                  color: isToday ? '#d32f2f' : 'text.secondary',
                  backgroundColor: isToday ? '#fff3e0' : 'transparent',
                  borderRadius: '6px',
                  px: 1,
                  py: 0.5,
                  mb: 0.5,
                }}
              >
                <span style={{marginRight: '1rem'}}>{day.label}</span>
                <span>
                  {entry && entry.from_hour && entry.to_hour
                    ? `${entry.from_hour.slice(0, 5)} - ${entry.to_hour.slice(0, 5)}`
                    : 'Brīvdiena'}
                </span>
              </Box>
            );
          })}
        </Box>
      </Box>
    )}
  </div>
</Popup>

              </Marker>
            ) : null
          )}


                    {userLocation && (
                      <Marker position={userLocation} icon={userPulseIcon}>
                        <Popup offset={[0, 5]}>
                          <div
                            style={{
                              background: '#5B9BD5',
                              color: 'white',
                              padding: '6px 12px',
                              borderRadius: '12px',
                              fontSize: '14px',
                              fontWeight: 500,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Tava atrašanās vieta
                          </div>
                        </Popup>
                      </Marker>
                    )}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default LeafletServiceDetailsMap;

