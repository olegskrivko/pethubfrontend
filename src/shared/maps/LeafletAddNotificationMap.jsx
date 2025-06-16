// import React, { useState, useCallback, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import MyLocationIcon from '@mui/icons-material/MyLocation';
// import { renderToStaticMarkup } from 'react-dom/server';
// import { IconButton, Tooltip } from '@mui/material';

// const LocationMarker = ({ position, onLocationChange }) => {
//   const map = useMapEvents({
//     click(e) {
//       onLocationChange(e.latlng);
//     },
//   });

//   const iconMarkup = renderToStaticMarkup(
//     <LocationOnIcon style={{ color: '#D30A0A', fontSize: '2rem' }} />,
//   );
//   const customIcon = L.divIcon({
//     html: iconMarkup,
//     className: 'custom-icon',
//   });

//   return (
//     position && (
//       <Marker
//         position={position}
//         icon={customIcon}
//         draggable={true}
//         eventHandlers={{
//           dragend: (event) => {
//             const newPos = event.target.getLatLng();
//             onLocationChange(newPos);
//           },
//         }}
//       />
//     )
//   );
// };

// const MapController = ({ position }) => {
//   const map = useMapEvents({});
//   useEffect(() => {
//     if (position) {
//       map.setView([position.lat, position.lng], map.getZoom());
//     }
//   }, [position, map]);
//   return null;
// };

// const LeafletAddNotificationMap = ({ onLocationChange, location }) => {
//   const [position, setPosition] = useState([location.lat, location.lng]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (location) {
//       setPosition([location.lat, location.lng]);
//     }
//   }, [location]);

//   const handleUseMyLocation = () => {
//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         const newPosition = [latitude, longitude];
//         setPosition(newPosition);
//         onLocationChange({ lat: latitude, lng: longitude });
//         setError(null);
//       },
//       (err) => {
//         setError("Couldn't get your location. Please enable GPS and try again.");
//         console.error("Geolocation error:", err);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0
//       }
//     );
//   };

//   const handleLocationChange = useCallback(
//     (newPosition) => {
//       setPosition([newPosition.lat, newPosition.lng]);
//       onLocationChange(newPosition);
//     },
//     [onLocationChange],
//   );

//   return (
//     <div style={{ position: 'relative' }}>
//       {error && (
//         <div style={{
//           position: 'absolute',
//           top: 10,
//           left: 10,
//           zIndex: 1000,
//           backgroundColor: 'white',
//           padding: '8px',
//           borderRadius: '4px',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
//         }}>
//           {error}
//         </div>
//       )}

//       <Tooltip title="Use my current location">
//         <IconButton
//           onClick={handleUseMyLocation}
//           sx={{
//             position: 'absolute',
//             top: 10,
//             right: 10,
//             backgroundColor: 'white',
//             zIndex: 1000,
//             boxShadow: 3,
//             '&:hover': { backgroundColor: '#f0f0f0' },
//           }}
//         >
//           <MyLocationIcon sx={{ color: '#007bff' }} />
//         </IconButton>
//       </Tooltip>

//       <MapContainer
//         center={position}
//         zoom={13}
//         style={{ height: '500px', width: '100%' }}
//         whenCreated={(map) => {
//           map.on('click', (e) => {
//             handleLocationChange(e.latlng);
//           });
//         }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <LocationMarker position={position} onLocationChange={handleLocationChange} />
//         <MapController position={location} />
//       </MapContainer>
//     </div>
//   );
// };

// export default LeafletAddNotificationMap;
import React, { useCallback, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { renderToStaticMarkup } from 'react-dom/server';
import { IconButton, Tooltip } from '@mui/material';

const LocationMarker = ({ position, onLocationChange }) => {
  const map = useMapEvents({
    click(e) {
      onLocationChange(e.latlng);
    },
  });

  const iconMarkup = renderToStaticMarkup(<LocationOnIcon style={{ color: '#D30A0A', fontSize: '2rem' }} />);

  const customIcon = L.divIcon({
    html: iconMarkup,
    className: 'custom-icon',
  });

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

const MapController = ({ position }) => {
  const map = useMapEvents({});
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], map.getZoom());
    }
  }, [position, map]);
  return null;
};

const LeafletAddNotificationMap = ({ onLocationChange, location }) => {
  const [error, setError] = useState(null);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
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
      }
    );
  };

  const handleLocationChange = useCallback(
    (newPosition) => {
      onLocationChange({ lat: newPosition.lat, lng: newPosition.lng });
    },
    [onLocationChange]
  );

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

      <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker position={[location.lat, location.lng]} onLocationChange={handleLocationChange} />
        <MapController position={location} />
      </MapContainer>
    </div>
  );
};

export default LeafletAddNotificationMap;
