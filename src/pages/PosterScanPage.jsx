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
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.error || 'Failed to scan poster.');
        }

        const data = await response.json();

        const petId = data.pet_id;

        if (!petId) {
          throw new Error('No pet ID returned from scan.');
        }

        navigate(`/pets/${petId}`);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Something went wrong.');
      }
    };

    if (!posterId) {
      setError('Invalid poster ID.');
      return;
    }

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
          scanPoster();
        },
      );
    } else {
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
