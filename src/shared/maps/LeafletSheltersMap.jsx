import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@maptiler/leaflet-maptilersdk';
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';

// import locationIcon from './location.svg';
import locationIcon from './suitcase.png';
import dogIconUrl from './dog-walking.png';
import catIconUrl from './catlocation.svg';

const defaultIcon = new L.Icon({
  iconUrl: locationIcon,
  iconSize: new L.Point(40, 47),
});

const dogIcon = new L.Icon({
  iconUrl: dogIconUrl,
  iconSize: new L.Point(40, 47),
});

const catIcon = new L.Icon({
  iconUrl: catIconUrl,
  iconSize: new L.Point(40, 47),
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

const createClusterCustomIcon = (cluster) => {
  return new L.DivIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(33, 33, true),
  });
};

const MapUpdater = ({ centerCoords }) => {
  const map = useMap();
  useEffect(() => {
    if (centerCoords?.length === 2) {
      map.setView(centerCoords, 9);
    }
  }, [centerCoords, map]);
  return null;
};

const MapTilerLayer = () => {
  const map = useMap();
  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: 'zqJA9kfFpP2bX0hmViWr',
      style: 'basic-v2',
    });
    mtLayer.addTo(map);
    return () => map.removeLayer(mtLayer);
  }, [map]);
  return null;
};

const getIconByCategory = (category) => {
  switch (category) {
    case 1:
      return defaultIcon; // Pet Sitting
    case 2:
      return defaultIcon; // Dog Walking
    case 3:
      return defaultIcon; // Grooming
    case 4:
      return defaultIcon; // Training
    case 5:
      return defaultIcon; // Boarding
    default:
      return defaultIcon;
  }
};

function LeafletServicesMap({ services, centerCoords }) {
  const [userLocation, setUserLocation] = useState(null);
  console.log('locationservices', services);
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
    <div>
      <MapContainer
        style={{ height: '500px', width: '100%' }}
        center={[56.946285, 24.105078]} // Rīga center
        zoom={9}
        scrollWheelZoom
        maxZoom={18}
      >
        <MapTilerLayer />
        <MapUpdater centerCoords={centerCoords} />

        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={150}
          spiderfyOnMaxZoom={false}
          showCoverageOnHover={false}
        >
          {/* {services?.flatMap((service) =>
  service.locations
    .filter(loc => loc.latitude && loc.longitude)
    .map((loc) => ( */}
          {services?.flatMap((service) =>
            (service.locations || [])
              .filter((loc) => loc.latitude && loc.longitude)
              .map((loc) => (
                <Marker
                  key={`service-${service.id}-loc-${loc.id}`}
                  icon={getIconByCategory(service.category)}
                  position={[parseFloat(loc.latitude), parseFloat(loc.longitude)]}
                >
                  <Popup offset={[0, 5]}>
                    <div
                      style={{
                        padding: '16px',
                        maxWidth: '250px',
                        textAlign: 'center',
                        borderRadius: '12px',
                        background: 'white',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        fontFamily: 'Arial, sans-serif',
                      }}
                    >
                      <h3
                        style={{
                          margin: '0 0 8px',
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#333',
                        }}
                      >
                        {service.title}
                      </h3>
                      <p
                        style={{
                          margin: '0 0 6px',
                          fontSize: '14px',
                          color: '#666',
                        }}
                      >
                        <strong style={{ color: '#5B9BD5' }}>{loc.city}</strong> — {loc.address}
                      </p>
                      {/* <p style={{
      margin: '8px 0',
      fontSize: '14px',
      color: '#555',
    }}>
      {service.description}
    </p> */}
                      <p
                        style={{
                          margin: '8px 0 0',
                          fontSize: '14px',
                          color: '#555',
                          lineHeight: '1.4',
                        }}
                      >
                        <strong style={{ display: 'block', color: '#5B9BD5' }}>{loc.phone_number}</strong>
                        <a
                          href={`mailto:${loc.email}`}
                          style={{
                            color: '#5B9BD5',
                            textDecoration: 'none',
                            fontWeight: '500',
                            marginTop: '4px',
                            display: 'inline-block',
                          }}
                        >
                          {loc.email}
                        </a>
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))
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

export default LeafletServicesMap;
