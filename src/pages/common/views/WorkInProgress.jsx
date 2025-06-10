// import React from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Typography,
//   Box,
//   Button,
//   Container,
//   CardMedia,
//   Link as MuiLink,
// } from '@mui/material';

// // Illustration for WIP (you can use any other image here)
// import WorkInProgressImage from '../images/developer_activity_amico_blue.svg';

// const WorkInProgress = () => {
//   return (
//     <Container maxWidth="sm">
//       <Box
//         sx={{
//           marginTop: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <CardMedia
//           component="img"
//           src={WorkInProgressImage}
//           alt="Work in Progress"
//           sx={{
//             width: {
//               xs: '100%',
//               sm: '400px',
//               md: '600px',
//               lg: '800px',
//             },
//             objectFit: 'contain',
//             pointerEvents: 'none',
//             userSelect: 'none',
//             border: 'none',
//           }}
//         />

//         <MuiLink
//           href="https://storyset.com/work"
//           target="_blank"
//           rel="noopener noreferrer"
//           sx={{
//             fontSize: '0.6rem',
//             fontStyle: 'italic',
//             color: '#999',
//             fontWeight: 300,
//           }}
//         >
//           Work illustrations by Storyset
//         </MuiLink>

//         <Typography
//           component="h1"
//           variant="h5"
//           align="center"
//           sx={{ mb: 2, mt: 4 }}
//         >
//           Šī sadaļa vēl tiek izstrādāta
//         </Typography>

//         <Typography variant="body2" align="center" sx={{ mb: 4 }}>
//           Mēs vēl strādājam pie šīs funkcijas. Pārbaudi vēlāk — mēs pie tā strādājam ar pilnu jaudu!
//         </Typography>

//         <Button
//           variant="contained"
//           sx={{ backgroundColor: '#5B9BD5', px: 4 }}
//           component={Link}
//           to="/"
//           fullWidth
//         >
//           Atpakaļ uz sākumlapu
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default WorkInProgress;