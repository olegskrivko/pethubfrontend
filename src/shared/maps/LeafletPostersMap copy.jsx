import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
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

function OpenVisiblePopups({ markerRefs }) {
  useMapEvent(['moveend', 'zoomend'], () => {
    setTimeout(() => {
      Object.values(markerRefs.current).forEach((marker) => {
        if (marker && marker.isPopupOpen && !marker.isPopupOpen()) {
          marker.openPopup();
        }
      });
    }, 100); // Delay to ensure markers are mounted
  });
  // Also run on mount
  useEffect(() => {
    setTimeout(() => {
      Object.values(markerRefs.current).forEach((marker) => {
        if (marker && marker.isPopupOpen && !marker.isPopupOpen()) {
          marker.openPopup();
        }
      });
    }, 100);
  }, []);
  return null;
}

function LeafletPostersMap({ posters, pets, centerCoords }) {
  const [userLocation, setUserLocation] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const mapHeight = isSmallScreen ? '240px' : '500px';

  // Store refs for each poster marker
  const markerRefs = useRef({});
  // Ref for the cluster group
  const clusterGroupRef = useRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);
      },
      (err) => console.error('Location error:', err),
    );
  }, []);

  // Open all visible poster popups after cluster animation ends
  useEffect(() => {
    const clusterGroup = clusterGroupRef.current;
    if (!clusterGroup) return;
    const handleAnimationEnd = () => {
      setTimeout(() => {
        Object.values(markerRefs.current).forEach((marker) => {
          if (marker && marker.isPopupOpen && !marker.isPopupOpen()) {
            marker.openPopup();
          }
        });
      }, 100);
    };
    clusterGroup.on('animationend', handleAnimationEnd);
    // Also run on mount
    handleAnimationEnd();
    return () => {
      clusterGroup.off('animationend', handleAnimationEnd);
    };
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
        <OpenVisiblePopups markerRefs={markerRefs} />

        <MarkerClusterGroup
          ref={clusterGroupRef}
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={60}
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
                      maxWidth: 260,
                      borderRadius: 12,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      overflow: 'hidden',
                      fontFamily: 'Roboto, sans-serif',
                      background: '#fff',
                      color: '#333',
                      textAlign: 'center',
                      paddingBottom: 8,
                    }}
                  >
                    {/*
            Find the pet object that matches poster.pet
          */}
                    {(() => {
                      const pet = pets.find((p) => p.id === poster.pet);
                      return pet && pet.pet_image_1 ? (
                        <img
                          src={pet.pet_image_1}
                          alt={`Pet ${pet.id}`}
                          style={{
                            width: 160,
                            height: 160,
                            objectFit: 'cover',
                            borderRadius: '50%',
                            margin: '16px auto 8px',
                            display: 'block',
                            border: '4px solid #fff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 160,
                            height: 160,
                            backgroundColor: '#ddd',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                            color: '#666',
                            fontStyle: 'italic',
                            margin: '16px auto 8px',
                            border: '4px solid #fff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                          }}
                        >
                          No image available
                        </div>
                      );
                    })()}

                    <div style={{ padding: '8px 12px' }}>
                      <h3 style={{ margin: '8px 0 4px', fontWeight: 700, fontSize: '1.1rem' }}>
                        {`Pet #${poster.pet}`}
                      </h3>
                      <p style={{ margin: 0, fontWeight: 500, color: '#555' }}>Scans: {poster.scans ?? 'N/A'}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ) : null,
          )}

          {/* {userLocation && (
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
          )} */}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default LeafletPostersMap;
