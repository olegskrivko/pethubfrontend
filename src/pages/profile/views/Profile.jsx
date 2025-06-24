import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

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
    navigate('/logout'); // Redirect to login page after logout
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Container component="main" maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 } }}>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box mt={2} sx={{ textAlign: 'center', position: 'relative' }}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AvatarWithAnimal animal={user.avatar} username={user.username} />
            <Typography variant="h6" color="primary" mt={1} mb={2} style={{ fontWeight: 'bold' }}>
              {user.username}
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ mt: 1, mb: 5 }} justifyContent="center">
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Link to="/user-profile/bookmarks/pets" style={{ textDecoration: 'none' }}>
                <Paper
                  sx={{
                    px: { xs: 1, sm: 2 },
                    py: { xs: 1, sm: 2 },
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
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
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
        </Box>
      </Grid>
    </Container>
  );
};

export default Profile;
