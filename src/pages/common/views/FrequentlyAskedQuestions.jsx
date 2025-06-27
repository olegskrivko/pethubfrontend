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

const FrequentlyAskedQuestions = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation('faq');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Get FAQ items from translation
  const steps = t('faqs', { returnObjects: true });

  return (
    <React.Fragment>
      <Helmet>
        {/* Dynamically set the language attribute on <html> */}
        <html lang={i18n.language || 'lv'} />

        {/* Dynamic title */}
        <title>{t('title')} | Lunori</title>

        {/* Dynamic description */}
        <meta name="description" content="Atbildes uz biežāk uzdotajiem jautājumiem par Lunori platformu. Uzziniet, kā strādā mūsu platforma un kā palīdzēt atrast pazudušos mājdzīvniekus." />

        {/* Keywords (optional) */}
        <meta name="keywords" content="FAQ, jautājumi, atbildes, pazudušie mājdzīvnieki, Lunori, palīdzība" />

        {/* Open Graph tags for social */}
        <meta property="og:title" content={`${t('title')} | Lunori`} />
        <meta property="og:description" content="Atbildes uz biežāk uzdotajiem jautājumiem par Lunori platformu. Uzziniet, kā strādā mūsu platforma un kā palīdzēt atrast pazudušos mājdzīvniekus." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
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
          {t('title')}
        </Typography>
        <Grid container spacing={3}>
          {steps.map((step, index) => (
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
                  // sx={{ px: 2, py: 1.5 }}
                >
                  <Box display="flex" alignItems="center">
                    <IconButton color="primary" size="small" sx={{ mr: 2, backgroundColor: '#f7f9fd' }}>
                      <TipsAndUpdatesIcon />
                    </IconButton>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, color: '#16477c', fontSize: { xs: '0.9rem', sm: '1rem' } }}
                    >
                      {step.question}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    sx={{ color: '#444', fontSize: { xs: '0.9rem', sm: '1rem' }, lineHeight: 1.6 }}
                  >
                    {step.answer}
                  </Typography>
                </AccordionDetails>

                {/* <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${index}-content`}
                  id={`panel-${index}-header`}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        mr: 2,
                        backgroundColor: '#f7f9fd',
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'primary.main',
                      }}
                    >
                      <TipsAndUpdatesIcon fontSize="small" />
                    </Box>

                    <Typography variant="h6">{step.question}</Typography>
                  </Box>
                </AccordionSummary> */}
                {/* <AccordionDetails>
                  <Typography variant="body1">{step.answer}</Typography>
                </AccordionDetails> */}
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default FrequentlyAskedQuestions;
