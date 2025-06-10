import React from 'react';
import {
  Box,
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const steps = [

        {
          question: 'Kāda ir atšķirība starp "Redzēts" un "Atradis"?',
          answer:
            '“Redzēts” nozīmē, ka kāds ir pamanījis mājdzīvnieku, bet nav to noķēris. “Atradis” norāda, ka dzīvnieks ir fiziski pie īpašnieka vai glabāšanā pie atradēja.',
        },
        {
          question: 'Kas palīdz atrast pazudušos dzīvniekus?',
          answer:
            'Kopiena ir galvenais dzinējspēks – cilvēki, kuri dalās, ziņo par redzētiem dzīvniekiem vai tos uzņem. Mūsu platforma savieno atradējus ar īpašniekiem.',
        },
        {
          question: 'Kā es varu paziņot par atrastu mājdzīvnieku?',
          answer:
            'Vienkārši piesakieties un publicējiet atraduma ziņojumu ar attēlu, atrašanās vietu un aprakstu. Tas palīdz īpašniekiem jūs atrast.',
        },
        {
          question: 'Ko darīt, ja redzu mājdzīvnieku, bet nevaru to noķert?',
          answer:
            'Izmantojiet funkciju “Redzēts” un publicējiet informāciju ar aprakstu, laiku un vietu. Tas var būt ļoti noderīgi īpašniekiem!',
        },
        {
          question: 'Vai varu izmantot platformu arī no mobilā telefona?',
          answer:
            'Jā! Mūsu mājaslapa ir pilnībā pielāgota mobilajām ierīcēm. Varat pievienot paziņojumus, meklēt dzīvniekus un sazināties ar atradējiem jebkur.',
        },
        {
          question: 'Cik ilgi paliek aktīvs mans sludinājums?',
          answer:
            'Sludinājums paliek aktīvs līdz jūs to manuāli noņemat vai atzīmējat kā “atrasts” / “atdots īpašniekam”.',
        },
        {
          question: 'Vai ir kādi drošības padomi, satiekot atradēju vai īpašnieku?',
          answer:
            'Vienmēr satikties publiskās vietās, ja iespējams. Ja jūtaties nedroši, ņemiet līdzi draugu vai izvēlieties veterināro klīniku kā tikšanās vietu.',
        },
        {
            question: 'Vai varu pievienot citus dzīvniekus, ne tikai suņus vai kaķus?',
            answer:
              'Jā, protams! Lai gan platforma vairāk orientēta uz suņiem un kaķiem, jūs varat pievienot arī citus dzīvniekus, izvēloties sugu "Cits".',
          },
          {
            question: 'Vai varu piedāvāt atlīdzību par mājdzīvnieka atrašanu?',
            answer:
              'Mēs neveicinām atlīdzības piedāvāšanu, jo tas var radīt neparedzētas situācijas. Kopiena bieži palīdz no sirds – galvenais mērķis ir droši atgriezt mājdzīvnieku mājās.',
          }
   
      
];


const FrequentlyAskedQuestions = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <Container component="main" maxWidth="lg" > 
      {/* <Typography variant="h3" align="center" sx={{ mb: 5, fontWeight: 500 }}>
        Biežāk uzdotie jautājumi
      </Typography> */}
  <Typography variant="h4" align="center" sx={{ mb: 5, fontWeight: 800,
       
              
                      
                      background: "linear-gradient(60deg, #16477c 0%, #00b5ad 100%)",
                      WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
           }}>Biežāk uzdotie jautājumi</Typography>
      <Grid container spacing={3}>
        {steps.map((step, index) => (
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={index}>
            <Accordion>
              <AccordionSummary
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
              </AccordionSummary>
              <AccordionDetails >
                <Typography variant="body1">{step.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FrequentlyAskedQuestions;
