import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Import MUI Icons
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MapIcon from '@mui/icons-material/Map';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PetsIcon from '@mui/icons-material/Pets';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PrintIcon from '@mui/icons-material/Print';
import PushPinIcon from '@mui/icons-material/PushPin';
import ShareIcon from '@mui/icons-material/Share';
import StorageIcon from '@mui/icons-material/Storage';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import TuneIcon from '@mui/icons-material/Tune';
import WorkIcon from '@mui/icons-material/Work';
import { Link as MuiLink } from '@mui/material';
// Example MUI icon
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import img2 from '../assets/images/about/application_programming_interface_amico.svg';
import img3 from '../assets/images/about/navigation_pana.svg';
// images
import img1 from '../assets/images/about/qr_code_bro.svg';
import Jumbotron from '../shared/components/Jumbotron';

function About() {
  const { t } = useTranslation('aboutPage');

  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
        <meta name="description" content={t('metaDescription')} />
        <meta name="keywords" content={t('metaKeywords')} />
        <meta property="og:title" content={t('ogTitle')} />
        <meta property="og:description" content={t('ogDescription')} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Container maxWidth="lg" disableGutters>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 5,
            fontWeight: 800,
            background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('mainTitle')}
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Typography variant="body1">
              {t('mainDescription')}
            </Typography>
          </Grid>
        </Grid>

        {/* Add more explicit spacing */}
        <div style={{ marginTop: '80px', marginBottom: '40px' }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <Typography variant="h4" align="center" sx={{ fontWeight: 500, color: '#16477c', mb: 4 }}>
                {t('pathToSolutionTitle')}
              </Typography>
            </Grid>
          </Grid>
        </div>

        {/* Left Paragraph */}
        <div style={{ marginTop: '80px', marginBottom: '40px' }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
              <Typography variant="h5" textAlign="left" gutterBottom sx={{ color: '#00b5ad' }}>
                {t('searchChallengesTitle')}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom style={{ textAlign: 'left' }}>
                {t('searchChallengesText1')}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom style={{ textAlign: 'left' }}>
                {t('searchChallengesText2')}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
              <Box position="relative" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <CardMedia component="img" src={img1} alt={t('altText.qrCode')} />
                <Box
                  style={{
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <MuiLink
                    href="https://storyset.com/technology"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.6rem',
                      fontStyle: 'italic',
                      color: '#999',
                      fontWeight: '300',
                    }}
                  >
                    {t('attribution.technology')}
                  </MuiLink>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>

        {/* Right Paragraph */}
        <div style={{ marginTop: '80px', marginBottom: '40px' }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }} order={{ xs: 2, md: 1 }}>
              <Box position="relative" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <CardMedia
                  component="img"
                  src={img2}
                  alt={t('altText.webApi')}
                  style={{
                    width: 'auto',
                    maxHeight: '380px',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  style={{
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <MuiLink
                    href="https://storyset.com/technology"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.6rem',
                      fontStyle: 'italic',
                      color: '#999',
                      fontWeight: '300',
                    }}
                  >
                    {t('attribution.technology')}
                  </MuiLink>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }} order={{ xs: 1, md: 2 }}>
              <Typography variant="h5" textAlign="left" gutterBottom sx={{ color: '#00b5ad' }}>
                {t('innovativeSolutionTitle')}
              </Typography>
              <Typography variant="body1" component="p" style={{ textAlign: 'left' }}>
                {t('innovativeSolutionText')}
              </Typography>
              <List dense disablePadding sx={{ mt: 2 }}>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                    <CheckCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={t('features.realtimeNotifications')} />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                    <CheckCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={t('features.qrCodes')} />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                    <CheckCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={t('features.mapMarking')} />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                    <CheckCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={t('features.savePosts')} />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                    <CheckCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={t('features.downloadApp')} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </div>

        {/* Left Paragraph */}
        <div style={{ marginTop: '80px', marginBottom: '40px' }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
              <Typography variant="h5" textAlign="left" gutterBottom sx={{ color: '#00b5ad' }}>
                {t('resultAndDevelopmentTitle')}
              </Typography>

              <Typography variant="body1" component="p" gutterBottom style={{ textAlign: 'left' }}>
                {t('resultAndDevelopmentText1')}
              </Typography>

              <Typography variant="body1" component="p" gutterBottom style={{ textAlign: 'left' }}>
                {t('resultAndDevelopmentText2')}
              </Typography>

              <Typography variant="body1" component="p" style={{ textAlign: 'left' }}>
                {t('resultAndDevelopmentText3')}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
              <Box position="relative" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <CardMedia
                  component="img"
                  src={img3}
                  alt={t('altText.navigation')}
                  style={{
                    width: 'auto',
                    maxHeight: '380px',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  style={{
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <MuiLink
                    href="https://storyset.com/city"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.6rem',
                      fontStyle: 'italic',
                      color: '#999',
                      fontWeight: '300',
                    }}
                  >
                    {t('attribution.city')}
                  </MuiLink>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>

        <Jumbotron />
      </Container>
    </>
  );
}

export default About;
