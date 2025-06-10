// import React, { useState, useCallback } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import { renderToStaticMarkup } from 'react-dom/server';
// import CustomAlert from '../alert/CustomAlert';

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

// const LeafletSubscribeMap = ({ onLocationChange }) => {
//   const [position, setPosition] = useState([56.946285, 24.105078]);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [solutionMessage, setSolutionMessage] = useState(null);

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
//         <CustomAlert errorMessage={errorMessage} solutionMessage={solutionMessage} />
//       )}
//       <button onClick={handleUseMyLocation}>Use My Location</button>
//       <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <LocationMarker position={position} onLocationChange={handleLocationChange} />
//       </MapContainer>
//     </div>
//   );
// };

// export default LeafletSubscribeMap;
import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { renderToStaticMarkup } from 'react-dom/server';
//import CustomAlert from '../alert/CustomAlert'; // Ensure correct path
import { Grid, Box, Typography, Avatar, TextField, Paper, Button } from '@mui/material';

// const LocationMarker = ({ position, onLocationChange }) => {
//   const map = useMapEvents({
//     click(e) {
//       onLocationChange(e.latlng);
//     },
//     dragend(e) {
//       const newPos = e.target.getLatLng();
//       onLocationChange(newPos);
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

const LocationMarker = ({ position, onLocationChange }) => {
  const map = useMapEvents({
    click(e) {
      onLocationChange(e.latlng);
    },
  });

  const iconMarkup = renderToStaticMarkup(
    <LocationOnIcon style={{ color: '#D30A0A', fontSize: '2rem' }} />,
  );
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

const LeafletSubscribeMap = ({ onLocationChange }) => {
 
  const [position, setPosition] = useState([56.946285, 24.105078]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [solutionMessage, setSolutionMessage] = useState(null);

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
            setSolutionMessage(
              'Please enable GPS and allow location access in your browser settings.',
            );
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
            setSolutionMessage(
              'An unknown error occurred while retrieving your location. Please try again.',
            );
            break;
          default:
            setErrorMessage('An Error Occurred');
            setSolutionMessage('An unexpected error occurred. Please try again.');
        }
        // Fallback to hardcoded initial value
        const fallbackPosition = [56.946285, 24.105078];
        setPosition(fallbackPosition);
        onLocationChange({ lat: fallbackPosition[0], lng: fallbackPosition[1] });
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

  return (
    <div>
      {errorMessage && (
        // <CustomAlert errorMessage={errorMessage} solutionMessage={solutionMessage} />
        <p>Error</p>
      )}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleUseMyLocation} fullWidth>
          getCurrentLocation
          </Button>
        </Grid>
      </Grid>
      {/* <button onClick={handleUseMyLocation}>Use My Location</button> */}
      <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker position={position} onLocationChange={handleLocationChange} />
      </MapContainer>
    </div>
  );
};

export default LeafletSubscribeMap;