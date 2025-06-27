import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const trainingTips = [
  {
    key: 'basicCommands',
    src: 'https://www.youtube.com/embed/NFSkzAuCjcI',
  },
  {
    key: 'positiveReinforcement',
    src: 'https://www.youtube.com/embed/VJczka-U0D8',
  },
  {
    key: 'consistency',
    src: 'https://www.youtube.com/embed/Ya72yz1X40g',
  },
  {
    key: 'shortSessions',
    src: 'https://www.youtube.com/embed/CUbZ6refFKA',
  },
  {
    key: 'patience',
    src: 'https://www.youtube.com/embed/jnKxnUvlZcU',
  },
  {
    key: 'breedUnderstanding',
    src: 'https://www.youtube.com/embed/7qW2OU8n9ZM',
  },
  {
    key: 'socialization',
    src: 'https://www.youtube.com/embed/NFSkzAuCjcI',
  },
  {
    key: 'professionalHelp',
    src: 'https://www.youtube.com/embed/VJczka-U0D8',
  },
  {
    key: 'stayCalm',
    src: 'https://www.youtube.com/embed/Ya72yz1X40g',
  },
  {
    key: 'enjoyProcess',
    src: 'https://www.youtube.com/embed/CUbZ6refFKA',
  },
];

const videos = [
  {
    key: 'sitAndLie',
    src: 'https://www.youtube.com/embed/NFSkzAuCjcI',
  },
  {
    key: 'noseTargeting',
    src: 'https://www.youtube.com/embed/VJczka-U0D8',
  },
  {
    key: 'looseLeash',
    src: 'https://www.youtube.com/embed/Ya72yz1X40g',
  },
  {
    key: 'comeBack',
    src: 'https://www.youtube.com/embed/CUbZ6refFKA',
  },
  {
    key: 'wait',
    src: 'https://www.youtube.com/embed/jnKxnUvlZcU',
  },
  {
    key: 'tricksAndGames',
    src: 'https://www.youtube.com/embed/7qW2OU8n9ZM',
  },
];

const PetTraining = () => {
  const { t } = useTranslation('petTraining');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Helmet>
        <title>{t('metadata.title', { ns: 'petTraining' })}</title>
        <meta name="description" content={t('metadata.description', { ns: 'petTraining' })} />
        <meta name="keywords" content={t('metadata.keywords', { ns: 'petTraining' })} />
        <meta property="og:title" content={t('metadata.ogTitle', { ns: 'petTraining' })} />
        <meta property="og:description" content={t('metadata.ogDescription', { ns: 'petTraining' })} />
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
          {t('mainHeading', { ns: 'petTraining' })}
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Typography variant="body1" component="p" sx={{ mb: 3 }} gutterBottom>
              {t('description.paragraph1', { ns: 'petTraining' })}
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 3 }} gutterBottom>
              {t('description.paragraph2', { ns: 'petTraining' })}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {videos.map((video, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
              <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
                <CardMedia component="div" sx={{ position: 'relative', pt: '56.25%' }}>
                  <iframe
                    src={video.src}
                    title={t(`videos.titles.${video.key}`, { ns: 'petTraining' })}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                  />
                </CardMedia>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: {
                        xs: '1rem',
                        sm: '1rem',
                        md: '1rem',
                        lg: '1.2rem',
                      },
                    }}
                  >
                    {t(`videos.titles.${video.key}`, { ns: 'petTraining' })}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('videos.source', { ns: 'petTraining' })}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 500,
            color: '#16477c',
            mt: 8,
            mb: 5,
            fontSize: { xs: '1.8rem', sm: '2rem' },
          }}
        >
          {t('tipsSection.heading', { ns: 'petTraining' })}
        </Typography>
        <Grid container spacing={3}>
          {trainingTips.map((tip, index) => (
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={index}>
              <Accordion
                sx={{
                  py: 1,
                  borderRadius: 3,
                  background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0px 3px 10px rgba(0,0,0,0.1)',
                    transform: 'scale(1.01)',
                    background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${index}-content`}
                  id={`panel-${index}-header`}
                >
                  <Box display="flex" alignItems="center">
                    <IconButton color="primary" size="small" sx={{ mr: 2, backgroundColor: '#f7f9fd' }}>
                      <TipsAndUpdatesIcon />
                    </IconButton>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: '#16477c', fontSize: { xs: '0.9rem', sm: '1rem' } }}
                    >
                      {t(`trainingTips.${tip.key}.title`, { ns: 'petTraining' })}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    sx={{ color: '#444', fontSize: { xs: '0.9rem', sm: '1rem' }, lineHeight: 1.6 }}
                  >
                    {t(`trainingTips.${tip.key}.description`, { ns: 'petTraining' })}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default PetTraining;
