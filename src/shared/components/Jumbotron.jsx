import { Link } from 'react-router-dom';

import { Box, Button, Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Jumbotron = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={3} mt={8}>
      {/* Left Side: Paragraph */}
      <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            px: 2,
            borderRadius: 3,
            background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
          }}
        >
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, color: '#16477c' }}>
              Atbalstiet projektu
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Jūsu atbalsts palīdzēs mums turpināt mūsu misiju apvienot pazudušos mājdzīvniekus ar viņu ģimenēm. Jūs
              varat arī atbalstīt mūs, daloties ar saiti sociālajos tīklos vai pastāstot draugiem par mūsu tīmekļa
              lietotni. Katrs ieguldījums, liels vai mazs, ir svarīgs, un mēs patiesi novērtējam jūsu atbalstu!
            </Typography>

            <Box mt="auto">
              <Button
                variant="contained"
                component={Link}
                to="/support"
                fullWidth
                sx={{
                  py: 1,
                  background: 'linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)',
                }}
              >
                Atbalstīt projektu
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
            px: 2,
            borderRadius: 3,
            background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
          }}
        >
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, color: '#16477c' }}>
              Dalieties ar savu viedokli
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Jūsu atsauksmes ir svarīgas, jo mēs cenšamies uzlabot mūsu lietotni un sniegt labāko pakalpojumu
              mājdzīvnieku īpašniekiem. Lūdzu, dalieties ar saviem komentāriem, ieteikumiem vai kritiku, lai palīdzētu
              mums padarīt lietotni vēl labāku.
            </Typography>

            <Box mt="auto">
              <Button
                variant="contained"
                component={Link}
                to="/contact"
                fullWidth
                sx={{
                  py: 1,
                  background: 'linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)',
                }}
              >
                Atstāt atsauksmi
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Jumbotron;
