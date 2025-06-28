import { Suspense, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import MapIcon from '@mui/icons-material/Map';
import PetsIcon from '@mui/icons-material/Pets';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Box, Container, Grid, IconButton, Paper, Typography } from '@mui/material';

import { useAuth } from '../../../contexts/AuthContext';
import AvatarWithAnimal from '../components/AvatarWithAnimal';

const Profile = () => {
  const { t } = useTranslation('profile');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Typography>{t('loading')}</Typography>;

  const cardItems = [
    {
      to: '/user-profile/bookmarks/pets',
      icon: <BookmarkIcon />,
      label: t('menuItems.savedPetListings'),
    },
    {
      to: '/user-profile/pets',
      icon: <PetsIcon />,
      label: t('menuItems.myPets'),
    },
    {
      to: '/user-profile/map',
      icon: <MapIcon />,
      label: t('menuItems.mapWithCurrentListings'),
    },
    {
      to: '/user-profile/settings',
      icon: <SettingsIcon />,
      label: t('menuItems.settings'),
    },
  ];

  return (
    <Container component="main" maxWidth="lg" disableGutters>
      <Box sx={{ textAlign: 'center', my: { xs: 2, sm: 2, md: 3, lg: 4, xl: 4 } }}>
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
        <Grid container spacing={2} justifyContent="center">
          {cardItems.map(({ to, icon, label }) => (
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={to}>
              <Link to={to} style={{ textDecoration: 'none' }}>
                <Paper
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
                  <Box display="flex" alignItems="center">
                    <IconButton color="primary" sx={{ backgroundColor: '#f7f9fd' }}>
                      {icon}
                    </IconButton>
                    <Typography variant="body1" color="text.secondary" sx={{ ml: { xs: 1, sm: 2 } }}>
                      {label}
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
