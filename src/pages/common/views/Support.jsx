import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CopyAll, Pets } from '@mui/icons-material';
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material';

import CollaborationtImg from '../../../assets/images/collaboration/creative_team_amico_blue.svg';
import SupportImg from '../../../assets/images/support/cat_astronaut_cuate_blue.svg';
import { DOMAIN_URL, PAYPAL_BUTTON_ID } from '../../../constants/config';

const Support = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation('support');

  // Function to copy the URL to the clipboard
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(DOMAIN_URL).then(
      () => toast.success(t('toast.urlCopied')), // Success toast notification when URL is copied
      () => toast.error(t('toast.urlCopyError')), // Error toast notification when copying fails
    );
  };

  return (
    <React.Fragment>
      {/* Helmet for SEO metadata */}
      <Helmet>
        <html lang={i18n.language || 'lv'} />
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      {/* Toast notifications for success and error messages */}
      <ToastContainer />

      <Container maxWidth="lg" disableGutters>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 5,
            fontWeight: 800,
            color: '#16477c',

            background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('title')}
        </Typography>
        <Grid container spacing={6} alignItems="center">
          {/* Left Side - Illustration Section */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                src={CollaborationtImg}
                alt={t('illustrations.alt')}
                sx={{
                  width: { xs: '100%', sm: '80%', md: '100%' },
                  objectFit: 'contain',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  borderRadius: 2,
                  mb: 1,
                }}
              />
              {/* Link to the illustration source */}
              <MuiLink
                href="https://storyset.com/business"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: '0.6rem',
                  fontStyle: 'italic',
                  color: '#999',
                  fontWeight: 300,
                }}
              >
                {t('illustrations.attribution')}
              </MuiLink>
            </Box>
          </Grid>

          {/* Right Side - Content Section */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {t('collaboration.intro')}
            </Typography>

            <Typography variant="h6" sx={{ my: 1, fontWeight: 500, color: '#16477c' }}>
              {t('collaboration.title')}
            </Typography>

            <List dense>
              {t('collaboration.points', { returnObjects: true }).map((point, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Pets fontSize="small" sx={{ color: '#16477c' }} />
                  </ListItemIcon>
                  <ListItemText primary={point} />
                </ListItem>
              ))}
            </List>

            <Typography variant="body1" sx={{ mt: 3, mb: 4 }}>
              {t('collaboration.outro')}
            </Typography>
          </Grid>
        </Grid>
        {/* Bottom part  */}
        <Grid container spacing={6} alignItems="center">
          {/* Left Side - Illustration Section */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {t('support.intro')}
            </Typography>
            <Typography variant="h6" sx={{ my: 1, fontWeight: 500, color: '#16477c' }}>
              {t('support.title')}
            </Typography>

            {/* List of support options */}
            <List dense>
              {t('support.points', { returnObjects: true }).map((point, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Pets fontSize="small" sx={{ color: '#16477c' }} /> {/* Icon for each support point */}
                  </ListItemIcon>
                  <ListItemText primary={point} />
                </ListItem>
              ))}
            </List>

            <Typography variant="body1" sx={{ mt: 3 }}>
              {t('support.shareText')}
            </Typography>

            {/* Shareable URL with copy functionality */}
            <Box display="flex" alignItems="center" sx={{ my: 2 }}>
              <TextField
                fullWidth
                value="https://lunori.app"
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <IconButton onClick={handleCopyUrl} sx={{ color: '#16477c' }}>
                      <CopyAll />
                    </IconButton>
                  ),
                }}
              />
            </Box>

            {/* PayPal Donation Button Section */}
            <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
              {t('support.donationText')}
            </Typography>
            {/* PayPal Button for donations */}
            <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: 'linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)',
                }}
                onClick={() =>
                  window.open(`https://www.paypal.com/donate/?hosted_button_id=${PAYPAL_BUTTON_ID}`, '_blank')
                }
              >
                {t('support.donateButton')}
              </Button>
            </Box>
          </Grid>

          {/* Right Side - Content Section */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                src={SupportImg}
                alt={t('illustrations.alt')}
                sx={{
                  width: { xs: '100%', sm: '80%', md: '100%' },
                  objectFit: 'contain',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  borderRadius: 2,
                  mb: 1,
                }}
              />
              {/* Link to the illustration source */}
              <MuiLink
                href="https://storyset.com/business"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: '0.6rem',
                  fontStyle: 'italic',
                  color: '#999',
                  fontWeight: 300,
                }}
              >
                {t('illustrations.attribution')}
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Support;
