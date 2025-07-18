// // export default LeafletAddPetMap;
// import React, { useState, useCallback } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import { renderToStaticMarkup } from 'react-dom/server';
// // import CustomAlert from '../alert/CustomAlert';
// import { Grid, Box, Typography, Avatar, TextField, Paper, Button } from '@mui/material';
// // Custom hook to handle map events and marker placement
// const LocationMarker = ({ position, onLocationChange }) => {
//   //   const map = useMapEvents({
//   //     click(e) {
//   //       onLocationChange(e.latlng);
//   //     },
//   //     // Ensure marker updates when dragged
//   //     dragend(e) {
//   //       const newPos = e.target.getLatLng();
//   //       onLocationChange(newPos);
//   //     },
//   //   });
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
//             console.log('Dragend event:', event);
//             const newPos = event.target.getLatLng();
//             onLocationChange(newPos);
//           },
//         }}
//       />
//     )
//   );
// };
// const LeafletAddPetMap = ({ onLocationChange, location }) => {
//   //const [position, setPosition] = useState([56.9496, 24.1052]);
//   // const [location, setLocation] = useState([56.9496, 24.1052]);
//   // console.log("location", location)
//   const [position, setPosition] = useState([location.lat, location.lng]);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [solutionMessage, setSolutionMessage] = useState(null);
// // 24.1052
//   const handleUseMyLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setPosition([latitude, longitude]);
//         onLocationChange({ lat: latitude, lng: longitude });
//       },
//       (error) => {
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             setErrorMessage('Geolocation Permission Denied');
//             setSolutionMessage(
//               'Please enable GPS and allow location access in your browser settings.',
//             );
//             break;
//           case error.POSITION_UNAVAILABLE:
//             setErrorMessage('Location Information Unavailable');
//             setSolutionMessage("Please check your device's location settings or try again later.");
//             break;
//           case error.TIMEOUT:
//             setErrorMessage('Geolocation Request Timed Out');
//             setSolutionMessage('Please ensure your device has a stable connection and try again.');
//             break;
//           case error.UNKNOWN_ERROR:
//             setErrorMessage('Unknown Error Occurred');
//             setSolutionMessage(
//               'An unknown error occurred while retrieving your location. Please try again.',
//             );
//             break;
//           default:
//             setErrorMessage('An Error Occurred');
//             setSolutionMessage('An unexpected error occurred. Please try again.');
//         }
//         // Fallback to hardcoded initial value
//         const fallbackPosition = [56.946285, 24.105078];
//         setPosition(fallbackPosition);
//         onLocationChange({ lat: fallbackPosition[0], lng: fallbackPosition[1] });
//       },
//     );
//   };
//   // Memoize the setPosition callback to avoid unnecessary re-renders
//   const handleLocationChange = useCallback(
//     (newPosition) => {
//       setPosition([newPosition.lat, newPosition.lng]);
//       onLocationChange(newPosition);
//     },
//     [onLocationChange],
//   );
//   return (
//     <div>
//       {errorMessage && (
//         // <CustomAlert errorMessage={errorMessage} solutionMessage={solutionMessage} />
//         <div>Error</div>
//       )}
//       {/* <button onClick={handleUseMyLocation}>Use My Location</button> */}
//       <MapContainer center={position} zoom={10} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <LocationMarker position={position} onLocationChange={handleLocationChange} />
//       </MapContainer>
//       <Grid container spacing={2} justifyContent="center">
//         <Grid item xs={12}>
//           <Button variant="contained" onClick={handleUseMyLocation} fullWidth>
//             Izmantot esošo pozīciju
//           </Button>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };
// export default LeafletAddPetMap;
// import React, { useState, useCallback } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import MyLocationIcon from '@mui/icons-material/MyLocation'; // Import Location Icon
// import { renderToStaticMarkup } from 'react-dom/server';
// import { Grid, Button, IconButton } from '@mui/material';
// // Custom hook for marker placement
// const LocationMarker = ({ position, onLocationChange }) => {
//   const map = useMapEvents({
//     click(e) {
//       onLocationChange(e.latlng);
//     },
//   });
//   const iconMarkup = renderToStaticMarkup(
//     <LocationOnIcon style={{ color: '#D30A0A', fontSize: '2rem' }} />,
//   );
//   const customIcon = L.divIcon({ html: iconMarkup, className: 'custom-icon' });
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
// const LeafletAddPetMap = ({ onLocationChange, location }) => {
//   const [position, setPosition] = useState([location.lat, location.lng]);
//   const handleUseMyLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setPosition([latitude, longitude]);
//         onLocationChange({ lat: latitude, lng: longitude });
//       },
//       () => {
//         alert("Couldn't get location. Please enable GPS.");
//       },
//     );
//   };
//   return (
//     <div style={{ position: 'relative' }}>
//       {/* Floating Button */}
// <IconButton
//   onClick={handleUseMyLocation}
//   sx={{
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: 'white',
//     zIndex: 1000,
//     boxShadow: 3,
//     '&:hover': { backgroundColor: '#f0f0f0' },
//   }}
// >
//   <MyLocationIcon sx={{ color: '#007bff' }} />
// </IconButton>
//       {/* Map */}
//       <MapContainer center={position} zoom={10} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <LocationMarker position={position} onLocationChange={setPosition} />
//       </MapContainer>
//       {/* Alternative Button */}
//       <Grid container spacing={2} justifyContent="center">
//         <Grid item xs={12}>
//           <Button variant="contained" onClick={handleUseMyLocation} fullWidth>
//             Izmantot esošo pozīciju
//           </Button>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };
// export default LeafletAddPetMap;
// import React, { useState, useCallback, useEffect  } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import MyLocationIcon from '@mui/icons-material/MyLocation'; // GPS icon
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
//   const customIcon = L.divIcon({ html: iconMarkup, className: 'custom-icon' });
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
// const LeafletAddPetMap = ({ onLocationChange, location }) => {
//   const [position, setPosition] = useState([location.lat, location.lng]);
//   const handleUseMyLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setPosition([latitude, longitude]);
//         onLocationChange({ lat: latitude, lng: longitude });
//       },
//       () => {
//         alert("Couldn't get location. Please enable GPS.");
//       },
//     );
//   };
//   return (
//     <div style={{ position: 'relative' }}>
//       <MapContainer center={position} zoom={10} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <LocationMarker position={position} onLocationChange={setPosition} />
//         {/* Floating GPS Button inside the map */}
//           <Tooltip title="Izmantot esošo atrašanās vietu">
//         <IconButton
//         onClick={handleUseMyLocation}
//         sx={{
//           position: 'absolute',
//           top: 10,
//           right: 10,
//           backgroundColor: 'white',
//           zIndex: 1000,
//           boxShadow: 3,
//           '&:hover': { backgroundColor: '#f0f0f0' },
//         }}
//       >
//         <MyLocationIcon sx={{ color: '#007bff' }} />
//       </IconButton>
//       </Tooltip>
//       </MapContainer>
//     </div>
//   );
// };
// export default LeafletAddPetMap;
// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import MyLocationIcon from '@mui/icons-material/MyLocation';
// import { renderToStaticMarkup } from 'react-dom/server';
// import { IconButton, Tooltip } from '@mui/material';
// // Component to control the map center dynamically
// const MapController = ({ position }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (position) {
//       map.setView(position, 14, { animate: true }); // Center map with animation
//     }
//   }, [position, map]);
//   return null;
// };
// const LocationMarker = ({ position, onLocationChange }) => {
//   useMapEvents({
//     click(e) {
//       onLocationChange(e.latlng);
//     },
//   });
//   const iconMarkup = renderToStaticMarkup(
//     <LocationOnIcon style={{ color: '#D30A0A', fontSize: '2rem' }} />,
//   );
//   const customIcon = L.divIcon({ html: iconMarkup, className: 'custom-icon' });
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
// const LeafletAddPetMap = ({ onLocationChange, location }) => {
//   const [position, setPosition] = useState([location.lat, location.lng]);
//   const handleUseMyLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setPosition([latitude, longitude]);
//         onLocationChange({ lat: latitude, lng: longitude });
//       },
//       () => {
//         alert("Couldn't get location. Please enable GPS.");
//       },
//     );
//   };
//   return (
//     <div style={{ position: 'relative' }}>
//       <MapContainer center={position} zoom={10} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {/* Component to center the map dynamically */}
//         <MapController position={position} />
//         <LocationMarker position={position} onLocationChange={setPosition} />
//         {/* Floating GPS Button inside the map */}
//         <Tooltip title="Izmantot esošo atrašanās vietu">
//           <IconButton
//             onClick={handleUseMyLocation}
//             sx={{
//               position: 'absolute',
//               top: 10,
//               right: 10,
//               backgroundColor: 'white',
//               zIndex: 1000,
//               boxShadow: 3,
//               '&:hover': { backgroundColor: '#f0f0f0' },
//             }}
//           >
//             <MyLocationIcon sx={{ color: '#007bff' }} />
//           </IconButton>
//         </Tooltip>
//       </MapContainer>
//     </div>
//   );
// };
// export default LeafletAddPetMap;
// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import MyLocationIcon from '@mui/icons-material/MyLocation';
// import { renderToStaticMarkup } from 'react-dom/server';
// import { IconButton, Tooltip, useMediaQuery, Box } from '@mui/material';
// // MapController ensures the map updates only when necessary
// const MapController = ({ position }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (position) {
//       map.setView(position, 14, { animate: true });
//     }
//   }, [position, map]);
//   return null;
// };
// // Marker component that updates location on click & drag
// const LocationMarker = ({ position, onLocationChange }) => {
//   useMapEvents({
//     click(e) {
//       onLocationChange(e.latlng);
//     },
//   });
//   const iconMarkup = renderToStaticMarkup(
//     <LocationOnIcon style={{ color: '#D30A0A', fontSize: '2rem' }} />,
//   );
//   const customIcon = L.divIcon({ html: iconMarkup, className: 'custom-icon' });
//   return (
//     position && (
//       <Marker
//         position={position}
//         icon={customIcon}
//         draggable={true}
//         eventHandlers={{
//           dragend: (event) => {
//             const newPos = event.target.getLatLng();
//             onLocationChange({ lat: newPos.lat, lng: newPos.lng });
//           },
//         }}
//       />
//     )
//   );
// };
// // Main Leaflet Map component
// const LeafletAddPetMap = ({ onLocationChange, location }) => {
//   const [position, setPosition] = useState([location.lat, location.lng]);
//   // Sync location prop changes with position state
//   useEffect(() => {
//     if (location.lat && location.lng) {
//       setPosition([location.lat, location.lng]);
//     }
//   }, [location]);
//   const handleUseMyLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         const newPos = [latitude, longitude];
//         setPosition(newPos); // Update marker position
//         onLocationChange({ lat: latitude, lng: longitude }); // Update form state
//       },
//       () => {
//         alert("Couldn't get location. Please enable GPS.");
//       },
//     );
//   };
//     // Use MUI's useMediaQuery hook to detect small screen
//     const isSmallScreen = useMediaQuery('(max-width:600px)');
//   return (
//     <div style={{ position: 'relative' }}>
//       <Box
//         sx={{
//           height: isSmallScreen ? '240px' : '360px', // Smaller height on small screens
//           width: '100%',
//         }}
//       >
//         <MapContainer center={position} zoom={10} style={{ height: '100%', width: '100%' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <MapController position={position} />
//           <LocationMarker
//             position={position}
//             onLocationChange={(newPos) => {
//               setPosition([newPos.lat, newPos.lng]);
//               onLocationChange(newPos);
//             }}
//           />
//           {/* Floating GPS Button inside the map */}
//           <Tooltip title="Izmantot esošo atrašanās vietu">
//             <IconButton
//               onClick={handleUseMyLocation}
//               sx={{
//                 position: 'absolute',
//                 top: 10,
//                 right: 10,
//                 backgroundColor: 'white',
//                 zIndex: 1000,
//                 boxShadow: 3,
//                 '&:hover': { backgroundColor: '#f0f0f0' },
//               }}
//             >
//               <MyLocationIcon sx={{ color: '#007bff' }} />
//             </IconButton>
//           </Tooltip>
//         </MapContainer>
//       </Box>
//     </div>
//   );
// };
// export default LeafletAddPetMap;
import React, { useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, Marker, useMap, useMapEvents } from 'react-leaflet';

