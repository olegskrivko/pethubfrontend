import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@maptiler/leaflet-maptilersdk'; // MapTiler plugin
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import shelterIcon from './pet_house.png'; // Replace this with your icon if needed
import { useTheme, useMediaQuery } from '@mui/material'; // 🔥 Add these imports
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
      map.setView(centerCoords, 9);
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

function LeafletSheltersMap({ shelters, centerCoords }) {
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // 📱 Detect mobile size

  const mapHeight = isSmallScreen ? '240px' : '500px'; // 📏 Smaller map on small screens
  return (
    // <div>
    //   <MapContainer
    //     style={{ height: '500px' }}
    //     center={[56.946285, 24.105078]} // Default center (Lat, Long)
    //     zoom={7}
    //     scrollWheelZoom
    //     maxZoom={18}  // Add maxZoom
    //     minZoom={3}   // Optional, set a minZoom if needed
    //   >
    //     {/* MapTiler Layer */}
    //     <MapTilerLayerComponent />

    //     {/* Update map view if centerCoords are passed */}
    //     <MapUpdater centerCoords={centerCoords} />

    //     <MarkerClusterGroup
    //       iconCreateFunction={createClusterCustomIcon}
    //       maxClusterRadius={150}
    //       spiderfyOnMaxZoom={false}
    //       showCoverageOnHover={false}
    //     >
    //       {shelters.map((shelter) =>
    //         shelter.latitude && shelter.longitude ? (
    //           <Marker
    //             key={shelter.id}
    //             icon={defaultIcon}
    //             position={[parseFloat(shelter.latitude), parseFloat(shelter.longitude)]}
    //           >
    //             <Popup offset={[0, 5]}>
    //               <a href={`/shelters/${shelter.id}`} style={{ textDecoration: 'none' }}>
    //                 <div
    //                   style={{
    //                     background: '#5B9BD5',
    //                     color: 'white',
    //                     padding: '6px 12px',
    //                     borderRadius: '12px',
    //                     fontSize: '14px',
    //                     fontWeight: 500,
    //                     boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
    //                     whiteSpace: 'nowrap',
    //                     textDecoration: 'none',
    //                   }}
    //                 >
    //                   {shelter.name}
    //                 </div>
    //               </a>
    //             </Popup>
    //           </Marker>
    //         ) : null
    //       )}
    //     </MarkerClusterGroup>
    //   </MapContainer>
    // </div>
    <div>
      <MapContainer
        style={{ height: mapHeight }}
        center={[56.946285, 24.105078]}
        zoom={7}
        scrollWheelZoom
        maxZoom={18}
        minZoom={3}
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
          {shelters.map((shelter) =>
            shelter.latitude && shelter.longitude ? (
              <Marker
                key={shelter.id}
                icon={defaultIcon}
                position={[parseFloat(shelter.latitude), parseFloat(shelter.longitude)]}
              >
                <Popup offset={[0, 5]}>
                  <a href={`/shelters/${shelter.id}`} style={{ textDecoration: 'none' }}>
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
                        textDecoration: 'none',
                      }}
                    >
                      {shelter.name}
                    </div>
                  </a>
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

export default LeafletSheltersMap;
