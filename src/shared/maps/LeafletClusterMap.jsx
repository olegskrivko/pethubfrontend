// LeafletClusterMap.js
// import React, { useState, useEffect, useRef } from 'react';
// import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet';
// import Chip from '@mui/material/Chip';
// import L from 'leaflet';
// import MarkerClusterGroup from 'react-leaflet-cluster';
// import 'leaflet/dist/leaflet.css';
// // import logo from '.vite.svg';
// import PetsIcon from '@mui/icons-material/Pets';
// import locationIcon from './location.svg';
// import dogIcon from './doglocation.png';
// import catIcon from './catlocation.png';
// import userLocationIconUrl from './userlocation.svg';

// // Custom icon for markers
// const userLocationIcon = new L.Icon({
//   iconUrl: userLocationIconUrl,
//   iconSize: new L.Point(44, 44),
// });

// // Custom icon for markers
// const customIcon = new L.Icon({
//   iconUrl: locationIcon,
//   iconSize: new L.Point(40, 47),
// });

// // Function to create custom cluster icons
// const createClusterCustomIcon = function (cluster) {
//   return new L.DivIcon({
//     html: `<span>${cluster.getChildCount()}</span>`,
//     className: 'custom-marker-cluster',
//     iconSize: L.point(33, 33, true),
//   });
// };

// // Component to update the map center and zoom level
// const MapUpdater = ({ centerCoords }) => {
//   console.log("centerCoords", centerCoords)
//   const map = useMap();

//   useEffect(() => {

//     if (centerCoords && centerCoords.length === 2) {
//       map.setView(centerCoords, 9);
//     }
//   }, [centerCoords, map]);

//   return null;
// };

// function LeafletClusterMap({ pets, centerCoords }) {
//   return (
//     <div>
//       <MapContainer
//         style={{ height: '400px' }}
//         center={[56.946285, 24.105078]} // Default center (Lat, Long)
//         zoom={7}
//         scrollWheelZoom={true}
//       >
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//          {/* <TileLayer
//           url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://carto.com">CartoDB</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         /> */}
//         <MapUpdater centerCoords={centerCoords} />
//         <MarkerClusterGroup
//           iconCreateFunction={createClusterCustomIcon}
//           maxClusterRadius={150}
//           spiderfyOnMaxZoom={false}
//           showCoverageOnHover={false}
//         >
//           {pets.map((pet) => (
//             // Ensure the coordinates are numbers and the order is [latitude, longitude]
//             pet.latitude && pet.longitude ? (
//               <Marker
//                 key={pet.id}
//                 icon={customIcon}
//                 position={[
//                   parseFloat(pet.latitude), // Ensure latitude is a float
//                   parseFloat(pet.longitude) // Ensure longitude is a float
//                 ]}
//                 // icon={customIcon}
//               >
//                 <Popup offset={[0, 5]}>
//                   <div style={{ textAlign: 'center' }}>
//                     <a href={`/pets/${pet.id}`}>
//                       <img
//                         src={pet.pet_image_1}
//                         alt={pet.id}
//                         style={{
//                           width: '120px',
//                           height: '120px',
//                           borderRadius: '50%',
//                           border: '3px solid white',
//                           objectFit: 'cover',
//                         }}
//                       />
//                     </a>
//                   </div>
//                 </Popup>
//               </Marker>
//             ) : null
//           ))}
//         </MarkerClusterGroup>
//       </MapContainer>
//     </div>
//   );
// }

// export default LeafletClusterMap;
// import React, { useState, useEffect } from 'react';
// import { MapContainer, Marker, TileLayer, Popup, useMap } from 'react-leaflet';
// import Chip from '@mui/material/Chip';
// import L from 'leaflet';
// import MarkerClusterGroup from 'react-leaflet-cluster';
// import 'leaflet/dist/leaflet.css';

// import locationIcon from './location.svg';
// import dogIconUrl from './doglocation.svg';
// import catIconUrl from './catlocation.svg';
// import userLocationIconUrl from './userlocation.svg';

// // Icons
// const defaultIcon = new L.Icon({
//   iconUrl: locationIcon,
//   iconSize: new L.Point(40, 47),
// });

// const dogIcon = new L.Icon({
//   iconUrl: dogIconUrl,
//   iconSize: new L.Point(40, 47),
// });

// const catIcon = new L.Icon({
//   iconUrl: catIconUrl,
//   iconSize: new L.Point(40, 47),
// });

// // const userLocationIcon = new L.Icon({
// //   iconUrl: userLocationIconUrl,
// //   iconSize: new L.Point(44, 44),
// // });
// const userPulseIcon = L.divIcon({
//   className: '',
//   html: `
//     <div class="user-location-wrapper">
//       <div class="user-location-core"></div>
//       <div class="user-location-pulse"></div>
//     </div>
//   `,
//   iconSize: [30, 30],
//   iconAnchor: [15, 15], // Centers the marker properly
// });



