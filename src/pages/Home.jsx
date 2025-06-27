import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ComputerIcon from '@mui/icons-material/Computer';
import DevicesIcon from '@mui/icons-material/Devices';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import QrCodeIcon from '@mui/icons-material/QrCode';
import SearchIcon from '@mui/icons-material/Search';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// React MUI components
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import MapBanner from '../pages/common/components/MapBanner';
// import MapBannerBottom from '../pages/common/components/MapBannerBottom';
import MapBannerDeepBottom from '../pages/common/components/MapBannerDeepBottom';
import PetPath from '../pages/common/components/PetPath';
import ChatBot from '../shared/components/ChatBot';
import TestimonialSlider from './common/components/TestimonialSlider';

// import PetPathVertical from "../components/PetPathVertical"

function Home() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('homePage');

  return (
    <React.Fragment>
      <Helmet>
        <title>{t('title')}</title>
        <meta name="description" content={t('metaDescription')} />
        <meta name="keywords" content={t('metaKeywords')} />
        <meta property="og:title" content={t('ogTitle')} />
        <meta property="og:description" content={t('ogDescription')} />
        <meta property="og:type" content="website" />
      </Helmet>
      <MapBanner />
      <Container component="main" maxWidth="lg" sx={{ py: 6, paddingLeft: '0', paddingRight: '0' }}></Container>
      <Box>
        <Container component="main" maxWidth="lg" sx={{ py: 4, paddingLeft: '0', paddingRight: '0' }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }} textAlign="center">
              <Typography
                variant={isSmallScreen ? 'h6' : 'h4'}
                sx={{
                  fontWeight: 400,
                  color: '#00b5ad',
                  fontFamily: 'Titillium Web, sans-serif',
                  textTransform: 'uppercase',
                  mb: 4,
                }}
              >
                {t('digitalSupport.subtitle')}
              </Typography>

              <Typography
                variant={isSmallScreen ? 'h4' : 'h2'}
                sx={{
                  fontWeight: 500,
                  color: '#16477c',
                  background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('digitalSupport.title')}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ marginTop: '1rem', marginBottom: '3rem' }}>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <ComputerIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />

                <div>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: '0.5rem',
                      textAlign: 'center',
                      color: '#00b5ad',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    {t('digitalSupport.features.websiteInclusion.title')}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textAlign: 'center',
                      color: '#616f7d',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    {t('digitalSupport.features.websiteInclusion.description')}
                  </Typography>
                </div>
              </CardContent>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <QrCodeIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />

                <div>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: '0.5rem',
                      textAlign: 'center',
                      color: '#00b5ad',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    {t('digitalSupport.features.printablePoster.title')}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textAlign: 'center',
                      color: '#616f7d',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    {t('digitalSupport.features.printablePoster.description')}
                  </Typography>
                </div>
              </CardContent>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <MapIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
                <div>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: '0.5rem',
                      textAlign: 'center',
                      color: '#00b5ad',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    {t('digitalSupport.features.observationReports.title')}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textAlign: 'center',
                      color: '#616f7d',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    {t('digitalSupport.features.observationReports.description')}
                  </Typography>
                </div>
              </CardContent>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
              <CardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <NotificationsIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
                <div>
                  <Typography
                    variant="h6"
                    style={{
                      marginBottom: '0.5rem',
                      textAlign: 'center',
                      color: '#00b5ad',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    {t('digitalSupport.features.pushNotifications.title')}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      textAlign: 'center',
                      color: '#616f7d',
                      fontFamily: 'Titillium Web, sans-serif',
                    }}
                  >
                    {t('digitalSupport.features.pushNotifications.description')}
                  </Typography>
                </div>
              </CardContent>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <PetPath />

      {/* <MapBannerBottom /> */}
      <TestimonialSlider />
      <MapBannerDeepBottom />

      <Container component="main" maxWidth="lg" sx={{ py: 4, paddingLeft: '0', paddingRight: '0' }}>
        <Grid container spacing={3} style={{ marginTop: '1rem', marginBottom: '3rem' }}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} textAlign="center">
            <Typography
              variant={isSmallScreen ? 'h6' : 'h4'}
              sx={{
                fontWeight: 400,
                color: '#00b5ad',
                fontFamily: 'Titillium Web, sans-serif',
                textTransform: 'uppercase',
                mb: 4,
              }}
            >
              {t('modernSolution.subtitle')}
            </Typography>

            <Typography
              variant={isSmallScreen ? 'h4' : 'h2'}
              sx={{
                fontWeight: 500,
                color: '#16477c',
                background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('modernSolution.title')}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <GroupsIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />

              <div>
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: '0.5rem',
                    textAlign: 'center',
                    color: '#00b5ad',
                    fontFamily: 'Titillium Web, sans-serif',
                  }}
                >
                  {t('modernSolution.features.unitingTechnology.title')}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    textAlign: 'center',
                    color: '#616f7d',
                    fontFamily: 'Titillium Web, sans-serif',
                  }}
                >
                  {t('modernSolution.features.unitingTechnology.description')}
                </Typography>
              </div>
            </CardContent>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <DevicesIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />

              <div>
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: '0.5rem',
                    textAlign: 'center',
                    color: '#00b5ad',
                    fontFamily: 'Titillium Web, sans-serif',
                  }}
                >
                  {t('modernSolution.features.mobileOptimized.title')}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    textAlign: 'center',
                    color: '#616f7d',
                    fontFamily: 'Titillium Web, sans-serif',
                  }}
                >
                  {t('modernSolution.features.mobileOptimized.description')}
                </Typography>
              </div>
            </CardContent>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <SmartphoneIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
              <div>
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: '0.5rem',
                    textAlign: 'center',
                    color: '#00b5ad',
                    fontFamily: 'Titillium Web, sans-serif',
                  }}
                >
                  {t('modernSolution.features.appExperience.title')}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    textAlign: 'center',
                    color: '#616f7d',
                    fontFamily: 'Titillium Web, sans-serif',
                  }}
                >
                  {t('modernSolution.features.appExperience.description')}
                </Typography>
              </div>
            </CardContent>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} textAlign="center">
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <AutoFixHighIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
              <div>
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: '0.5rem',
                    textAlign: 'center',
                    color: '#00b5ad',
                    fontFamily: 'Titillium Web, sans-serif',
                  }}
                >
                  {t('modernSolution.features.artificialIntelligence.title')}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    textAlign: 'center',
                    color: '#616f7d',
                    fontFamily: 'Titillium Web, sans-serif',
                  }}
                >
                  {t('modernSolution.features.artificialIntelligence.description')}
                </Typography>
              </div>
            </CardContent>
          </Grid>
        </Grid>
      </Container>

      <Container component="main" maxWidth="lg" sx={{ py: 6, paddingLeft: '0', paddingRight: '0' }}>
        <ChatBot />
      </Container>
    </React.Fragment>
  );
}

export default Home;
