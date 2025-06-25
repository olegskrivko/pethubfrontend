import React from 'react';
import { Helmet } from 'react-helmet-async';
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
  return (
    <>
      <Helmet>
        <title>Par Mums - Mājdzīvnieku Meklēšanas Platforma</title>
        <meta
          name="description"
          content="Mūsu lietotne palīdz atrast pazudušus mājdzīvniekus, izmantojot modernās tehnoloģijas, reāllaika paziņojumus un kopienas atbalstu. Uzziniet vairāk par mūsu vīziju un misiju."
        />
        <meta
          name="keywords"
          content="pazudis mājdzīvnieks, atrasts mājdzīvnieks, mājdzīvnieku meklēšana, mājdzīvnieku platforma, pazudušu dzīvnieku karte, paziņojumi par dzīvniekiem, dzīvnieku īpašnieku palīdzība, dzīvnieku glābšana, QR kods plakāts, sabiedrības atbalsts dzīvniekiem"
        />
        <meta property="og:title" content="Par Mums - Mājdzīvnieku Meklēšanas Platforma" />
        <meta
          property="og:description"
          content="Mūsu lietotne palīdz atrast pazudušus mājdzīvniekus, izmantojot modernās tehnoloģijas, reāllaika paziņojumus un kopienas atbalstu. Uzziniet vairāk par mūsu vīziju un misiju."
        />
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
          Lietotnes mērķis
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Typography variant="body1">
              Lietotne izstrādāta, lai efektīvi palīdzētu pazudušiem mājdzīvniekiem ātrāk atgriezties pie saviem
              saimniekiem. Tā atvieglo informācijas apmaiņu un ļauj pārskatāmi sekot meklēšanas procesa norisei.
              Lietotne izceļas ar modernu dizainu, reāllaika paziņojumiem un mākslīgā intelekta funkcijām.
              {/* Tā ir
              paredzēta kā centrālais resurss ar plašu informāciju un pakalpojumiem, kas saistīti ar mājdzīvnieku aprūpi
              un labklājību. Lietotāji var pievienot savus pakalpojumus, ļaujot mājdzīvnieku īpašniekiem ātri un ērti
              atrast visu nepieciešamo vienuviet. */}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 500, color: '#16477c', mt: 8, mb: 4 }}>
              Ceļš uz risinājumu
            </Typography>
          </Grid>
        </Grid>
        {/* Left Paragraph */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
            <Typography variant="h5" textAlign="left" gutterBottom sx={{ color: '#00b5ad' }}>
              Meklēšanas izaicinājumi
            </Typography>
            <Typography variant="body1" component="p" gutterBottom style={{ textAlign: 'left' }}>
              Pazudušu dzīvnieku plakāti uz ielām bieži rada neskaidrības — vai dzīvnieks jau ir atrasts, vai vēl tiek
              meklēts. Bez papildus informācijas plakāti var maldināt, jo tie netiek laicīgi atjaunoti vai noņemti.
              Turklāt plakāti āra apstākļos bojājas, samazinot to efektivitāti.
            </Typography>
            <Typography variant="body1" component="p" gutterBottom style={{ textAlign: 'left' }}>
              Papildus informācija par pazudušiem dzīvniekiem bieži ir izkliedēta dažādos sociālo tīklu kanālos un
              platformās, kas apgrūtina efektīvu un ātru palīdzības sniegšanu. Lai risinātu šīs problēmas, tiek
              piedāvāti profesionāli izstrādāti plakāti ar QR kodiem, kas ļauj ātri piekļūt aktuālākajai informācijai
              par konkrēto dzīvnieku digitālajā platformā. Šī pieeja nodrošina pārskatāmu un vienmēr aktuālu meklēšanas
              procesa uzraudzību.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
            <Box position="relative" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <CardMedia component="img" src={img1} alt="QR code image" />
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
                  Technology illustrations by Storyset
                </MuiLink>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Righ Paragraph */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }} order={{ xs: 2, md: 1 }}>
            <Box position="relative" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <CardMedia
                component="img"
                src={img2}
                alt="Web api image"
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
                  Technology illustrations by Storyset
                </MuiLink>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }} order={{ xs: 1, md: 2 }}>
            <Typography variant="h5" textAlign="left" gutterBottom sx={{ color: '#00b5ad' }}>
              Inovatīvs risinājums
            </Typography>
            <Typography variant="body1" component="p" style={{ textAlign: 'left' }}>
              Lai efektīvi risinātu pazudušu mājdzīvnieku meklēšanas problēmas, tika izveidota lietone, kas apvieno
              informāciju vienuviet un ļauj viegli piekļūt aktuālākajiem datiem. Tā paplašina tradicionālo meklēšanas
              metožu iespējas, integrējot reāllaika paziņojumus un interaktīvus elementus, piemēram, QR kodus uz
              plakātiem. Šāda pieeja nodrošina ātru un ērtu informācijas apmaiņu, veicina kopienas iesaisti un ļauj
              sniegt atbalstu arī tiem, kuriem ir grūtības izmantot sociālos tīklus vai citas platformas.
            </Typography>
            <List dense disablePadding sx={{ mt: 2 }}>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Reāllaika paziņojumi par pazudušajiem mājdzīvniekiem" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Interaktīvi QR kodi uz plakātiem" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Iespēja lietotājiem atzīmēt mājdzīvnieku atrašanās vietu kartē" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Iespēja saglabāt sludinājumus ērtai statusa izsekošanai" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 30, color: '#00b5ad' }}>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Lietotni var lejupielādēt ērtākai piekļuvei" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        {/* Left Paragraph */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
            <Typography variant="h5" textAlign="left" gutterBottom sx={{ color: '#00b5ad' }}>
              Rezultāts un attīstības virziens
            </Typography>

            <Typography variant="body1" component="p" gutterBottom style={{ textAlign: 'left' }}>
              Lietotne izveidota, lai risinātu konkrētas problēmas un radītu ilgtspējīgu vērtību sabiedrībai, un tiek
              pastāvīgi pilnveidota. No vienkāršas idejas tā attīstījusies par jaudīgu rīku, kas efektīvi atbalsta
              mājdzīvnieku īpašniekus krīzes situācijās. Platforma apvieno modernu dizainu, mākslīgā intelekta
              risinājumus un ērtu lietojamību, padarot dzīvnieku meklēšanu caurskatāmu un rezultatīvu.
            </Typography>

            <Typography variant="body1" component="p" gutterBottom style={{ textAlign: 'left' }}>
              Lietotāji var bez maksas publicēt pazudušos un atrastos mājdzīvniekus, kā arī atrast saistītus
              pakalpojumus, patversmes un saņemt praktiskus padomus ārkārtas situācijās.
            </Typography>

            <Typography variant="body1" component="p" style={{ textAlign: 'left' }}>
              Platforma darbojas pateicoties bezmaksas pieejām un aktīvai kopienas iesaistei. Projekts turpina
              attīstīties, ieviešot jaunas funkcijas, lai stiprinātu kopienas atbalstu un palielinātu platformas
              ietekmi.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
            <Box position="relative" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <CardMedia
                component="img"
                src={img3}
                alt="Navigation image"
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
                  City illustrations by Storyset
                </MuiLink>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Jumbotron />
      </Container>
    </>
  );
}

export default About;
