import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Import Latvian locale
import { ContactSupportOutlined } from '@mui/icons-material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import DownloadIcon from '@mui/icons-material/Download';
import FlagIcon from '@mui/icons-material/Flag';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import PetsIcon from '@mui/icons-material/Pets';
import ShareIcon from '@mui/icons-material/Share';
import WifiTetheringErrorIcon from '@mui/icons-material/WifiTetheringError';
import { Paper, Stack } from '@mui/material';
// to extract the pet ID from the URL
import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import Lottie from 'lottie-react';
import moment from 'moment';
import 'moment/locale/lv';
import { useSnackbar } from 'notistack';

import spinnerAnimation from '../../../assets/Animation-1749725645616.json';
import { useAuth } from '../../../contexts/AuthContext';
// import LeafletPetDetailsMap from '../../../components/LeafletPetDetailsMap'
import LeafletPetDetailsMapNew from '../../../shared/maps/LeafletPetDetailsMapNew';
import IconLabelTabs from '../components/IconLabelTabs';
import ImageCarousel from '../components/ImageCarousel';
import PetAttributes from '../components/PetAttributes';
import SendMessage from '../components/SendMessage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PetDetailsPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [pet, setPet] = useState(null);
  const [sightings, setSightings] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const [zoomPosition, setZoomPosition] = useState(null);
  // new states for sending message
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  // const [locationAdded, setLocationAdded] = useState(false);
  const [isLocationAdded, setIsLocationAdded] = useState(false);
  const [coords, setCoords] = useState({ lat: null, lng: null });

  // Function to receive data from child
  const handleChildData = (data) => {
    setMarkerPosition(data);
    console.log('markerPosition parent', data);
  };
  //const [coords, setCoords] = useState({ lat: 56.9496, lng: 24.1052 });
  const imageList = pet
    ? [pet.pet_image_1, pet.pet_image_2, pet.pet_image_3, pet.pet_image_4].filter((img) => img) // Ensure only valid images are used
    : [];

  const handleToggle = () => {
    setIsFormOpen((prev) => !prev); // Toggle form visibility
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleZoomMap = (lat, lng) => {
    if (lat && lng) {
      console.log('aaa');
      console.log(`Zooming to: ${lat}, ${lng}`);
      setZoomPosition({ lat, lng });
    }
  };
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: pet.status_display,
          text: pet.breed_display,
          url: window.location.href,
        });
      } else {
        // Fallback: Copy URL to clipboard
        navigator.clipboard.writeText(window.location.href);
        enqueueSnackbar('Link copied to clipboard!', { variant: 'success' });
      }
    } catch (error) {
      console.error('Error sharing pet:', error);
      enqueueSnackbar('Error sharing pet. Please try again later.', {
        variant: 'error',
      });
    }
  };

  const handleReport = async () => {
    console.log('Reported');
  };
  // const handleFileInputChange = (file) => {
  //   const previewUrl = URL.createObjectURL(file); // Create preview URL for the file
  //   setFile(file); // Set the file state
  //   setFilePreview(previewUrl); // Store the preview URL
  // };

  // const handleFileInputChange = (file) => {
  //   const previewUrl = URL.createObjectURL(file);
  //   if (filePreview) URL.revokeObjectURL(filePreview); // cleanup previous
  //   setFile(file);
  //   setFilePreview(previewUrl);
  // };
  // const handleFileInputChange = (file) => {
  //   if (!file) return;

  //   if (!file.type.startsWith('image/')) {
  //     alert('Please upload a valid image file.');
  //     return;
  //   }

  //   if (file.size > 5 * 1024 * 1024) {
  //     alert('Image is too large. Max size is 5MB.');
  //     return;
  //   }

  //   if (filePreview) {
  //     URL.revokeObjectURL(filePreview);
  //   }

  //   try {
  //     const previewUrl = URL.createObjectURL(file);
  //     setFile(file);
  //     setFilePreview(previewUrl);
  //   } catch (err) {
  //     console.warn('Preview issue on mobile:', err);
  //     setFile(file);
  //     setFilePreview(null);
  //   }
  // };
  const handleFileInputChange = (file) => {
    setFile(file);
    setFilePreview(null); // Optional: keep for compatibility, or remove
  };
  // const handleFileInputChange = (file) => {
  //   if (!file) return;

  //   // Allowed MIME types (you can extend this list)
  //   const allowedTypes = [
  //     'image/jpeg',
  //     'image/png',
  //     'image/gif',
  //     'image/webp',
  //     'image/heic',
  //     'image/heif',
  //     'image/jpg',
  //   ];

  //   const maxSizeMB = 20; // Increased max size

  //   if (!allowedTypes.includes(file.type)) {
  //     alert(`Unsupported file format: ${file.type}`);
  //     return;
  //   }

  //   if (file.size > maxSizeMB * 1024 * 1024) {
  //     alert(`File is too large. Max size is ${maxSizeMB}MB.`);
  //     return;
  //   }

  //   try {
  //     const previewUrl = URL.createObjectURL(file);
  //     if (filePreview) URL.revokeObjectURL(filePreview); // Cleanup
  //     setFile(file);
  //     setFilePreview(previewUrl);
  //   } catch (error) {
  //     console.warn('Could not generate preview. Showing filename only.');
  //     setFile(file);
  //     setFilePreview(null);
  //   }
  // };

  // const handleFileInputChange = (file) => {
  //   if (!file) return;

  //   if (!file.type.startsWith('image/')) {
  //     alert('Please upload a valid image file.');
  //     return;
  //   }

  //   if (file.size > 5 * 1024 * 1024) {
  //     alert('Image is too large. Max size is 5MB.');
  //     return;
  //   }

  //   // Revoke previous preview
  //   if (filePreview) {
  //     URL.revokeObjectURL(filePreview);
  //   }

  //   try {
  //     const previewUrl = URL.createObjectURL(file);
  //     setFile(file);
  //     setFilePreview(previewUrl);
  //   } catch (err) {
  //     console.warn('Could not generate preview (possibly mobile):', err);
  //     setFile(file);
  //     setFilePreview(null); // fallback, no preview
  //   }
  // };

  // Function to trigger "Add Location" in the map
  const handleAddLocation = () => {
    console.log('parent location');
    setIsLocationAdded(true);
  };

  const handleRemoveLocation = () => {
    console.log('Removed location');
    console.log('parent location setIslocationadded false');
    setIsLocationAdded(false);
  };

  const handleMarkerDrag = (newPosition) => {
    setMarkerPosition(newPosition);
    console.log('Marker moved to:', newPosition);
  };

  const handleSendMessage = async () => {
    const hasMessage = !!message.trim();
    const hasImage = !!file;
    const hasCoords =
      Array.isArray(markerPosition) &&
      markerPosition.length === 2 &&
      markerPosition.every((coord) => !isNaN(parseFloat(coord)));

    // 1. Message is always required
    if (!hasMessage) {
      alert('Please enter a message.');
      return;
    }

    // 2. If image is included, coords are also required
    if (hasImage && !hasCoords) {
      alert('Please add the location where the image was taken.');
      return;
    }

    // if (!message.trim()) return;
    // if (!message && !file) {
    //   alert('Please enter a message or upload an image.');
    //   return;
    // }
    const formData = new FormData();
    //formData.append('message', message);  // Assuming 'message' is included

    if (file) {
      formData.append('image', file);
    }
    // Only add latitude and longitude if they exist and are valid
    if (markerPosition && markerPosition.length === 2) {
      const latitude = parseFloat(markerPosition[0]).toFixed(6);
      const longitude = parseFloat(markerPosition[1]).toFixed(6);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
      } else {
        console.warn('⚠️ Invalid latitude or longitude. Skipping coordinates.');
      }
    }

    formData.append('status', 2); // Replace with the actual status (e.g., '3' for Seen)
    formData.append('notes', message);
    formData.append('reporter', user.userId); // Optional

    const accessToken = localStorage.getItem('access_token'); // Retrieve the access token from localStorage
    if (!accessToken) {
      setError('You must be logged in to view shelters.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/pets/${id}/pet-sightings/?format=json`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add Authorization header with token
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Message sent:', result);

      // Reset form after sending
      setMessage('');
      setFile(null);
      setFilePreview(null);
      // setLocationAdded(false);
      setMarkerPosition(null);
      setIsFormOpen(false);
      setIsLocationAdded(false);

      // ✅ Show success toast
      enqueueSnackbar('Message sent successfully!', { variant: 'success' });

      fetchPetSightings();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/pets/${id}/?format=json`);
        const data = await response.json();

        if (data && Object.keys(data).length > 0) {
          setPet(data); // pet is loaded
        } else {
          setPet(null); // no pet data available
        }
      } catch (err) {
        setError('Failed to fetch pet details. Please try again later.');
        setPet(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchFavoriteStatus = async () => {
      // If the user is not logged in, skip favorite fetch
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/accounts/favorite-pets/${id}/`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.is_favorite);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };
    fetchPetDetails();
    fetchFavoriteStatus();
  }, [id]); // Run the effect when the pet ID changes

  const fetchPetSightings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/pets/${id}/pet-sightings/?format=json`);
      const data = await response.json();
      if (data) {
        setSightings(data); // Store the fetched sightings
        console.log('Sightings fetched:', data);
      } else {
        throw new Error('No sightings found');
      }
    } catch (err) {
      setError('Failed to fetch pet sightings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPetSightings(); // Automatically fetch sightings on initial load
  }, [id]);

  const handleFavorite = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert('You must be logged in to manage favorites.');
      return;
    }

    const url = `${API_BASE_URL}/api/accounts/favorite-pets/${id}/`;
    try {
      const response = await fetch(url, {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
        enqueueSnackbar(isFavorite ? 'Pet removed from favorites' : 'Pet added to favorites', { variant: 'success' });
      } else {
        const errorData = await response.json();
        enqueueSnackbar(errorData.detail || 'Something went wrong', {
          variant: 'error',
        });
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      enqueueSnackbar('Error updating favorite status. Please try again later.', { variant: 'error' });
    }
  };

  const isStillLoading = loading || (!pet && !error);

  if (isStillLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          // background: 'linear-gradient(135deg, #6a1b9a, #9c27b0)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ width: 180, height: 180 }}>
          <Lottie animationData={spinnerAnimation} loop autoplay />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  if (!pet) {
    // No pet found
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Alert severity="info">No pet details available</Alert>
      </div>
    );
  }

  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <ImageCarousel pet={pet} images={imageList.filter(Boolean)} />
          {/* 👉 Action Buttons BELOW the image */}
          <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 1 }}>
            {/* Add to Favorites */}
            <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
              <IconButton onClick={handleFavorite} style={{ backgroundColor: '#f7f9fd' }}>
                {isFavorite ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon color="primary" />}
              </IconButton>
            </Tooltip>

            {/* Download */}
            <Tooltip title="Download Poster">
              <Link to={`/pets/${id}/poster`}>
                <IconButton style={{ backgroundColor: '#f7f9fd' }}>
                  <DownloadIcon color="primary" />
                </IconButton>
              </Link>
            </Tooltip>

            {/* Share */}
            <Tooltip title="Share">
              <IconButton onClick={handleShare} style={{ backgroundColor: '#f7f9fd' }}>
                <ShareIcon color="primary" />
              </IconButton>
            </Tooltip>

            {/* Report */}
            <Tooltip title="Report">
              <IconButton onClick={handleReport} disabled style={{ backgroundColor: '#f7f9fd' }}>
                <FlagIcon color="primary" />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        {/* Attributes */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <PetAttributes pet={pet} />
        </Grid>
      </Grid>

      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <LeafletPetDetailsMapNew
          pet={pet}
          sightings={sightings}
          zoomPosition={zoomPosition}
          isLocationAdded={isLocationAdded}
          setMarkerPosition={setMarkerPosition}
          onRemoveLocation={handleRemoveLocation}
          onMarkerDrag={handleMarkerDrag}
          markerPosition={markerPosition}
          sendDataToParent={handleChildData}
          setCoords={setCoords}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        {/* <SendMessage
          pet={pet}
          message={message}
          onMessageChange={setMessage}
          onSendMessage={handleSendMessage}
          onUploadImage={handleFileInputChange}
          filePreview={filePreview}
          onAddLocation={handleAddLocation}
          onRemoveLocation={handleRemoveLocation}
          isLocationAdded={isLocationAdded}
          locationAdded={locationAdded}
        /> */}
        <SendMessage
          message={message}
          onMessageChange={setMessage}
          onSendMessage={handleSendMessage}
          onUploadImage={handleFileInputChange}
          file={file} // 👉 pass this new prop
          filePreview={filePreview}
          onAddLocation={handleAddLocation}
          onRemoveLocation={handleRemoveLocation}
          isLocationAdded={isLocationAdded}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <IconLabelTabs pet={pet} sightings={sightings} onZoomMap={handleZoomMap} />
      </Grid>
    </Container>
  );
};

export default PetDetailsPage;
