import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  Typography,
  Grid,
  Box,
  CardMedia,
  Link as MuiLink,
  Button,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Pets, CopyAll } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SupportImg from '../../../assets/images/support/cat_astronaut_cuate_blue.svg';
import CollaborationtImg from '../../../assets/images/collaboration/creative_team_amico_blue.svg';
import { DOMAIN_URL, PAYPAL_BUTTON_ID } from '../../../constants/config';
const collaborationPoints = [
  'Dzīvnieku patversmēm un glābšanas organizācijām – lai palīdzētu ātrāk atrast mājas pazudušajiem mājdzīvniekiem.',
  'Veterinārajām klīnikām un speciālistiem – lai sniegtu vērtīgus padomus mājdzīvnieku īpašniekiem.',
  'Tehnoloģiju un datu partnerībām – lai uzlabotu mākslīgā intelekta un datu analīzes iespējas pazudušo mājdzīvnieku atrašanā.',
  'Sociālo tīklu un mediju sadarbībām – lai informācija par pazudušiem dzīvniekiem izplatītos pēc iespējas plašāk.',
  'Izstrādātājiem un dizaineriem – ja jūs vēlaties pievienoties mūsu komandai, lai uzlabotu lietotnes funkcionalitāti vai dizainu, mēs būsim priecīgi sadarboties.',
];
// Points to show in the list of how people can support the project
const supportPoints = [
  'Finansiāls atbalsts hostinga vai mākoņservisu segšanai.',
  'Sponsorēšana lietotnes jaunu funkciju attīstībai.',
  'Dalīšanās mūsu projektā sociālajos medijos.',
  'Ieteikumi vai kontakti, kas var palīdzēt izaugsmei.',
];

const Support = () => {
  // Function to copy the URL to the clipboard
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(DOMAIN_URL).then(
      () => toast.success('URL nokopēta!'), // Success toast notification when URL is copied
      () => toast.error('Neizdevās nokopēt URL') // Error toast notification when copying fails
    );
  };

  return (
    <React.Fragment>
      {/* Helmet for SEO metadata */}
      <Helmet>
        <title>Atbalstīt projektu | PawClix</title>
        <meta
          name="description"
          content="Palīdzi mums attīstīt PawClix platformu un atbalstīt mūsu projektu! Uzzini, kā vari palīdzēt, daloties, ziedojot vai sponsorējot."
        />
        <meta
          name="keywords"
          content="atbalstīt projektu, ziedot, sponsorēt, palīdzēt dzīvniekiem, pazudušie mājdzīvnieki, PawClix"
        />
        <meta property="og:title" content="Atbalstīt projektu | PawClix" />
        <meta
          property="og:description"
          content="Palīdzi mums attīstīt PawClix platformu un atbalstīt mūsu projektu! Uzzini, kā vari palīdzēt, daloties, ziedojot vai sponsorējot."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      {/* Toast notifications for success and error messages */}
      <ToastContainer />

      <Container component="main" maxWidth="lg">
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
          Atbalstīt projektu
        </Typography>
        <Grid container spacing={6} alignItems="center">
          {/* Left Side - Illustration Section */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                src={CollaborationtImg}
                alt="Atbalsts"
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
                Business illustrations by Storyset
              </MuiLink>
            </Box>
          </Grid>

          {/* Right Side - Content Section */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Mēs ticam, ka kopīga sadarbība var padarīt mūsu platformu vēl labāku! Ja esat dzīvnieku patversme,
              veterinārā klīnika, tehnoloģiju uzņēmums vai vienkārši kaislīgs dzīvnieku mīļotājs, mēs labprāt uzklausītu
              jūsu idejas.
            </Typography>

            <Typography variant="h6" sx={{ my: 1, fontWeight: 500, color: '#16477c' }}>
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
          </Grid>
        </Grid>
        {/* Bottom part  */}
        <Grid container spacing={6} alignItems="center">
          {/* Left Side - Illustration Section */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Mēs esam pateicīgi par jebkādu atbalstu vai sponsora palīdzību, kas var palīdzēt mums atklāt pilnu mūsu
              tīmekļa lietotnes potenciālu. Ja jūs dalāties mūsu redzējumā un vēlētos ieguldīt premium līmeņu un
              pakalpojumu izmantošanas izmaksās, lūdzu, sazinieties ar mums.
            </Typography>
            <Typography variant="h6" sx={{ my: 1, fontWeight: 500, color: '#16477c' }}>
              Veidi, kā jūs varat palīdzēt:
            </Typography>

            {/* List of support options */}
            <List dense>
              {supportPoints.map((point, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Pets fontSize="small" sx={{ color: '#16477c' }} /> {/* Icon for each support point */}
                  </ListItemIcon>
                  <ListItemText primary={point} />
                </ListItem>
              ))}
            </List>

            <Typography variant="body1" sx={{ mt: 3 }}>
              Jūs arī varat atbalstīt mūsu projektu, vienkārši daloties ar šo saiti:
            </Typography>

            {/* Shareable URL with copy functionality */}
            <Box display="flex" alignItems="center" sx={{ my: 2 }}>
              <TextField
                fullWidth
                value="https://pawclix.com"
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
              Jūs varat arī ziedot mūsu projektam, lai palīdzētu mums attīstīties! Ziedojumi tiek apstrādāti, izmantojot
              drošu PayPal platformu, kas garantē jūsu datu aizsardzību. Jūsu atbalsts ir ļoti svarīgs, un mēs to augstu
              vērtējam.
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
                Ziedot tagad
              </Button>
            </Box>
          </Grid>

          {/* Right Side - Content Section */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                src={SupportImg}
                alt="Atbalsts"
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
                Business illustrations by Storyset
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Support;
