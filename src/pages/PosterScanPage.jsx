// import { useEffect, useState } from 'react';
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// function PosterScanPage({ posterId }) {
//   const [locationSaved, setLocationSaved] = useState(false);
//   const [scans, setScans] = useState(null);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     // Increment scan count immediately
//     fetch(`${API_BASE_URL}/pets/posters/${posterId}/scan/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setScans(data.scans);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//     // Try to get geolocation
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           // Send location to backend
//           fetch(`${API_BASE_URL}/pets/posters/${posterId}/set-location/`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             }),
//           })
//             .then((res) => res.json())
//             .then(() => {
//               setLocationSaved(true);
//             })
//             .catch((err) => {
//               console.error(err);
//               setError('Failed to save location.');
//             });
//         },
//         (err) => {
//           console.error(err);
//           setError('Location permission denied or unavailable.');
//         },
//       );
//     } else {
//       setError('Geolocation is not supported by your browser.');
//     }
//   }, [posterId]);
//   return (
//     <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
//       <h1>Thank you for scanning this poster!</h1>
//       {scans !== null && <p>This poster has been scanned {scans} times.</p>}
//       {locationSaved && <p>Location of this poster was successfully saved.</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// }
// export default PosterScanPage;
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PosterScanPage = () => {
  const { posterId } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  useEffect(() => {
    const scanPoster = async (coords = null) => {
      try {
        const payload = coords ? { latitude: coords.latitude, longitude: coords.longitude } : {};

        const response = await fetch(`${API_BASE_URL}/api/pets/posters/${posterId}/scan/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error('Failed to scan poster.');
        }

        const data = await response.json();

        // backend returns { success: true, pet_id: 123 }
        const petId = data.pet_id;

        // redirect user to the pet page
        navigate(`/pets/${petId}`);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    // Try to get location first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          scanPoster({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn('Could not get location:', err);
          // still scan without coordinates
          scanPoster();
        },
      );
    } else {
      // browser does not support geolocation
      scanPoster();
    }
  }, [posterId, navigate]);

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box textAlign="center" mt={8}>
      <CircularProgress />
      <Typography variant="body1" mt={2}>
        Apstrādā skenēšanu...
      </Typography>
    </Box>
  );
};

export default PosterScanPage;
