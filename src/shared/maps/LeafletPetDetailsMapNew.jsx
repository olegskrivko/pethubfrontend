import React, { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Circle, MapContainer, Marker, Popup, useMap } from 'react-leaflet';

// Import Latvian locale
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PetsIcon from '@mui/icons-material/Pets';
import Chip from '@mui/material/Chip';
import { format } from 'date-fns';
import { lv } from 'date-fns/locale';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import moment from 'moment';
import 'moment/locale/lv';
import PropTypes from 'prop-types';

import SendMessage from '../../pages/pets/components/SendMessage';

// MapTiler integration

// Define different search radius distances
const getSearchRadii = (petType) =>
  petType === 'Suns'
    ? [10000, 5000, 2000, 500] // Dogs: Large to Small
    : [3000, 1000, 500, 100]; // Cats: Large to Small

const SearchCircles = ({ center, petType }) => {
  const map = useMap(); // Get map instance
  const searchRadii = getSearchRadii(petType);

  return (
    <>
      {searchRadii.map((radius, index) => (
        <Circle
          key={index}
          center={center}
          radius={radius}
          pathOptions={{
            color: '#87CEEB',
            fillColor: '#87CEEB',
            fillOpacity: 0.2,
            weight: 2,
          }}
          eventHandlers={{
            click: (e) => {
              L.popup()
                .setLatLng(e.latlng)
                .setContent(
                  `
                  <div style="
                    background: #22badf; 
                    color: white; 
                    padding: 6px 10px; 
                    border-radius: 10px;
                    font-size: 14px;
                    font-weight: medium;
                    text-align: center;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
                  ">Attālums: ${radius / 1000} km
                  </div>
                `,
                )
                .openOn(map);
            },
          }}
        />
      ))}
    </>
  );
};

const createCustomIcon = (color) =>
  new L.DivIcon({
    html: renderToStaticMarkup(<LocationOnIcon style={{ fontSize: 40, color }} />),
    className: 'custom-div-icon',
    iconSize: [40, 47],
    iconAnchor: [20, 47],
    popupAnchor: [0, -47],
  });

const createCustomMainIcon = (color) =>
  new L.DivIcon({
    html: renderToStaticMarkup(<PetsIcon style={{ fontSize: 40, color }} />),
    className: 'custom-div-icon',
    iconSize: [40, 47],
    iconAnchor: [20, 47],
    popupAnchor: [0, -47],
  });

const createCustomAddNewIcon = (color) =>
  new L.DivIcon({
    html: renderToStaticMarkup(<AddLocationAltIcon style={{ fontSize: 40, color }} />),
    className: 'custom-div-icon',
    iconSize: [40, 47],
    iconAnchor: [20, 47],
    popupAnchor: [0, -47],
  });

const MapWrapper = ({ onMapLoad }) => {
  const map = useMap();
  useEffect(() => {
    onMapLoad(map);
  }, [map, onMapLoad]);

  return null;
};

// MapTiler Layer (with MapTiler SDK)
const MapTilerLayerComponent = () => {
  const map = useMap();

  useEffect(() => {
    const mtLayer = new MaptilerLayer({
      apiKey: 'zqJA9kfFpP2bX0hmViWr',
      style: 'basic-v2', // Change this for other map styles
    });

    mtLayer.addTo(map);

    return () => {
      map.removeLayer(mtLayer);
    };
  }, [map]);

  return null;
};

