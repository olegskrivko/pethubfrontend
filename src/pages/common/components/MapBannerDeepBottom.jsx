import React from 'react';
//import illustration from '../pages/images/navigation_cuate.svg';
import { useNavigate } from 'react-router-dom';

import { useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

//import illustration from '../pages/images/innovation_amico_blue.svg'; // replace with your own SVG

import illustration from '../../../assets/images/home/innovation_animate.svg';

{
  /* <a href="https://storyset.com/city">City illustrations by Storyset</a> */
}
const MapBanner = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        // background: 'linear-gradient(145deg, #e3f2fd, #ffffff)',
        background: 'linear-gradient( #e3f2fd, #ffffff)',
        // padding: '60px 40px',
        minHeight: '500px',
        position: 'relative',
      }}
    >
      <Container
        component="main"
        maxWidth="lg"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',

          // padding: '60px 40px',
          // minHeight: '500px',
          // position: 'relative',
        }}
        sx={{
          py: 6,
          // paddingLeft: "0",
          // paddingRight: "0"
        }}
      >
        {/* LEFT SIDE */}
        {/* <div
        style={{
          flex: '1 1 400px',
          maxWidth: '600px',
          paddingRight: '40px',
          zIndex: 2,
        }}
      > */}
        <div
          style={{
            flex: '1 1 400px',
            maxWidth: '600px',
            paddingRight: isSmallScreen ? '0' : '40px',
            zIndex: 2,
            textAlign: isSmallScreen ? 'center' : 'left', // 🔁 Text centered on small screens
            display: 'flex',
            flexDirection: 'column',
            alignItems: isSmallScreen ? 'center' : 'flex-start', // 🔁 Button alignment
          }}
        >
          {' '}
          <h2
            style={{
              textAlign: isSmallScreen ? 'center' : 'left',
              fontSize: isSmallScreen ? '1.75rem' : '2.5rem', // 👈 Responsive font size
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              marginBottom: '1rem',
              background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Praktiski padomi mājdzīvnieku aprūpei
          </h2>
          {/* <h2
            style={{
              color: '#0D47A1',
              fontSize: '2.5rem',
              fontWeight: 600,
              marginBottom: '1rem',
         
              fontFamily: "Inter', sans-serif",
              background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Praktiski padomi mājdzīvnieku aprūpei
          </h2> */}
          <p
            style={{
              color: '#616f7d',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              marginBottom: '2rem',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Uzzini, kā vislabāk parūpēties par savu mīluli – no ikdienas aprūpes līdz rīcībai ārkārtas situācijās.
            Praktiski padomi, ceļveži un atbildes uz svarīgiem jautājumiem vienuviet.
          </p>
          {/* Button Group */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {/* <button
              style={{
                padding: '12px 28px',
                fontSize: '1rem',
                fontWeight: 'bold',
               
                background: 'linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)',
                color: '#fff',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onClick={() => navigate('/articles')}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#0a98c2';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#0EB9F0';
              }}
            >
              Apskatīt padomus
            </button> */}
            <Button variant="contained" sx={{ borderRadius: 2 }} color="primary" onClick={() => navigate('/articles')}>
              Apskatīt padomus
            </Button>
          </div>
        </div>

        {/* RIGHT SIDE - SVG IMAGE */}
        <div
          style={{
            flex: '1 1 400px',
            maxWidth: '500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={illustration}
            alt="Illustration"
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
            }}
          />
        </div>
      </Container>
    </div>
  );
};

export default MapBanner;
