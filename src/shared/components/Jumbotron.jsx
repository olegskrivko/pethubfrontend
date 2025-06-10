import React from 'react';
import { Grid, Card, CardContent, Typography, Button, useMediaQuery, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Jumbotron = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Adjust for small screens

  return (
    <Grid container spacing={3} mt={4}>
      {/* Left Side: Paragraph */}
      <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
       
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: "#f7f9fd" }}>
        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Typography variant="h5"  gutterBottom >
            Atbalstiet mūsu projektu
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph >
            Jūsu atbalsts palīdzēs mums turpināt mūsu misiju apvienot pazudušos mājdzīvniekus ar viņu ģimenēm. Jūs varat arī atbalstīt mūs, daloties ar saiti sociālajos tīklos vai pastāstot draugiem par mūsu tīmekļa lietotni. Katrs ieguldījums, liels vai mazs, ir svarīgs, un mēs patiesi novērtējam jūsu atbalstu!
            </Typography>
            <Button
              component={Link}
              to="/support"
              variant="contained"
                 style={{
        // padding: '12px 28px',
        fontSize: '1rem',
        fontWeight: 'bold',
        background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)",
        color: '#fff',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
            >
              Atbalstīt
            </Button>
          </CardContent>
        </Card>
    
      </Grid>

      {/* Right Side: Call-to-Action Card */}
      <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
            Dalieties ar savu viedokli
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
            Jūsu atsauksmes ir svarīgas, jo mēs cenšamies uzlabot mūsu lietotni un sniegt labāko pakalpojumu mājdzīvnieku īpašniekiem. Lūdzu, dalieties ar saviem komentāriem, ieteikumiem vai kritiku, lai palīdzētu mums padarīt lietotni vēl labāku.
            </Typography>
            <Button
              component={Link}
              to="/feedback"
              variant="outlined"
          
                 style={{
        // padding: '12px 28px',
        fontSize: '1rem',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        
        color: '#0994ba',
 
        border: "2px solid  #0994ba ",
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
            >
              Atstāt atsauksmi
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Jumbotron;
