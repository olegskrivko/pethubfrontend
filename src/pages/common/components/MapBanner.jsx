import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

import illustration from '../../../assets/images/home/navigation_animate.svg';

const MapBanner = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { t } = useTranslation('homePage');

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient( #e3f2fd, #ffffff)',
        minHeight: '500px',
        position: 'relative',
      }}
    >
      <Container
        component="main"
        maxWidth="lg"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        sx={{
          py: 6,
        }}
      >
        <div
          style={{
            flex: '1 1 400px',
            maxWidth: '600px',
            paddingRight: isSmallScreen ? '0' : '40px',
            zIndex: 2,
            textAlign: isSmallScreen ? 'center' : 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isSmallScreen ? 'center' : 'flex-start',
          }}
        >
          <h2
            style={{
              textAlign: isSmallScreen ? 'center' : 'left',
              fontSize: isSmallScreen ? '1.75rem' : '2.5rem',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              marginBottom: '1rem',
              background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('mapBanner.title')}
          </h2>
          <p
            style={{
              color: '#616f7d',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              marginBottom: '2rem',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {t('mapBanner.description')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="contained" sx={{ borderRadius: 2 }} color="primary" onClick={() => navigate('/pets')}>
              {t('mapBanner.buttons.viewMap')}
            </Button>
            <Button variant="outlined" sx={{ borderRadius: 2 }} color="primary" onClick={() => navigate('/add-pet')}>
              {t('mapBanner.buttons.add')}
            </Button>
          </div>
        </div>

        <div
          style={{
            flex: '1 1 400px',
            maxWidth: '500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={illustration}
            alt={t('mapBanner.altText.illustration')}
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
            }}
          />
        </div>
      </Container>
    </div>
  );
};

export default MapBanner;
