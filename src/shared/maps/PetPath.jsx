// import React from 'react';
// import { Box, Typography, Avatar } from '@mui/material';
// import petImage from '../pages/images/avatars/avatars/Koala.svg'

// const pets = [
//   { src: petImage, x: '10%', y: '60%' },
//   { src: petImage, x: '20%', y: '40%' },
//   { src: petImage, x: '35%', y: '70%' },
//   { src: petImage, x: '55%', y: '30%' },
//   { src: petImage, x: '70%', y: '65%' },
//   { src: petImage, x: '85%', y: '45%' },
// ];

// const PetPath = () => {
//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         textAlign: 'center',
//         // padding: '4rem 2rem',
//         backgroundColor: '#ffffff',
//         overflow: 'hidden',
//       }}
//     >
//       <Typography variant="h4" fontWeight={600} gutterBottom>
//         The app to find your pet back
//       </Typography>
//       <Typography
//         variant="body1"
//         sx={{
//           maxWidth: '600px',
//           margin: '0 auto',
//           color: '#555',
//         }}
//       >
//         Helping you reunite with your furry friends through smart search, 
//         community reports and more. Stay connected and never lose hope.
//       </Typography>

//       <Box
//         sx={{
//           position: 'relative',
//           width: '100%',
//           height: '200px',
//           marginTop: '40px',
//         }}
//       >
//         {/* Dashed SVG Line */}
//         {/* <svg
//           viewBox="0 0 1000 200"
//           style={{
//             width: '100%',
//             height: '200px',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             zIndex: 1,
//           }}
//         >
//           <path
//             d="M 0 100 Q 250 0 500 100 Q 750 200 1000 100"
//             fill="none"
//             stroke="#ccc"
//             strokeDasharray="10 10"
//             strokeWidth="2"
//           />
//         </svg> */}
// {/* <svg
//   viewBox="0 0 1000 200"
//   preserveAspectRatio="none"
//   style={{
//     width: '100%',
//     height: '200px',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     zIndex: 1,
//   }}
// >
//   <polyline
//     points="0,100 200,50 400,150 600,50 800,150 1000,100"
//     fill="none"
//     stroke="#ccc"
//     strokeDasharray="10 10"
//     strokeWidth="2"
//   />
// </svg> */}
// <svg
//   viewBox="0 0 1000 200"
//   preserveAspectRatio="none"
//   style={{
//     width: '100%',
//     height: '200px',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     zIndex: 1,
//   }}
// >
//   <polyline
//     points="
//       0,40
//       150,80
//       300,30
//       450,120
//       600,60
//       750,160
//       900,90
//       1000,180"
//     fill="none"
//     stroke="#ccc"
//     strokeDasharray="10 10"
//     strokeWidth="2"
//   />
// </svg>

// {/* <svg
//   viewBox="0 0 1000 200"
//   preserveAspectRatio="none"
//   style={{
//     width: '100%',
//     height: '200px',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     zIndex: 1,
//   }}
// >
//   <path
//     d="M 0 100 Q 125 25 250 100 Q 375 175 500 100 Q 625 25 750 100 Q 875 175 1000 100"
//     fill="none"
//     stroke="#ccc"
//     strokeDasharray="10 10"
//     strokeWidth="2"
//   />
// </svg> */}

//         {/* Pet Avatars */}
//         {pets.map((pet, index) => (
//           <Avatar
//             key={index}
//             src={pet.src}
//             alt={`Pet ${index}`}
//             sx={{
//               position: 'absolute',
//               width: 56,
//               height: 56,
//               border: '4px solid white',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//               objectFit: 'cover',
//               top: pet.y,
//               left: pet.x,
//               zIndex: 2,
//             }}
//           />
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default PetPath;
import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import petIcon1 from '../pages/images/dog_icon1.jpg';
import petIcon2 from '../pages/images/dog_icon2.jpg';
import petIcon3 from '../pages/images/dog_icon3.jpg';
import petIcon4 from '../pages/images/cat_icon2.jpg';
import petIcon5 from '../pages/images/pet_icon_1.jpg';
import petIcon6 from '../pages/images/pet_icon_2.jpg';

