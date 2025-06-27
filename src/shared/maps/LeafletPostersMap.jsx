import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import '@maptiler/leaflet-maptilersdk';
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import { useMediaQuery, useTheme } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import shelterIcon from './qr-code.png';

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

const createClusterCustomIcon = function (cluster) {
  return new L.DivIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(33, 33, true),
  });
};

const MapUpdater = ({ centerCoords }) => {
  const map = useMap();

  useEffect(() => {
    if (centerCoords && centerCoords.length === 2) {
      map.setView(centerCoords, 11);
    }
  }, [centerCoords, map]);

  return null;
};

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

function LeafletPostersMap({ posters, pets, centerCoords }) {
  const [userLocation, setUserLocation] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const mapHeight = isSmallScreen ? '240px' : '500px';

  // Store refs for each poster marker
  const markerRefs = useRef({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);
      },
      (err) => console.error('Location error:', err),
    );
  }, []);

  // Open all poster popups after render
  useEffect(() => {
    Object.values(markerRefs.current).forEach((marker) => {
      if (marker && marker.openPopup) {
        marker.openPopup();
      }
    });
  }, [posters, centerCoords]);

  return (
    <div>
      <MapContainer
        style={{ height: mapHeight }}
        center={[56.946285, 24.105078]}
        zoom={11}
        scrollWheelZoom
        maxZoom={18}
        minZoom={3}
      >
        <MapTilerLayerComponent />
        <MapUpdater centerCoords={centerCoords} />

        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={150}
          spiderfyOnMaxZoom={false}
          showCoverageOnHover={false}
        >
          {posters.map((poster) =>
            poster.latitude && poster.longitude ? (
              <Marker
                key={poster.id}
                icon={defaultIcon}
                position={[parseFloat(poster.latitude), parseFloat(poster.longitude)]}
                ref={(ref) => {
                  if (ref) {
                    markerRefs.current[poster.id] = ref;
                  }
                }}
              >
                <Popup offset={[0, 5]}>
                  <div
                    style={{
                      width: 150,
                      borderRadius: 8,
                      boxShadow: '0 4px 16px rgba(30, 41, 59, 0.13)',
                      overflow: 'hidden',
                      fontFamily: 'Inter, Roboto, Arial, sans-serif',
                      background: '#fff',
                      color: '#23272f',
                      textAlign: 'center',
                      padding: 0,
                      border: '1.2px solid #e5e7eb',
                      position: 'relative',
                    }}
                  >
                    {/* Accent line */}
                    <div style={{ height: 3, width: '100%', background: 'linear-gradient(90deg, #5B9BD5 0%, #00b5ad 100%)', marginBottom: 0 }} />
                    {(() => {
                      const pet = pets.find((p) => p.id === poster.pet);
                      return pet && pet.pet_image_1 ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                          <img
                            src={pet.pet_image_1}
                            alt={`Pet ${pet.id}`}
                            style={{
                              width: 120,
                              height: 120,
                              borderRadius: '50%',
                              border: '3px solid #fff',
                              objectFit: 'cover',
                              boxShadow: '0 2px 8px rgba(30,41,59,0.10)',
                              background: '#f3f4f6',
                            }}
                          />
                        </div>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                          <div
                            style={{
                              width: 120,
                              height: 120,
                              borderRadius: '50%',
                              backgroundColor: '#f3f4f6',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              color: '#666',
                              fontStyle: 'italic',
                              border: '3px solid #fff',
                            }}
                          >
                            No image
                          </div>
                        </div>
                      );
                    })()}

                    <div style={{ padding: '8px 8px 8px 8px' }}>
                      <h3 style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.5px', color: '#1e293b' }}>
                        {`Pet #${poster.pet}`}
                      </h3>
                      <p style={{ margin: 0, fontWeight: 500, color: '#555', fontSize: 13 }}>Scans: {poster.scans ?? 'N/A'}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ) : null,
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
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
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

export default LeafletPostersMap;
