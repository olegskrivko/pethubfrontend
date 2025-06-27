import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Box, Button, Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Jumbotron = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('aboutPage');

  return (
    <Grid container spacing={3} mt={8}>
      {/* Left Side: Paragraph */}
      <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: {xs: 1, sm: 1, md: 2, lg: 2},
            borderRadius: 3,
            background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
          }}
        >
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', p: "0 !important" }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, color: '#16477c' }}>
              {t('jumbotron.supportTitle')}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {t('jumbotron.supportDescription')}
            </Typography>

            <Box mt="auto">

              <Button
            variant="contained"
            component={Link}
              to="/support"
            fullWidth
            sx={{ borderRadius: 2, mt: 4, py: 1 }}
            color="primary"
           
          >
            {t('jumbotron.supportButton')}
          </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Side: Call-to-Action Card */}
      <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            // px: 2,
            p: {xs: 1, sm: 1, md: 2, lg: 2},
            borderRadius: 3,
            background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
          }}
        >
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'center', p: "0 !important" }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, color: '#16477c' }}>
              {t('jumbotron.feedbackTitle')}
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              {t('jumbotron.feedbackDescription')}
            </Typography>

            <Box mt="auto">

              <Button
            variant="contained"
            component={Link}
              to="/contact"
            fullWidth
            sx={{ borderRadius: 2, mt: 4, py: 1 }}
            color="primary"
           
          >
            {t('jumbotron.feedbackButton')}
          </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Jumbotron;
