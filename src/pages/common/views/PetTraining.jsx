import React from 'react';
import { Helmet } from 'react-helmet-async';

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
    title: 'Sāciet ar pamata komandām',
    description:
      'Sāciet ar pamatkomandām, piemēram, sēdi, paliec un nāc. Tās nodrošina pamatu turpmākai apmācībai un palīdz nostiprināt jūsu lomu kā līderim.',
  },
  {
    title: 'Izmantojiet pozitīvu pastiprinājumu',
    description:
      'Apbalvojiet savu mājdzīvnieku ar kārumiem, uzslavām vai spēlēm, kad tas izrāda vēlamo uzvedību. Pozitīvs pastiprinājums veicina šīs uzvedības atkārtošanu.',
  },
  {
    title: 'Esi konsekvents',
    description:
      'Konsekvence ir veiksmīgas apmācības atslēga. Pastāvīgi izmantojiet vienas un tās pašas norādes un atlīdzības, lai jūsu mājdzīvnieks saprastu, kas no viņa tiek gaidīts.',
  },
  {
    title: 'Saglabājiet treniņu sesijas īsas un pozitīvas',
    description:
      'Mājdzīvniekiem ir īss uzmanības noturības laiks, tāpēc treniņu sesijas saglabājiet īsas (apmēram 10-15 minūtes) un pozitīvas. Beidziet uz pozitīvas nots, lai viņi saglabātu interesi un gaidītu nākamo sesiju.',
  },
  {
    title: 'Pacietība ir būtiska',
    description:
      'Saprotiet, ka apmācībai nepieciešams laiks un pacietība. Izvairieties no vilšanās, ja progress ir lēns. Katrs mājdzīvnieks mācās savā tempā.',
  },
  {
    title: 'Izprotiet sava mājdzīvnieka šķirni un personību',
    description:
      'Dažādām šķirnēm ir dažādi temperamenti un uzvedība. Pielāgojiet savu apmācības pieeju, lai tā atbilstu jūsu mājdzīvnieka īpašajām vajadzībām un personībai.',
  },
  {
    title: 'Socializācija ir atslēga',
    description:
      'No agrīna vecuma iepazīstiniet savu mājdzīvnieku ar dažādām vidēm, cilvēkiem un dzīvniekiem. Pareiza socializācija palīdz novērst uzvedības problēmas un veido pārliecību.',
  },
  {
    title: 'Meklējiet profesionālu palīdzību, ja nepieciešams',
    description:
      'Ja jums ir grūtības ar apmācību vai sastopaties ar uzvedības problēmām, nevilcinieties meklēt palīdzību pie profesionāla trenera vai uzvedības speciālista.',
  },
  {
    title: 'Palieciet mierīgs un pozitīvs',
    description:
      'Mājdzīvnieki spēj sajust jūsu emocijas, tāpēc saglabājiet mieru un pacietību apmācību laikā. Jūsu pozitīvā attieksme palīdzēs radīt pozitīvu mācību vidi.',
  },
  {
    title: 'Izbaudiet procesu',
    description:
      'Jūsu mājdzīvnieka apmācībai vajadzētu būt jautram un vienojošam pieredzei jums abiem. Svērtiet katru sasniegumu un izbaudiet skatīšanos, kā jūsu mājdzīvnieks aug un mācās.',
  },
];

const videos = [
  {
    title: 'Komanda - Sēdēt un gulēt (ENG)',
    src: 'https://www.youtube.com/embed/NFSkzAuCjcI',
  },
  {
    title: 'Mērķēšana ar degunu (ENG)',
    src: 'https://www.youtube.com/embed/VJczka-U0D8',
  },
  {
    title: 'Pastaiga ar vaļīgu pavadu (ENG)',
    src: 'https://www.youtube.com/embed/Ya72yz1X40g',
  },
  {
    title: 'Komanda - Atgriezties atpakaļ (ENG)',
    src: 'https://www.youtube.com/embed/CUbZ6refFKA',
  },
  {
    title: 'Komanda - Pagaidi  (ENG)',
    src: 'https://www.youtube.com/embed/jnKxnUvlZcU',
  },
  {
    title: 'Triki un rotaļas (ENG)',
    src: 'https://www.youtube.com/embed/7qW2OU8n9ZM',
  },
];

const PetTraining = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Helmet>
        <title>Mājdzīvnieku apmācības nodarbības</title>
        <meta
          name="description"
          content="Apgūsti mājdzīvnieku apmācību ar video pamācībām un svarīgiem padomiem no ekspertiem. Uzlabo sava mājdzīvnieka uzvedību pozitīvā un jautrā veidā."
        />
        <meta
          name="keywords"
          content="mājdzīvnieku apmācība, suņu apmācība, kaķu apmācība, mājdzīvnieku uzvedība, pozitīva apmācība, mājdzīvnieku padomi, video pamācības, dzīvnieku uzvedība, suņu komandas, mājdzīvnieku socializācija"
        />
        <meta property="og:title" content="Virtuālās mājdzīvnieku apmācības nodarbības" />
        <meta
          property="og:description"
          content="Apgūsti mājdzīvnieku apmācību ar video pamācībām un svarīgiem padomiem no ekspertiem. Uzlabo sava mājdzīvnieka uzvedību pozitīvā un jautrā veidā."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Container component="main" maxWidth="lg">
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
          Suņu skola
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Typography variant="body1" component="p" sx={{ mb: 3 }} gutterBottom>
              Šis visaptverošais ceļvedis piedāvā rūpīgi izvēlētus video materiālus efektīvai suņu apmācībai. Tajā
              atradīsiet praktiskus resursus, kas palīdzēs apgūt būtiskas prasmes suņa uzvedības veidošanā.
            </Typography>
            <Typography variant="body1" component="p" sx={{ mb: 3 }} gutterBottom>
              Neatkarīgi no tā, vai esat jauns suņa īpašnieks vai vēlaties papildināt savas zināšanas, šie video aptver
              visu — sākot no pamata komandām līdz progresīvākām apmācības metodēm.
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
                    title={video.title}
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
                    {video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avots: RSPCA South Australia
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
          Būtiski padomi efektīvai mājdzīvnieku apmācībai
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
                      {tip.title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    sx={{ color: '#444', fontSize: { xs: '0.9rem', sm: '1rem' }, lineHeight: 1.6 }}
                  >
                    {tip.description}
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
