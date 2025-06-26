import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Link, useParams } from 'react-router-dom';

// Import Latvian locale
import { ContactSupportOutlined } from '@mui/icons-material';
import {
  AddLocationAlt as AddLocationAltIcon,
  AddPhotoAlternate as AddPhotoAlternateIcon,
  Send as SendIcon,
} from '@mui/icons-material';
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
  TextField,
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
import UploadTest from '../../UploadTest';
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [petImageFile, setPetImageFile] = useState(null);
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);
    console.log(selectedFile);
    // axios.post('api/uploadfile', formData);
  };
  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log('File dropped/selected:', file);
    if (file) {
      handleFileInputChange(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp'],
    },
    maxFiles: 1,
    multiple: false,
  });

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

  const handleFileInputChange = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image is too large. Max size is 5MB.');
      return;
    }

    // Revoke previous preview
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }

    try {
      const previewUrl = URL.createObjectURL(file);
      setFile(file);
      setFilePreview(previewUrl);
    } catch (err) {
      console.warn('Could not generate preview (possibly mobile):', err);
      setFile(file);
      setFilePreview(null); // fallback, no preview
    }
  };

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

    // Prefer petImageFile (from UploadTest), fallback to file (from other input)
    if (petImageFile) {
      formData.append('image', petImageFile, petImageFile.name);
    } else if (file) {
      formData.append('image', file, file.name);
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

    console.log('User:', user);
    console.log('Access token exists:', !!accessToken);
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/pets/${id}/pet-sightings/?format=json`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add Authorization header with token
          // Don't set Content-Type for FormData - browser will set it automatically
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', response.status, errorText);
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
      enqueueSnackbar('Error sending message. Please try again.', { variant: 'error' });
    }
  };

  const handlePetImageSelected = (file) => {
    setPetImageFile(file);
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
    <Container maxWidth="lg" disableGutters>
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
            {/* <Tooltip title="Report">
              <IconButton onClick={handleReport} disabled style={{ backgroundColor: '#f7f9fd' }}>
                <FlagIcon color="primary" />
              </IconButton>
            </Tooltip> */}
          </Box>
        </Grid>
        {/* Attributes */}
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <PetAttributes pet={pet} />
        </Grid>
      </Grid>
      <Card
        sx={{
          mt: 2,
          p: { xs: 1, sm: 2 },
          borderRadius: 3,
          background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap={1.5}>
          {/* Status text - primary color */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: '0.8rem',
              color: 'primary.main',
              textTransform: 'uppercase',
              letterSpacing: 0.8,
            }}
          >
            {pet.status_display}
          </Typography>

          {/* Arrow icon */}
          <DoubleArrowIcon
            sx={{
              color: '#00b5ad',
              fontSize: 20,
              opacity: 0.7,
            }}
          />

          {/* Final status text - conditional color */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: '0.8rem',
              color: pet.final_status === 1 ? 'info.main' : 'primary.main',
              textTransform: 'uppercase',
              letterSpacing: 0.8,
            }}
          >
            {pet.final_status_display}
          </Typography>
        </Box>
      </Card>
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
      <UploadTest onFileSelected={handlePetImageSelected} />
      {/* <Card
        sx={{
          p: { xs: 1, sm: 2 },
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f5fafd 0%, #eef8fb 100%)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            background: 'linear-gradient(135deg, #ebf8fc 0%, #dff2f7 100%)',
          },
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <StatusBlock icon={<FlagIcon />} label={pet.status_display} />

          <DoubleArrowIcon />

          <StatusBlock icon={<FlagIcon />} label={pet.final_status_display} />
        </Box>
      </Card> */}

      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        {/* Simple file upload like UploadTest */}
        <Card
          sx={{
            p: { xs: 1, sm: 2 },
            borderRadius: 3,
            background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#16477c' }}>
              PIEVIENOT ZIŅOJUMU
            </Typography>
          </Box>

          {/* Message input */}
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Ierakstiet savu komentāru šeit..."
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Box>

          {/* Simple file input like UploadTest - COMPLETELY ISOLATED */}
          <div style={{ marginBottom: '16px' }}>
            <p style={{ marginBottom: '8px', color: '#666' }}>Pievienot foto:</p>
            <div
              {...getRootProps()}
              style={{
                border: '2px dashed #00b3a4',
                borderRadius: '8px',
                padding: '20px',
                textAlign: 'center',
                backgroundColor: isDragActive ? '#e8f6f9' : '#f8f9fa',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minHeight: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <input {...getInputProps()} />
              <AddPhotoAlternateIcon
                style={{
                  fontSize: '32px',
                  color: '#00b3a4',
                  marginBottom: '8px',
                }}
              />
              {isDragActive ? (
                <p style={{ margin: 0, color: '#00b3a4', fontWeight: 'bold' }}>Drop the image here...</p>
              ) : (
                <div>
                  <p style={{ margin: '0 0 4px 0', color: '#666', fontWeight: '500' }}>
                    Drag & drop an image here, or click to select
                  </p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>Supports: JPG, PNG, GIF, BMP, WebP</p>
                </div>
              )}
            </div>
          </div>

          {/* File details */}
          {file && (
            <div
              style={{
                marginBottom: '16px',
                padding: '16px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            >
              <p>
                <strong>Selected File:</strong> {file.name}
              </p>
              <p>
                <strong>File Type:</strong> {file.type}
              </p>
              <p>
                <strong>File Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}

          {/* File preview */}
          {filePreview && (
            <Box sx={{ mb: 2 }}>
              <img
                src={filePreview}
                alt="Preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                }}
              />
            </Box>
          )}

          {/* Action buttons */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              {!isLocationAdded ? (
                <Tooltip title="Pievienot atrašanās vietu">
                  <IconButton onClick={handleAddLocation} sx={{ backgroundColor: '#00b3a4', color: '#fff', mr: 1 }}>
                    <AddLocationAltIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Noņemt atrašanās vietu">
                  <IconButton onClick={handleRemoveLocation} sx={{ backgroundColor: '#00b3a4', color: '#fff', mr: 1 }}>
                    <AddLocationAltIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            <Tooltip title="Aizsūtīt ziņu">
              <IconButton
                onClick={handleSendMessage}
                sx={{
                  backgroundColor: '#00b3a4',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#007c73' },
                }}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <IconLabelTabs pet={pet} sightings={sightings} onZoomMap={handleZoomMap} />
      </Grid>
      {petImageFile && (
        <div style={{marginTop: 8}}>
          <h4>Selected File for Pet:</h4>
          <p>File Name: {petImageFile.name}</p>
          <p>File Type: {petImageFile.type}</p>
          <p>Last Modified: {petImageFile.lastModifiedDate?.toDateString()}</p>
        </div>
      )}
    </Container>
  );
};

export default PetDetailsPage;