// // Custom cluster icon
// const createClusterCustomIcon = (cluster) => {
//   return new L.DivIcon({
//     html: `<span>${cluster.getChildCount()}</span>`,
//     className: 'custom-marker-cluster',
//     iconSize: L.point(33, 33, true),
//   });
// };

// // Updates map center when centerCoords change
// const MapUpdater = ({ centerCoords }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (centerCoords && centerCoords.length === 2) {
//       map.setView(centerCoords, 9);
//     }
//   }, [centerCoords, map]);

//   return null;
// };

// function LeafletClusterMap({ pets, centerCoords }) {
//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         setUserLocation([latitude, longitude]);
//       },
//       (err) => console.error('Location error:', err)
//     );
//   }, []);

//   // Helper: Choose icon by species
//   const getIconBySpecies = (species) => {
//     if (species === 1) return dogIcon;
//     if (species === 2) return catIcon;
//     return defaultIcon;
//   };

//   return (
//     <div>
//       <MapContainer
//         style={{ height: '400px' }}
//         center={[56.946285, 24.105078]}
//         zoom={7}
//         scrollWheelZoom
//       >
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <MapUpdater centerCoords={centerCoords} />

//         <MarkerClusterGroup
//           iconCreateFunction={createClusterCustomIcon}
//           maxClusterRadius={150}
//           spiderfyOnMaxZoom={false}
//           showCoverageOnHover={false}
//         >
//           {pets.map((pet) =>
//             pet.latitude && pet.longitude ? (
//               <Marker
//                 key={pet.id}
//                 icon={getIconBySpecies(pet.species)}
//                 position={[parseFloat(pet.latitude), parseFloat(pet.longitude)]}
//               >
//                 <Popup offset={[0, 5]}>
//                   <div style={{ textAlign: 'center' }}>
//                     <a href={`/pets/${pet.id}`}>
//                       <img
//                         src={pet.pet_image_1}
//                         alt={pet.id}
//                         style={{
//                           width: '120px',
//                           height: '120px',
//                           borderRadius: '50%',
//                           border: '3px solid white',
//                           objectFit: 'cover',
//                         }}
//                       />
//                     </a>
//                   </div>
//                 </Popup>
//               </Marker>
//             ) : null
//           )}

// {userLocation && (
//   <Marker position={userLocation} icon={userPulseIcon}>
//     <Popup offset={[0, 5]}>
//       <div
//         style={{
//           background: '#5B9BD5',
//           color: 'white',
//           padding: '6px 12px',
//           borderRadius: '12px',
//           fontSize: '14px',
//           fontWeight: 500,
//           boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
//           whiteSpace: 'nowrap',
//         }}
//       >
//         Tava atrašanās vieta
//       </div>
//     </Popup>
//   </Marker>
// )}

//         </MarkerClusterGroup>
//       </MapContainer>
//     </div>
//   );
// }

// export default LeafletClusterMap;
import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@maptiler/leaflet-maptilersdk'; // MapTiler plugin
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import locationIcon from './location.svg';
import dogIconUrl from './doglocation.svg';
import catIconUrl from './catlocation.svg';

// Icons
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
    if (centerCoords && centerCoords.length === 2) {
      map.setView(centerCoords, 9);
    }
  }, [centerCoords, map]);

  return null;
};

// ✅ MapTiler Layer (uses official SDK)
const MapTilerLayer = () => {
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


function LeafletClusterMap({ pets, centerCoords }) {
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

  const getIconBySpecies = (species) => {
    if (species === 1) return dogIcon;
    if (species === 2) return catIcon;
    return defaultIcon;
  };

  return (
    <div>
      <MapContainer
        style={{ height: '400px' }}
        center={[56.946285, 24.105078]}
        zoom={7}
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
          {pets.map((pet) =>
            pet.latitude && pet.longitude ? (
              <Marker
                key={pet.id}
                icon={getIconBySpecies(pet.species)}
                position={[parseFloat(pet.latitude), parseFloat(pet.longitude)]}
              >
                <Popup offset={[0, 5]}>
                  <div style={{ textAlign: 'center' }}>
                    <a href={`/pets/${pet.id}`}>
                      <img
                        src={pet.pet_image_1}
                        alt={pet.id}
                        style={{
                          width: '120px',
                          height: '120px',
                          borderRadius: '50%',
                          border: '3px solid white',
                          objectFit: 'cover',
                        }}
                      />
                    </a>
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

export default LeafletClusterMap;

