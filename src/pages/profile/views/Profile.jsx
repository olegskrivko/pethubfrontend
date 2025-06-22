import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import user_avatar from './images/cathead-01.png'
// import user_avatar from './images/account_amico_blue.svg'
// import user_avatar from './images/ava/Asset 9.svg'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PetsIcon from '@mui/icons-material/Pets';
import SettingsIcon from '@mui/icons-material/Settings';
import TryIcon from '@mui/icons-material/Try';
import WorkIcon from '@mui/icons-material/Work';
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { useAuth } from '../../../contexts/AuthContext';
import AvatarWithAnimal from '../components/AvatarWithAnimal';

// import AvatarImg from '../images/beaver.avif'; // Use a valid image
// import OneSignal from 'react-onesignal';
const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  //   const { user, logout } = useContext(AuthContext);
  //   console.log('user', user);
  //   const [location, setLocation] = useState({
  //     latitude: localStorage.getItem('latitude') || '',
  //     longitude: localStorage.getItem('longitude') || '',
  //   });
  //   const [distance, setDistance] = useState(localStorage.getItem('distance') || '');

  // Function to initialize OneSignal
  //   const initOneSignal = async () => {
  //     await OneSignal.init({
  //       appId: '07831676-ef12-409c-895e-3352642c136d',
  //     });

  //     console.log('OneSignal initialized');
  //     OneSignal.Slidedown.promptPush(); // Show subscription prompt after initialization
  //   };

  //   const getLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const { latitude, longitude } = position.coords;
  //           setLocation({
  //             latitude: latitude.toString(),
  //             longitude: longitude.toString(),
  //           });
  //           localStorage.setItem('latitude', latitude.toString());
  //           localStorage.setItem('longitude', longitude.toString());
  //         },
  //         (error) => {
  //           console.error('Error getting geolocation: ', error);
  //         },
  //       );
  //     } else {
  //       console.error('Geolocation is not supported by this browser.');
  //     }
  //   };

  //   const addLocationTags = () => {
  //     OneSignal.User.addTags({ ...location, distance });
  //     console.log('Tags added successfully');
  //   };

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setLocation((prevLocation) => ({
  //       ...prevLocation,
  //       [name]: value,
  //     }));
  //     localStorage.setItem(name, value);
  //   };

  //   const handleDistanceChange = (e) => {
  //     setDistance(e.target.value);
  //     localStorage.setItem('distance', e.target.value);
  //   };

  //   useEffect(() => {
  //     // Retrieve location from localStorage on component mount
  //     const storedLatitude = localStorage.getItem('latitude');
  //     const storedLongitude = localStorage.getItem('longitude');
  //     const storedDistance = localStorage.getItem('distance');

  //     if (storedLatitude && storedLongitude) {
  //       setLocation({
  //         latitude: storedLatitude,
  //         longitude: storedLongitude,
  //       });
  //     }

  //     if (storedDistance) {
  //       setDistance(storedDistance);
  //     }
  //   }, []);

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${BASE_URL}/api/auth/delete`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete user account');
      }
      const deletedMessage = await response.json();
      console.log('Account deleted:', deletedMessage);
      setUser(null); // Clear user data after deletion
      navigate('/'); // Navigate to the home page after successful deletion
    } catch (error) {
      console.error('Error deleting account:', error.message);
      // Handle error gracefully
    }
    setOpenDialog(false); // Close the dialog after account deletion
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    logout();
    console.log('Logout successful');
    navigate('/login'); // Redirect to login page after logout
  };

  if (!user) return <Typography>Loading...</Typography>;
  {
    /* <a href="https://storyset.com/user">User illustrations by Storyset</a> */
  }
  return (
    <Container component="main" maxWidth="lg">
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box sx={{ textAlign: 'center', position: 'relative' }}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* <AvatarWithAnimal user={user} /> */}

            <AvatarWithAnimal animal={user.avatar} username={user.username} />
            <Typography variant="body1" color="primary" mt={1} style={{ fontWeight: 'bold' }}>
              {user.username}
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ mt: 1, mb: 5 }} justifyContent="center">
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Link to="/user-profile/bookmarks/pets" style={{ textDecoration: 'none' }}>
                <Paper
                  sx={{
                    p: 2,

                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }}>
                      <BookmarkIcon />
                    </IconButton>
                    <Typography variant="body1" color="textSecondary" sx={{ ml: 2 }}>
                      Saglabātie dzīvnieku sludinājumi
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Link to="/user-profile/pets" style={{ textDecoration: 'none' }}>
                <Paper
                  sx={{
                    p: 2,

                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                    // boxShadow: '0px 3px 10px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      // boxShadow: '0px 6px 20px rgba(0,0,0,0.1)',
                      // transform: 'scale(1.01)',
                      background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }}>
                      <PetsIcon />
                    </IconButton>
                    <Typography variant="body1" color="textSecondary" sx={{ ml: 2 }}>
                      Mani mājdzīvnieki
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>

            {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Link to="/user-profile/services" style={{ textDecoration: 'none' }}>
                <Paper
                  sx={{
                    p: 2,

                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                  
                      background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }}>
                      <WorkIcon />
                    </IconButton>
                    <Typography variant="body1" color="textSecondary" sx={{ ml: 2 }}>
                      Mani pakalpojumi
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid> */}

            {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Link to="/user-profile/bookmarks/services" style={{ textDecoration: 'none' }}>
                <Paper
                  sx={{
                    p: 2,

                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
             
                      background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }}>
                      <FavoriteIcon />
                    </IconButton>
                    <Typography variant="body1" color="textSecondary" sx={{ ml: 2 }}>
                      Saglabātie pakalpojumi
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid> */}

            {/* <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
    <Link to="/user-profile/notifications" style={{ textDecoration: 'none' }}>
      <Paper sx={{ padding: '1rem', backgroundColor: '#f7f9fd' }}>
        <Box display="flex" alignItems="center">
          <NotificationsIcon fontSize="large" sx={{ color: '#5B9BD5', mr: 2 }} />
          <Typography variant="body1">Paziņojumi</Typography>
        </Box>
      </Paper>
    </Link>
  </Grid> */}

            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Link to="/user-profile/settings" style={{ textDecoration: 'none' }}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }}>
                      <SettingsIcon />
                    </IconButton>
                    <Typography variant="body1" color="textSecondary" sx={{ ml: 2 }}>
                      Iestatījumi
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          </Grid>

          {/* <Grid container>
        <div>
    <svg
          height="160%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: 'absolute', bottom: 100 }}
        >
          <path
            fill="#22badf"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
    </div>
    </Grid> */}
          {/* <Grid container spacing={2} sx={{ mt: 1, mb: 5 }} justifyContent="center">
          <Grid item xs={12}>
            <Box p={2} bgcolor="lightgray">
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <Button variant="contained" onClick={initOneSignal} fullWidth>
                    Subscribe
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button variant="contained" onClick={getLocation} fullWidth>
                    Get Location
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button variant="contained" onClick={addLocationTags} fullWidth>
                    Add Tags
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="latitude"
                    value={location.latitude}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    label="Latitude"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="longitude"
                    value={location.longitude}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    label="Longitude"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="distance"
                    value={distance}
                    onChange={handleDistanceChange}
                    fullWidth
                    size="small"
                    label="Distance"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Link to="/create-business">
              <Button variant="outlined" color="secondary" sx={{ fontWeight: '400' }}>
                Add Your Business
              </Button>
            </Link>
          </Grid>
        </Grid> */}

          {/* <Link to="/">
          <Button onClick={handleLogout} variant="contained" sx={{ fontWeight: '400' }}>
            Logout
          </Button>
        </Link> */}

          {/* <Box sx={{backgroundColor: "pink"}}>
        <div>
          <Typography variant="body1" sx={{ fontWeight: '500' }} gutterBottom>
            Danger Zone
          </Typography>
          <Typography variant="body1" gutterBottom>
            This action cannot be undone. Proceed with caution.
          </Typography>
          <Button variant="contained" color="error" onClick={handleOpenDialog}>
            Delete Account
          </Button>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
            <DialogContent>
              <Typography>
                This action will permanently delete your account and all related data. Proceeding
                with this action cannot be undone.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteAccount} variant="contained" color="error">
                Delete
              </Button>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>

      </Box> */}
        </Box>
      </Grid>
    </Container>
  );
};

export default Profile;
