import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';

// Dummy images
import img1 from '../pages/images/cat_icon2.jpg';
import img2 from '../pages/images/dog_icon1.jpg';
import img3 from '../pages/images/dog_icon2.jpg';
import img4 from '../pages/images/dog_icon3.jpg';

const cardData = [
  {
    img: img1,
    title: '1. Iekļaušana mūsu mājaslapā',
    desc: 'Jūsu mājdzīvnieks tiek pievienots mūsu lapai, padarot ziņošanu par novērojumiem īpaši ērtu.',
    offset: -20, // higher
  },
  {
    img: img2,
    title: '2. Izdrukājams plakāts',
    desc: 'Saņemiet profesionāli izstrādātu pazudušā mājdzīvnieka plakātu ar QR kodu.',
    offset: 0, // default
  },
  {
    img: img3,
    title: '3. Saņemiet novērojumu ziņojumus',
    desc: 'Pārbaudiet jaunus novērojumus, ko ziņojusi kopiena, lai sekotu līdzi norādēm par savu mājdzīvnieku.',
    offset: -20, // higher
  },
  {
    img: img4,
    title: '4. Koplietošana sociālajos tīklos',
    desc: 'Dalieties ar sava mājdzīvnieka informāciju sociālajos tīklos, lai palielinātu redzamību.',
    offset: 0, // default
  },
];    

const PetCardsRow = () => {
  return (
    <Box sx={{ padding: '60px 20px', position: 'relative', backgroundColor: '#fff' }}>
      {/* Cards Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
          marginBottom: '40px',
        }}
      >
        {cardData.map((card, index) => (
          <Card
            key={index}
            sx={{
             width: 240,
             
              transform: `translateY(${card.offset}px)`,
              boxShadow: 3,
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'transform 0.3s ease',
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={card.img}
              alt={card.title}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight="600" style={{  fontFamily: '"Titillium Web", Verdana, Arial, sans-serif',   color: "#16477c",lineHeight: 1.3, letterSpacing: 0, marginBottom: "1.5rem"}}>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.desc}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    {/* font-family: "Titillium", Verdana, Arial, sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: 0;
    color: #16477c;
    margin-bottom: 1.5rem;
} */}
      {/* Dashed Line Below */}
      {/* <Box
        component="svg"
        viewBox="0 0 1000 2"
        preserveAspectRatio="none"
        sx={{
          width: '100%',
          height: '2px',
        }}
      >
        <line
          x1="0"
          y1="1"
          x2="1000"
          y2="1"
          stroke="#ccc"
          strokeWidth="2"
          strokeDasharray="10 10"
        />
      </Box> */}
    </Box>
  );
};

export default PetCardsRow;