import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Box, IconButton, Tooltip, useMediaQuery } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import MapTiler SDK

// MapController ensures the map updates only when necessary
const MapController = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 14, { animate: true });
    }
  }, [position, map]);

  return null;
};

// Marker component that updates location on click & drag
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
            onLocationChange({ lat: newPos.lat, lng: newPos.lng });
          },
        }}
      />
    )
  );
};

// Main Leaflet Map component
const LeafletAddPetMap = ({ onLocationChange, location }) => {
  const [position, setPosition] = useState([location.lat, location.lng]);

  // Sync location prop changes with position state
  useEffect(() => {
    if (location.lat && location.lng) {
      setPosition([location.lat, location.lng]);
    }
  }, [location]);

  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPos = [latitude, longitude];
        setPosition(newPos); // Update marker position
        onLocationChange({ lat: latitude, lng: longitude }); // Update form state
      },
      () => {
        alert("Couldn't get location. Please enable GPS.");
      },
    );
  };

  // Use MUI's useMediaQuery hook to detect small screen
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <div style={{ position: 'relative' }}>
      <Box
        sx={{
          height: isSmallScreen ? '240px' : '360px', // Smaller height on small screens
          width: '100%',
        }}
      >
        <MapContainer center={position} zoom={10} style={{ height: '100%', width: '100%' }}>
          {/* MapTiler Layer */}
          <MapTilerLayerComponent />

          <MapController position={position} />

          <LocationMarker
            position={position}
            onLocationChange={(newPos) => {
              setPosition([newPos.lat, newPos.lng]);
              onLocationChange(newPos);
            }}
          />

          {/* Floating GPS Button inside the map */}
          <Tooltip title="Izmantot esošo atrašanās vietu">
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
        </MapContainer>
      </Box>
    </div>
  );
};

// MapTiler Layer component to use MapTiler maps
const MapTilerLayerComponent = () => {
  const map = useMap();

  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: 'zqJA9kfFpP2bX0hmViWr', // Use your MapTiler API Key here
      style: 'basic-v2', // You can change to other MapTiler styles, e.g. "streets", "satellite"
    });

    mtLayer.addTo(map); // Add MapTiler layer to the map

    return () => {
      map.removeLayer(mtLayer); // Clean up when the component is unmounted
    };
  }, [map]);

  return null;
};

export default LeafletAddPetMap;
