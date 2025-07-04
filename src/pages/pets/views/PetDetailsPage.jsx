import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

// Import Latvian locale
import { ContactSupportOutlined } from '@mui/icons-material';
import {
  AddLocationAlt as AddLocationAltIcon,
  AddPhotoAlternate as AddPhotoAlternateIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlagIcon from '@mui/icons-material/Flag';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import PetsIcon from '@mui/icons-material/Pets';
import ShareIcon from '@mui/icons-material/Share';
import WifiTetheringErrorIcon from '@mui/icons-material/WifiTetheringError';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import { Paper, Stack } from '@mui/material';
// to extract the pet ID from the URL
import {
  Alert,
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Collapse,
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

import { getStatusLabel, getFinalStatusLabel } from '../../../constants/Choices';
import spinnerAnimation from '../../../assets/Animation-1749725645616.json';
import { useAuth } from '../../../contexts/AuthContext';
import AnimalAvatar from '../../../shared/components/AnimalAvatar';
// import LeafletPetDetailsMap from '../../../components/LeafletPetDetailsMap'
import LeafletPetDetailsMapNew from '../../../shared/maps/LeafletPetDetailsMapNew';
import UploadTest from '../../UploadTest';
import IconLabelTabs from '../components/IconLabelTabs';
import ImageCarousel from '../components/ImageCarousel';
import PetAttributes from '../components/PetAttributes';
import SendMessage from '../components/SendMessage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PetDetailsPage = () => {
  const { t } = useTranslation('petDetails');
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
  const [msgExpanded, setMsgExpanded] = useState(false);
  const mapRef = useRef(null); // Ref for the map container
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
  const createDropzoneConfig = useCallback(() => {
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

    return { getRootProps, getInputProps, isDragActive };
  }, []);

  // Get dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = createDropzoneConfig();

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
      setZoomPosition({ lat, lng });
    }
    // Always scroll to map when zooming
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: getStatusLabel(pet.status, t),
          text: pet.breed || '',
          url: window.location.href,
        });
      } else {
        // Fallback: Copy URL to clipboard
        navigator.clipboard.writeText(window.location.href);
        enqueueSnackbar(t('alerts.linkCopied'), { variant: 'success' });
      }
    } catch (error) {
      console.error('Error sharing pet:', error);
      enqueueSnackbar(t('alerts.errorSharing'), {
        variant: 'error',
      });
    }
  };

  const handleFileInputChange = (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert(t('alerts.invalidImage'));
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(t('alerts.imageTooLarge'));
      return;
    }

    // Revoke previous preview to prevent memory leaks
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
    }

    // Set file and create preview
    setFile(file);
    
    try {
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
    } catch (err) {
      console.warn('Could not generate preview (possibly mobile):', err);
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
      alert(t('alerts.messageRequired'));
      return;
    }

    // 2. If image is included, coords are also required
    if (hasImage && !hasCoords) {
      alert(t('alerts.locationRequired'));
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
      enqueueSnackbar(t('alerts.messageSent'), { variant: 'success' });

      fetchPetSightings();
    } catch (error) {
      console.error('Error sending message:', error);
      enqueueSnackbar(t('alerts.errorSendingMessage'), { variant: 'error' });
    }
  };

  const handlePetImageSelected = (file) => {
    setPetImageFile(file);
  };

  const handleToggleMsgExpand = () => setMsgExpanded((prev) => !prev);

  const handleRemoveImage = () => {
    setFile(null);
    setFilePreview(null);
    setPetImageFile(null);
    setSelectedFile(null);
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
      alert(t('alerts.loginRequired'));
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
        enqueueSnackbar(isFavorite ? t('notifications.petRemovedFromFavorites') : t('notifications.petAddedToFavorites'), { variant: 'success' });
      } else {
        const errorData = await response.json();
        enqueueSnackbar(errorData.detail || t('alerts.somethingWentWrong'), {
          variant: 'error',
        });
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      enqueueSnackbar(t('alerts.errorUpdatingFavorite'), { variant: 'error' });
    }
  };

  const isStillLoading = loading || (!pet && !error);

  useEffect(() => {
    if (isLocationAdded && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isLocationAdded]);

  // Cleanup file preview on unmount
  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

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
        <Alert severity="info">{t('alerts.noPetDetails')}</Alert>
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
            <Tooltip title={isFavorite ? t('tooltips.removeFromFavorites') : t('tooltips.addToFavorites')}>
              <IconButton onClick={handleFavorite} style={{ backgroundColor: '#f7f9fd' }}>
                {isFavorite ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon color="primary" />}
              </IconButton>
            </Tooltip>

            {/* Download */}
            <Tooltip title={t('tooltips.downloadPoster')}>
              <Link to={`/pets/${id}/poster`}>
                <IconButton style={{ backgroundColor: '#f7f9fd' }}>
                  <DownloadIcon color="primary" />
                </IconButton>
              </Link>
            </Tooltip>

            {/* Share */}
            <Tooltip title={t('tooltips.share')}>
              <IconButton onClick={handleShare} style={{ backgroundColor: '#f7f9fd' }}>
                <ShareIcon color="primary" />
              </IconButton>
            </Tooltip>

            {/* Report */}
            {/* <Tooltip title={t('tooltips.report')}>
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
            {getStatusLabel(pet.status, t)}
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
            {getFinalStatusLabel(pet.final_status, t)}
          </Typography>
        </Box>
      </Card>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} ref={mapRef}>
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
      {/* <UploadTest onFileSelected={handlePetImageSelected} /> */}
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
          <StatusBlock icon={<FlagIcon />} label={getStatusLabel(pet.status, t)} />

          <DoubleArrowIcon />

          <StatusBlock icon={<FlagIcon />} label={getStatusLabel(pet.final_status, t)} />
        </Box>
      </Card> */}

      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Card
          sx={{
            p: { xs: 1, sm: 2 },
            borderRadius: 3,
            background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
            onClick={handleToggleMsgExpand}
          >
            {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography color="textSecondary">
                <Box display="flex" alignItems="center">
                  <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }}>
                    <AddPhotoAlternateIcon />
                  </IconButton>
                  <Typography color="textSecondary" sx={{ pl: { xs: 1, sm: 2 } }}>
                    PIEVIENOT ZIŅOJUMU
                  </Typography>
                </Box>
              </Typography>
            </Box> */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography color="textSecondary">
                <Box display="flex" alignItems="center">
                  {user ? (
                    <AnimalAvatar animal={user.avatar} username={user.username} />
                  ) : (
                    <>
                      <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }}>
                        <AddCommentIcon />
                      </IconButton>
                    </>
                  )}

                  <Typography color="textSecondary" sx={{ pl: { xs: 1, sm: 2 } }}>
                    {t('actions.addMessage')}
                  </Typography>
                </Box>
              </Typography>
            </Box>
            <IconButton>{msgExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
          </Box>
          {user ? (
            <Collapse in={msgExpanded}>
              <Box sx={{ py: { xs: 1, sm: 2 } }}>
                <TextField
                  label={t('form.commentPlaceholder')}
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Box>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ marginBottom: '8px', color: '#666' }}>{t('form.addPhoto')}</p>
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
                    <p style={{ margin: 0, color: '#00b3a4', fontWeight: 'bold' }}>{t('form.dropHere')}</p>
                  ) : (
                    <div>
                      <p style={{ margin: '0 0 4px 0', color: '#666', fontWeight: '500' }}>
                        {t('form.dragDropText')}
                      </p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>{t('form.supportedFormats')}</p>
                    </div>
                  )}
                </div>
                <p style={{ marginTop: '16px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
                  {t('form.mobileWarning')}
                  <br />
                  {t('form.mobileWarning2')}
                </p>
                <div style={{ marginTop: 16 }}>
                  <input type="file" accept="image/*" onChange={(e) => handleFileInputChange(e.target.files[0])} />
                </div>
              </div>
              {file && (
                <div
                  style={{
                    marginBottom: '16px',
                    padding: '16px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <p>
                      <strong>{t('form.selectedFile')}</strong> {file.name}
                    </p>
                    <p>
                      <strong>{t('form.fileType')}</strong> {file.type}
                    </p>
                    <p>
                      <strong>{t('form.fileSize')}</strong> {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <IconButton onClick={handleRemoveImage} color="error">
                    <CloseIcon />
                  </IconButton>
                </div>
              )}
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
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  {!isLocationAdded ? (
                    <Tooltip title={t('tooltips.addLocation')}>
                      <IconButton onClick={handleAddLocation} sx={{ backgroundColor: '#00b3a4', color: '#fff', mr: 1 }}>
                        <AddLocationAltIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title={t('tooltips.removeLocation')}>
                      <IconButton
                        onClick={handleRemoveLocation}
                        sx={{ backgroundColor: '#00b3a4', color: '#fff', mr: 1 }}
                      >
                        <WrongLocationIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
                <Tooltip title={t('tooltips.sendMessage')}>
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
            </Collapse>
          ) : (
            <Box p={2}>
              <Typography color="textSecondary">{t('actions.pleaseLogin')}</Typography>{' '}
              <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>
                {t('actions.login')}
              </Link>
            </Box>
          )}
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <IconLabelTabs pet={pet} sightings={sightings} onZoomMap={handleZoomMap} />
      </Grid>
      {/* {petImageFile && (
        <div style={{marginTop: 8}}>
          <h4>Selected File for Pet:</h4>
          <p>File Name: {petImageFile.name}</p>
          <p>File Type: {petImageFile.type}</p>
          <p>Last Modified: {petImageFile.lastModifiedDate?.toDateString()}</p>
        </div>
      )} */}
    </Container>
  );
};

export default PetDetailsPage;