const pets = [
  { src: petIcon1, x: '5%', y: '60%', size: 50 },
  { src: petIcon2, x: '18%', y: '35%', size: 66 },
  { src: petIcon3, x: '32%', y: '75%', size: 58 },
  { src: petIcon4, x: '52%', y: '25%', size: 74 },
  { src: petIcon5, x: '68%', y: '70%', size: 52 },
  { src: petIcon6, x: '85%', y: '50%', size: 68 },
];

const PetPath = () => {
  return (
    // <Box
    //   sx={{
    //     position: 'relative',
    //     textAlign: 'center',
    //     backgroundColor: '#ffffff',
    //     overflow: 'hidden',
    //   }}
    // >
    //   <Typography variant="h4" fontWeight={600} gutterBottom>
    //     The app to find your pet back
    //   </Typography>
    //   <Typography
    //     variant="body1"
    //     sx={{
    //       maxWidth: '600px',
    //       margin: '0 auto',
    //       color: '#555',
    //     }}
    //   >
    //     Helping you reunite with your furry friends through smart search, 
    //     community reports and more. Stay connected and never lose hope.
    //   </Typography>

    //   <Box
    //     sx={{
    //       position: 'relative',
    //       width: '100%',
    //       height: '300px',
    //       marginTop: '40px',
    //     }}
    //   >
    //     {/* Dashed SVG Line */}
    //     <svg
    //       viewBox="0 0 1000 200"
    //       preserveAspectRatio="none"
    //       style={{
    //         width: '100%',
    //         height: '200px',
    //         position: 'absolute',
    //         top: 0,
    //         left: 0,
    //         zIndex: 1,
    //       }}
    //     >
    //       <polyline
    //         points="
    //           0,40
    //           150,80
    //           300,30
    //           450,120
    //           600,60
    //           750,160
    //           900,90
    //           1000,180"
    //         fill="none"
    //         stroke="#ccc"
    //         strokeDasharray="10 10"
    //         strokeWidth="2"
    //       />
    //     </svg>

    //     {/* Pet Avatars with Custom Sizes */}
    //     {pets.map((pet, index) => (
    //       <Avatar
    //         key={index}
    //         src={pet.src}
    //         alt={`Pet ${index}`}
    //         sx={{
    //           position: 'absolute',
    //           width: pet.size,
    //           height: pet.size,
    //           border: '4px solid white',
    //           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    //           objectFit: 'cover',
    //           top: pet.y,
    //           left: pet.x,
    //           zIndex: 2,
    //         }}
    //       />
    //     ))}
    //   </Box>
    // </Box>
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
    height: '300px',
    marginTop: '40px',
  }}
>
  {/* Dashed SVG Line */}
  {/* <svg
    viewBox="0 0 1000 200"
    preserveAspectRatio="none"
    style={{
      width: '100%',
      height: '200px',
      position: 'absolute',
      top: 20, // 🔧 was 0 — now moved down a bit
      left: 0,
      zIndex: 1,
    }}
  >
    <polyline
      points="
        0,40
        150,80
        300,30
        450,120
        600,60
        750,160
        900,90
        1000,180"
      fill="none"
      stroke="#ccc"
      strokeDasharray="10 10"
      strokeWidth="2"
    />
  </svg> */}
<svg
  viewBox="0 0 1000 200"
  preserveAspectRatio="none"
  style={{
    width: '100%',
    height: '200px',
    position: 'absolute',
    top: 20, // adjust for alignment with avatars
    left: 0,
    zIndex: 1,
  }}
>
  <path
    d="
      M 0 30
      C 100 0, 150 60, 200 50
      S 300 90, 400 70
      S 550 110, 600 100
      S 750 140, 800 120
      S 950 180, 1000 190
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