function LeafletPetDetailsMapNew({
  pet,
  sightings,
  markerPosition,
  onMapLoad,
  setMarkerPosition,
  zoomPosition,
  onRemoveLocation,
  isLocationAdded,
  handleAddLocation,
  sendDataToParent,
  handleZoomMap,
  onAddLocation,
}) {
  const mainIcon = createCustomMainIcon('#0077B6');
  const historyIcon = createCustomIcon('crimson');
  const newMarkerIcon = createCustomAddNewIcon('#dc004e');
  const mapRef = useRef();

  // Handle click function that sends coordinates to parent
  const handleClick = (lat, lng) => {
    sendDataToParent([lat, lng]); // Sending lat and lng as an array
  };

  // Handle marker removal from parent
  useEffect(() => {
    if (!isLocationAdded) {
      setMarkerPosition(null);
    }
  }, [onRemoveLocation]);

  const defaultCenter = [56.9496, 24.1052]; // Coordinates for Riga, Latvia
  const [newMarker, setNewMarker] = useState(null);
  const defaultZoom = 14;
  const radius = 5000; // Example: 5km radius

  const center = pet.latitude && pet.longitude ? [parseFloat(pet.latitude), parseFloat(pet.longitude)] : defaultCenter;

  const onMapLoadHandler = (mapInstance) => {
    mapRef.current = mapInstance;
    if (onMapLoad) {
      onMapLoad(mapInstance);
    }
  };

  useEffect(() => {
    if (mapRef.current && zoomPosition && zoomPosition.lng && zoomPosition.lat) {
      mapRef.current.setView([zoomPosition.lat, zoomPosition.lng], 14);
    }
  }, [zoomPosition]);

  useEffect(() => {
    if (isLocationAdded && mapRef.current) {
      const center = mapRef.current.getCenter();
      setNewMarker([center.lat, center.lng]);
      handleClick(center.lat, center.lng);
    }
  }, [isLocationAdded]);

  return (
    <>
      <MapContainer
        style={{ height: '400px', width: '100%' }}
        center={center}
        zoom={defaultZoom}
        scrollWheelZoom={true}
      >
        <MapTilerLayerComponent />

        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable={true}
            icon={newMarkerIcon}
            eventHandlers={{
              dragend: (e) => {
                const newPos = [e.target.getLatLng().lat, e.target.getLatLng().lng];
                setMarkerPosition(newPos);
                sendDataToParent(newPos);
              },
            }}
          >
            <Popup offset={[0, 5]}>
              <Chip size="small" label="Jauna lokācija" style={{ backgroundColor: '#fff1f1', color: '#6d0202' }} />
            </Popup>
          </Marker>
        )}

        {/* {sightings && sightings.map((sighting, index) => {
          const petPosition = [
            parseFloat(sighting.latitude),
            parseFloat(sighting.longitude)
          ]; */}
        {sightings &&
          sightings.map((sighting, index) => {
            const lat = parseFloat(sighting.latitude);
            const lng = parseFloat(sighting.longitude);

            // Skip rendering if coordinates are missing or invalid
            if (!sighting.latitude || !sighting.longitude || isNaN(lat) || isNaN(lng)) {
              return null;
            }

            const petPosition = [lat, lng];
            return (
              <Marker key={index} position={petPosition} icon={historyIcon}>
                <Popup offset={[0, 5]}>
                  <div style={{ textAlign: 'center' }}>
                    {sighting.pet_image && (
                      <img
                        src={sighting.pet_image}
                        alt={sighting.id}
                        style={{
                          width: '120px',
                          height: '120px',
                          borderRadius: '50%',
                          border: '3px solid white',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      backgroundColor: '#5B9BD5',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '1rem',
                      color: 'white',
                      fontWeight: '500',
                    }}
                  >
                    {sighting.status_display}
                    {/* {sighting.status_display} {format(sighting.event_occurred_at, "d. MMMM yyyy", { locale: lv })} */}
                  </div>
                </Popup>
              </Marker>
            );
          })}

        <Marker position={[parseFloat(pet.latitude), parseFloat(pet.longitude)]} icon={mainIcon}>
          <Popup offset={[0, 5]}>
            <div style={{ textAlign: 'center' }}>
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
            </div>
          </Popup>
        </Marker>

        <MapWrapper onMapLoad={onMapLoadHandler} />
      </MapContainer>
    </>
  );
}

export default LeafletPetDetailsMapNew;
