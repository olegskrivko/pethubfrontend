// import React from 'react';
// import {
//   Container,
//   Typography,
//   Grid,
//   Button,
//   Box,
//   Link as MuiLink,
// } from '@mui/material';
// import { Link } from 'react-router-dom';  // Import the Link component for navigation
// const partners = [
//   {
//     name: 'PetCare Alliance',
//     logo: 'https://placehold.co/350x240?text=PetCare Alliance',
//     website: '#',
//   },
//   {
//     name: 'Animal Rescue Network',
//     logo: 'https://placehold.co/350x240?text=Animal Rescue Network',
//     website: '#',
//   },
//   {
//     name: 'Companion Paws Foundation',
//     logo: 'https://placehold.co/350x240?text=Companion Paws Foundation',
//     website: '#',
//   },
//   {
//     name: 'SafePaws NGO',
//     logo: 'https://placehold.co/350x240?text=SafePaws NGO',
//     website: '#',
//   },
// ];

// const sponsors = [
//   {
//     name: 'Pawfect Nutrition',
//     logo: 'https://placehold.co/350x240?text=Pawfect Nutrition',
//     website: '#',
//   },
//   {
//     name: 'VetWell Solutions',
//     logo: 'https://placehold.co/350x240?text=VetWell Solutions',
//     website: '#',
//   },
//   {
//     name: 'FurEver Brands',
//     logo: 'https://placehold.co/350x240?text=FurEver Brands',
//     website: '#',
//   },
//   {
//     name: 'HappyTail Supplies',
//     logo: 'https://placehold.co/350x240?text=HappyTail Supplies',
//     website: '#',
//   },
// ];

// const LogoGrid = ({ items }) => (
//   <Grid container spacing={3} justifyContent="center" alignItems="center">
//     {items.map((item, index) => (
//       <Grid item xs={6} sm={4} md={3} key={index}>
//         <MuiLink
//           href={item.website}
//           target="_blank"
//           rel="noopener noreferrer"
//           underline="none"
//           sx={{ display: 'flex', justifyContent: 'center' }}
//         >
//           <Box
//             component="img"
//             src={item.logo}
//             alt={item.name}
//             sx={{
//               maxWidth: '100%',
//               height: 'auto',
//               filter: 'grayscale(100%)',
//               transition: 'filter 0.3s ease',
//               '&:hover': {
//                 filter: 'none',
//               },
//             }}
//           />
//         </MuiLink>
//       </Grid>
//     ))}
//   </Grid>
// );

// const PartnersAndSponsors = () => {
//     const [loading, setLoading] = React.useState(false); // Simulate loading state
  
//     return (
//         <Container component="main" maxWidth="lg" sx={{ paddingLeft: 0, paddingRight: 0 }}>
//         <Typography variant="h3" align="center" sx={{ mb: 5, fontWeight: 500 }}>
//           Partneri un sponsori
//         </Typography>
//         <Typography variant="body1" align="center" sx={{ mb: 6 }}>
//           Mēs sadarbojamies ar dažādām organizācijām, uzņēmumiem un iniciatīvām, kas palīdz veicināt dzīvnieku labklājību.
//         </Typography>
  
//         {/* Partneri */}
//         <Typography variant="h5" sx={{ mb: 3 }}>
//           Partneri
//         </Typography>
//         <LogoGrid items={partners} />
  
//         {/* Sponsori */}
//         <Typography variant="h5" sx={{ mt: 6, mb: 3 }}>
//           Sponsori
//         </Typography>
//         <LogoGrid items={sponsors} />
  
//       {/* CTA Button */}
//       <Box textAlign="center" sx={{ mt: 8 }}>
//         <Typography variant="h6" sx={{ mb: 2 }}>
//           Vai Jūsu uzņēmums vēlētos atbalstīt mūsu misiju?
//         </Typography>
//         <Button
//           type="button"
//           fullWidth
//           variant="contained"
//           sx={{
//             mt: 2,
//             mb: 2,
//             backgroundColor: '#5B9BD5',
//           }}
//           disabled={loading}
//           component={Link} // Use the Link component to navigate to the contact page
//           to="/contact" // Update the link to the contact page
//         >
//           {loading ? (
//             <CircularProgress size={24} sx={{ color: 'white' }} />
//           ) : (
//             'Sazinieties ar mums'
//           )}
//         </Button>
//       </Box>
//       </Container>
//     );
//   };

// export default PartnersAndSponsors;
