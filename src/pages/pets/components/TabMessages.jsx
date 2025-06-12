import React, { useState, useEffect } from 'react';
import {
  Grid,
 
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
  IconButton,
  Tooltip,
  Button,
  Modal,
  Backdrop,
  CardMedia,
  Fade
} from '@mui/material';

import { LocationOn as LocationOnIcon, LocationOff as LocationOffIcon, Delete as DeleteIcon } from '@mui/icons-material';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../../contexts/AuthContext';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import dayjs from 'dayjs';
import 'dayjs/locale/lv';
import 'moment/locale/lv'; // Latvian locale
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('lv');
dayjs.extend(relativeTime);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const TabMessages = ({ pet, sightings, onZoomMap  }) => {
 

  const { user, logout } = useAuth();
  console.log(dayjs().format('dddd, D MMMM YYYY')); // Latvian!
  console.log("useruser", user)
  const theme = useTheme();
  // const [open, setOpen] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);
  const [visibleMessages, setVisibleMessages] = useState(3); // Initially show 3 messages

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false); // State for controlling the image modal
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image for modal
  // const onZoomMap = (lat, lng) => {
  //   if (lat && lng) {
  //     console.log(`Zooming to: ${lat}, ${lng}`);

  //   }
  // };
    // useEffect(() => {
    //   if (user) {
    //     setFormData({
    //       username: user.username,
    //       email: user.email,
    //     });
    //   }
    // }, [user]);
    const handleOpen = (image) => {
      setSelectedImage(image);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedImage(null);
    };
  const handleImageOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleImageClose = () => setOpen(false);

  const loadMoreMessages = () => {
    // Load next 3 messages
    setVisibleMessages(visibleMessages + 3);
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    const accessToken = localStorage.getItem('access_token');  // Retrieve the access token from localStorage
    if (!accessToken) {
      // setError('You must be logged in to view shelters.');
      // setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/pets/${pet.id}/pet-sightings/${messageId}/`, {
        method: 'DELETE',
        // headers: {
        //   'Authorization': `Token ${authToken}`,
        //   'Content-Type': 'application/json',
        // },

        headers: {
          Authorization: `Bearer ${accessToken}`,  // Add Authorization header with token
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Update the pet's sightings history after deletion
        const updatedMessages = pet.sightings_history.filter(msg => msg.id !== messageId);
        pet.sightings_history = updatedMessages;  // Update directly
        setPet({ ...pet });  // Re-render component
      } else {
        console.error("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
  

  return (
    <Grid container>
    <Grid container spacing={2}>
    {pet && sightings && sightings.length > 0 ? (
      sightings.map((status, index) => {
        const canDelete = user?.username === status.reporter.username;

        return (
          <Grid  size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={index}>
          {/* reporter  {status.reporter.id} {status.reporter.username}
           tagad {user?.userId} {user?.username} */}
            <Card style={{ width: '100%' }}>
              <CardContent style={{ paddingBottom: "1rem" }}>
              <Grid container spacing={2}>
                 {/* Left section (avatar, author info, text) */}
                <Grid  size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
                <Box display="flex"  alignItems="flex-start">
                <Avatar src={`a.svg`} alt={status.reporter.username.toUpperCase()} sx={{ backgroundColor: "#22badf" }} />
    

              <Box ml={2} display="flex" flexDirection="column">
              <Typography variant="body2" fontWeight="bold">
                      {status.reporter.username.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                    {/* {moment(status.created_at).locale('lv').fromNow()} */}
                    {/* {dayjs(status.created_at).format('dddd, D MMMM YYYY')} */}
                    {dayjs(status.created_at).fromNow()}

                    </Typography>
                          </Box>
              </Box>
                        <Box mt={1}>
                          <Typography variant="body1" style={{ color: '#333' }}>
                           {status.notes}
                          </Typography>
                        </Box>
                </Grid>
                {/* Right section (image and buttons) */}
                <Grid  size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                <Box position="relative">
      
  {status.pet_image && ( // Only render if image exists
    <CardMedia
      component="img"
      style={{
        borderRadius: '8px',
        cursor: 'pointer',
        maxWidth: '100%',
        height: 'auto',
      }}
      image={status.pet_image}
      onClick={() => handleOpen(status.pet_image)}
    />
  )}

  {/* Show image modal */}
  <Modal
    open={open}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>
      <Box
        sx={{
          position: 'absolute',
          top: isSmallScreen ? '0' : '50%',
          left: '50%',
          transform: isSmallScreen
            ? 'translate(-50%, 0)'
            : 'translate(-50%, -50%)',
          width: isSmallScreen ? '100%' : 'auto',
          height: isSmallScreen ? '100%' : 'auto',
          maxWidth: isSmallScreen ? '100%' : '90vw',
          maxHeight: isSmallScreen ? '100%' : '90vh',
          outline: 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderRadius: isSmallScreen ? '0' : '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Close button for small screens */}
        {isSmallScreen && (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: '#fff',
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Modal"
            style={{
              borderRadius: isSmallScreen ? '0' : '8px',
              width: '100%',
              height: 'auto',
            }}
          />
        ) : null}
      </Box>
    </Fade>
  </Modal>
</Box>
                </Grid>

                {/* Buttons section */}
                <Grid  size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <Box mt={2} display="flex" justifyContent="space-between">
             
             <Tooltip title="Parādīt kartē">
               <IconButton onClick={() => onZoomMap(status?.latitude, status?.longitude)} style={{backgroundColor: '#555',  color: '#fff'}}>
                 {status?.latitude && status?.longitude ? <LocationOnIcon /> : <LocationOffIcon />}
               </IconButton>
             </Tooltip>
{/* Render Delete Button ONLY if the user is the author */}
{canDelete && (
             <Tooltip title="Izdzēst ziņu">
               <IconButton onClick={() => handleDeleteMessage(status.id)}>
                 <DeleteIcon color="error" />
               </IconButton>
             </Tooltip>
           )}

           </Box>



                </Grid>
              </Grid>
                {/* Header with reporter info */}
                {/* <Box display="flex" alignItems="center" mb={2}>
                  <Avatar src={`a.svg`} alt={status.reporter.username.toUpperCase()} sx={{ backgroundColor: "#22badf" }} />
                  <Box ml={2}>
                    <Typography variant="body2" fontWeight="bold">
                      {status.reporter.username.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {moment(status.timestamp).fromNow()}
                    </Typography>
                  </Box>
                </Box> */}

                {/* Status note */}
                {/* <Typography>{status.notes}</Typography> */}

                {/* Status image */}
                {/* {status.image && (
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <img
                      src={status.image}
                      alt="Status"
                      onClick={() => handleImageOpen(status.image)}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '8px',
                        maxWidth: '150px',
                        height: 'auto',
                      }}
                    />
                  </Box>
                )} */}

                {/* Footer with map and delete options */}
                {/* <Box mt={2} display="flex" justifyContent="space-between">
             
                  <Tooltip title="Parādīt kartē">
                    <IconButton onClick={() => onZoomMap(status?.latitude, status?.longitude)}>
                      {status?.latitude && status?.longitude ? <LocationOnIcon /> : <LocationOffIcon />}
                    </IconButton>
                  </Tooltip>

 {canDelete && (
                  <Tooltip title="Izdzēst ziņu">
                    <IconButton onClick={() => handleDeleteMessage(status.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                )}

                </Box> */}
              </CardContent>
            </Card>

            {/* Image Modal */}
            {/* <Modal open={open} onClose={handleImageClose} closeAfterTransition BackdropComponent={Backdrop}>
              <Fade in={open}>
                <Box sx={{ width: '90%', maxHeight: '90%', margin: 'auto', outline: 0 }}>
                  <img src={selectedImage} alt="Selected" style={{ width: '100%' }} />
                </Box>
              </Fade>
            </Modal> */}
          </Grid>
        );
      })
    ) : (
      <Grid  size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Card>
                  <CardContent style={{ paddingBottom: "1rem" }}>
        {/* <Typography variant="body2" color="textSecondary">
          No status history available.
        </Typography> */}
                             {/* <Typography color="textSecondary">
                      <Box display="flex" alignItems="center" gap={2}>
                        Šobrīd nav pievienota neviena novērojuma.
                      </Box>
                    </Typography> */}
                               <Typography color="textSecondary">
                                  <Box display="flex"  alignItems="center" gap={2}>
                                    <IconButton style={{ backgroundColor: '#555', color: '#fff', pointerEvents: 'none' }}>
                                      <TextSnippetIcon />
                                    </IconButton> Šobrīd nav pievienots neviens novērojums.
                                  </Box>
                                </Typography>
                                </CardContent>
                                </Card>
      </Grid>
    )}

    {/* Load More Button */}
    {/* {pet.sightings_history.length > visibleMessages && (
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" onClick={loadMoreMessages}>
          Load More
        </Button>
      </Grid>
    )} */}
  </Grid>
  </Grid>

  );
};

export default TabMessages;
