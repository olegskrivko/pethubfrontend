import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Delete as DeleteIcon,
  LocationOff as LocationOffIcon,
  LocationOn as LocationOnIcon,
} from '@mui/icons-material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import MapIcon from '@mui/icons-material/Map';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Fade,
  Grid,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import dayjs from 'dayjs';
import 'dayjs/locale/lv';
// Latvian locale
import relativeTime from 'dayjs/plugin/relativeTime';
import moment from 'moment';
import 'moment/locale/lv';

import { useAuth } from '../../../contexts/AuthContext';
import AnimalAvatar from '../../../shared/components/AnimalAvatar';

dayjs.locale('lv');
dayjs.extend(relativeTime);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TabMessages = ({ pet, sightings, onZoomMap }) => {
  const { t } = useTranslation('petDetails');
  const { user, logout } = useAuth();

  const theme = useTheme();

  const [visibleMessages, setVisibleMessages] = useState(3);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
    if (!window.confirm(t('messages.deleteConfirmation'))) return;
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // setError('You must be logged in to view shelters.');
      // setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/pets/${pet.id}/pet-sightings/${messageId}/`, {
        method: 'DELETE',

        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update the pet's sightings history after deletion
        const updatedMessages = pet.sightings_history.filter((msg) => msg.id !== messageId);
        pet.sightings_history = updatedMessages;
        setPet({ ...pet });
      } else {
        console.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      {pet && sightings && sightings.length > 0 ? (
        sightings.map((status, index) => {
          const canDelete = user?.username === status.reporter.username;

          return (
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={index}>
              <Card
                sx={{
                  p: { xs: 1, sm: 2 },
                  borderRadius: 3,
                  background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                }}
              >
                {/* <CardContent style={{ paddingBottom: '1rem' }}> */}
                <Grid container spacing={2} sx={{ position: 'relative' }}>
                  <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                      <Box>
                        <Box display="flex" alignItems="flex-start" mb={2}>
                          {/* <Avatar
                              src={`a.svg`}
                              alt={status.reporter.username.toUpperCase()}
                              sx={{ backgroundColor: '#22badf' }}
                            /> */}
                          <AnimalAvatar animal={status.reporter.avatar} username={status.reporter.username} />
                          <Box ml={2} display="flex" flexDirection="column">
                            <Typography variant="body2" fontWeight="bold">
                              {status.reporter.username.toUpperCase()}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {dayjs(status.created_at).fromNow()}
                            </Typography>
                          </Box>
                        </Box>

                        <Typography variant="body1">{status.notes}</Typography>
                      </Box>

                      {/* Spacer to push buttons down */}
                      <Box flexGrow={1} />

                      {/* Buttons at bottom */}
                      <Box mt={2} display="flex" justifyContent="flex-start" gap={2}>
                        <Tooltip title={t('tooltips.showOnMap')}>
                          <span>
                            <IconButton
                              onClick={() => onZoomMap(status?.latitude, status?.longitude)}
                              sx={{ backgroundColor: '#00b3a4', color: '#fff' }}
                              disabled={!(status?.latitude && status?.longitude)}
                            >
                              {status?.latitude && status?.longitude ? <LocationOnIcon /> : <LocationOffIcon />}
                            </IconButton>
                          </span>
                        </Tooltip>
                        {canDelete && (
                          // <Box
                          //   sx={{
                          //     position: 'absolute',
                          //     right: '0',
                          //     zIndex: '999',
                          //   }}
                          // >
                          <Tooltip title={t('tooltips.deleteMessage')}>
                            <IconButton
                              onClick={() => handleDeleteMessage(status.id)}
                              sx={{ backgroundColor: '#00b3a4', color: '#fff' }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          // </Box>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Box flexGrow={1} />
                  <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
                    <Box position="relative">
                      {status.pet_image && (
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
                              transform: isSmallScreen ? 'translate(-50%, 0)' : 'translate(-50%, -50%)',
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
                </Grid>
                {/* </CardContent> */}
              </Card>
            </Grid>
          );
        })
      ) : (
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Card
            sx={{
              p: { xs: 1, sm: 2 },
              borderRadius: 3,
              background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
              },
            }}
          >
            {/* <CardContent style={{ paddingBottom: '1rem' }}> */}
            <Typography color="textSecondary">
              <Box display="flex" alignItems="center" gap={2}>
                <IconButton
                  style={{
                    backgroundColor: '#00b3a4',
                    color: '#fff',
                    pointerEvents: 'none',
                  }}
                >
                  <TextSnippetIcon />
                </IconButton>{' '}
                {t('messages.noObservations')}
              </Box>
            </Typography>
            {/* </CardContent> */}
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
  );
};

export default TabMessages;
