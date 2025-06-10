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
// console.log("position", position)
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

// const LeafletEditPetMap = ({ onLocationChange, location }) => {
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

    
//         <MapController position={position} />

//         <LocationMarker position={position} onLocationChange={setPosition} />

    
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

// export default LeafletEditPetMap;
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { renderToStaticMarkup } from 'react-dom/server';
import { IconButton, Tooltip } from '@mui/material';

// Component to control the map center dynamically
const MapController = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 14, { animate: true }); // Center map with animation
    }
  }, [position, map]);

  return null;
};

const LocationMarker = ({ position, onLocationChange, isEditable }) => {
  useMapEvents({
    // Disable map click functionality (can be enabled by setting isEditable to true)
    click(e) {
      if (isEditable) onLocationChange(e.latlng);
    },
  });

  const iconMarkup = renderToStaticMarkup(
    <LocationOnIcon style={{ color: '#D30A0A', fontSize: '2rem' }} />,
  );
  const customIcon = L.divIcon({ html: iconMarkup, className: 'custom-icon' });

  return (
    position && (
      <Marker
        position={position}
        icon={customIcon}
        draggable={isEditable} // Disable dragging if isEditable is false
        eventHandlers={{
          dragend: (event) => {
            if (isEditable) {
              const newPos = event.target.getLatLng();
              onLocationChange(newPos);
            }
          },
        }}
      />
    )
  );
};

const LeafletEditPetMap = ({ onLocationChange, location, isEditable = false }) => {
  const [position, setPosition] = useState([location.lat, location.lng]);

  const handleUseMyLocation = () => {
    if (!isEditable) return; // Do nothing if editing is disabled
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        onLocationChange({ lat: latitude, lng: longitude });
      },
      () => {
        alert("Couldn't get location. Please enable GPS.");
      },
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer center={position} zoom={10} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <MapController position={position} />
        
        <LocationMarker position={position} onLocationChange={setPosition} isEditable={isEditable} />

        {/* <Tooltip title="Izmantot esošo atrašanās vietu">
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
            disabled={!isEditable} // Disable button if editing is disabled
          >
            <MyLocationIcon sx={{ color: '#007bff' }} />
          </IconButton>
        </Tooltip> */}
      </MapContainer>
    </div>
  );
};

export default LeafletEditPetMap;
