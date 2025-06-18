import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Pets } from '@mui/icons-material';
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
  Typography,
} from '@mui/material';

import collaborateImage from '../../../assets/images/collaboration/creative_team_amico_blue.svg';

const collaborationPoints = [
  'Dzīvnieku patversmēm un glābšanas organizācijām – lai palīdzētu ātrāk atrast mājas pazudušajiem mājdzīvniekiem.',
  'Veterinārajām klīnikām un speciālistiem – lai sniegtu vērtīgus padomus mājdzīvnieku īpašniekiem.',
  'Tehnoloģiju un datu partnerībām – lai uzlabotu mākslīgā intelekta un datu analīzes iespējas pazudušo mājdzīvnieku atrašanā.',
  'Sociālo tīklu un mediju sadarbībām – lai informācija par pazudušiem dzīvniekiem izplatītos pēc iespējas plašāk.',
  'Izstrādātājiem un dizaineriem – ja jūs vēlaties pievienoties mūsu komandai, lai uzlabotu lietotnes funkcionalitāti vai dizainu, mēs būsim priecīgi sadarboties.',
];

const Collaborate = () => {
  return (
    <React.Fragment>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Sadarbības iespējas - Mājdzīvnieku platforma</title>
        <meta
          name="description"
          content="Izpētiet dažādas sadarbības iespējas ar mūsu platformu, lai palīdzētu atrast mājas pazudušajiem mājdzīvniekiem un uzlabotu dzīvnieku aprūpi."
        />
        <meta
          name="keywords"
          content="sadarbība, dzīvnieki, mājdzīvnieki, patversmes, veterinārās klīnikas, partnerības, tehnoloģijas"
        />
        <meta property="og:title" content="Sadarbības iespējas - Mājdzīvnieku platforma" />
        <meta
          property="og:description"
          content="Izpētiet dažādas sadarbības iespējas ar mūsu platformu, lai palīdzētu atrast mājas pazudušajiem mājdzīvniekiem un uzlabotu dzīvnieku aprūpi."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Container component="main" maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 5,
            fontWeight: 500,

            background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Sadarbības iespējas
        </Typography>
        <Grid container spacing={6} alignItems="center">
          {/* Left Side - Illustration */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                src={collaborateImage}
                alt="Sadarbība"
                sx={{
                  width: { xs: '100%', sm: '80%', md: '100%' },
                  objectFit: 'contain',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  borderRadius: 2,
                  mb: 1,
                }}
              />
              <MuiLink
                href="https://storyset.com/people"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: '0.6rem',
                  fontStyle: 'italic',
                  color: '#999',
                  fontWeight: 300,
                }}
              >
                People illustrations by Storyset
              </MuiLink>
            </Box>
          </Grid>

          {/* Right Side - Content */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Mēs ticam, ka kopīga sadarbība var padarīt mūsu platformu vēl labāku! Ja esat dzīvnieku patversme,
              veterinārā klīnika, tehnoloģiju uzņēmums vai vienkārši kaislīgs dzīvnieku mīļotājs, mēs labprāt uzklausītu
              jūsu idejas.
            </Typography>

            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500, color: '#16477c' }}>
              Mēs esam atvērti dažāda veida partnerībām:
            </Typography>

            <List dense>
              {collaborationPoints.map((point, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Pets fontSize="small" sx={{ color: '#16477c' }} />
                  </ListItemIcon>
                  <ListItemText primary={point} />
                </ListItem>
              ))}
            </List>

            <Typography variant="body1" sx={{ mt: 3, mb: 4 }}>
              Ja jums ir idejas vai vēlme sadarboties, sazinieties ar mums! Kopā mēs varam radīt drošāku un atbalstošāku
              vidi mājdzīvnieku īpašniekiem.
            </Typography>

            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)',
              }}
              href="/contact"
              fullWidth
            >
              Sazināties ar mums
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Collaborate;
