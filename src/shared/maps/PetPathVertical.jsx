import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import petIcon1 from '../pages/images/dog_icon1.jpg';
import petIcon2 from '../pages/images/dog_icon2.jpg';
import petIcon3 from '../pages/images/dog_icon3.jpg';
import petIcon4 from '../pages/images/cat_icon2.jpg';

const pets = [
  { src: petIcon1, x: '5%', y: '60%', size: 50 },
  { src: petIcon4, x: '18%', y: '35%', size: 66 },
  { src: petIcon3, x: '32%', y: '75%', size: 58 },

];

const PetPath = () => {
  return (
  
    <Box
      sx={{
        position: 'relative',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
      }}
    >
          <Typography variant="h4" fontWeight={600} gutterBottom style={{color: "#16477c"}}>
        Vieda un ērta sludinājumu pārvaldība
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: '600px',
          margin: '0 auto',
          color: '#555',
        }}
      >
        Pateicoties ērtam dizainam un filtriem, meklēšana starp sludinājumiem kļūst vienkārša un patīkama. Saglabā sludinājumus savā profilā, lai jebkurā laikā varētu viegli sekot līdzi to statusam.
      </Typography>
    <Box
  sx={{
    position: 'relative',
    width: '100%',
    height: '800px',
    marginTop: '40px',
  }}
>
  {/* Dashed SVG Line */}

<svg
  viewBox="0 0 1000 800"
  preserveAspectRatio="none"
  style={{
    width: '100%',
    height: '800px',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  }}
>
  <path
    d="
      M 0 100
      C 250 300, 500 300, 400 500
      S 150 700, 0 600
    "
    fill="none"
    stroke="#ccc"
    strokeDasharray="10 10"
    strokeWidth="2"
  />
</svg>



  {/* Pet Avatars with Custom Sizes */}
  {pets.map((pet, index) => (
    <Avatar
      key={index}
      src={pet.src}
      alt={`Pet ${index}`}
      sx={{
        position: 'absolute',
        width: pet.size,
        height: pet.size,
        border: '4px solid white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        objectFit: 'cover',
        left: pet.x,
        top: `calc(${pet.y} - ${pet.size / 1}px)`, // 🔧 offsets Y upward based on size
        zIndex: 2,
      }}
    />
  ))}
</Box>
</Box>
  );
};

export default PetPath;
