// import React, { useEffect, useState } from 'react';
// import QRCode from 'react-qr-code';
// import { Link, useParams } from 'react-router-dom';
// import { CheckBox } from '@mui/icons-material';
// // Optional: to represent species or other info
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Container,
//   Grid,
//   IconButton,
//   Input,
//   Stack,
//   TextField,
//   Typography,
// } from '@mui/material';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/FormGroup';
// import html2PDF from 'html2pdf.js';
// import { APP_NAME, DOMAIN_URL } from '../../../constants/config';
// import { useAuth } from '../../../contexts/AuthContext';
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const Poster = () => {
//   const { user } = useAuth();
//   const { id } = useParams();
//   const [pet, setPet] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [phone, setPhone] = useState('');
//   const [phoneCode, setPhoneCode] = useState('');
//   const [isEmpty, setIsEmpty] = useState(false);
//   const [displayText, setDisplayText] = useState('Ja esat redzējuši, lūgums zvaniet!');
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     // Extract the year, month, and day
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits (e.g., 01, 02)
//     const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
//     // Return the date in 'YYYY-MM-DD' format
//     return `${year}-${month}-${day}`;
//   };
//   useEffect(() => {
//     const fetchPetDetails = async () => {
//       const accessToken = localStorage.getItem('access_token');
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetch(`${API_BASE_URL}/api/pets/${id}/?format=json`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch pet details');
//         }
//         const data = await response.json();
//         setPet(data);
//       } catch (err) {
//         setError('Failed to fetch pet details. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPetDetails();
//   }, [id]);
//   const handlePhoneChange = (e) => {
//     const value = e.target.value;
//     setPhone(value);
//     setDisplayText(`Ja esat redzējuši, lūgums zvaniet! ${value ? ' ' + value : ''}`);
//   };
//   const handleAcceptChange = () => {
//     setIsEmpty(!isEmpty);
//   };
//   const generatePDF = async () => {
//     try {
//       const page = document.getElementById('page');
//       const options = {
//         jsPDF: { format: 'a4' },
//         html2canvas: { useCORS: true, scale: 2 },
//       };
//       await html2PDF().from(page).set(options).save();
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//     }
//   };
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }
//   if (error) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <Typography variant="h6" color="error">
//           {error}
//         </Typography>
//       </Box>
//     );
//   }
//   if (!pet) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <Typography variant="h6" color="textSecondary">
//           Pet details are unavailable.
//         </Typography>
//       </Box>
//     );
//   }
//   return (
//     <Container component="main" maxWidth="lg" sx={{ paddingLeft: '0 !important', paddingRight: '0 !important' }}>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//         }}
//       >
//         <Box
//           id="page"
//           sx={{
//             background: '#fff',
//             maxWidth: '794px' /* A4 width in pixels */,
//             //height: "1123px", /* A4 height in pixels */
//             maxHeight: '1122px',
//             padding: 1,
//             boxSizing: 'border-box',
//             border: '1px solid #ccc',
//             borderRadius: 1,
//             boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <Box
//             style={{
//               background: 'darkred',
//               padding: '0.5rem 0',
//               marginBottom: '0.5rem',
//             }}
//           >
//             <Typography
//               variant="h1"
//               textAlign="center"
//               style={{
//                 textTransform: 'uppercase',
//                 fontWeight: 700,
//                 color: '#fff',
//                 fontSize: '2.4rem',
//               }}
//             >
//               UZMANĪBU!
//             </Typography>
//             <Typography
//               variant="h4"
//               textAlign="center"
//               style={{
//                 color: '#fff',
//                 textTransform: 'uppercase',
//                 letterSpacing: '1px',
//                 fontWeight: 500,
//                 // fontSize: '1rem',
//               }}
//             >
//               Pazudis {pet.species_display}
//             </Typography>
//           </Box>
//         </Box>
//         <Container component="main" maxWidth="sm" sx={{ paddingLeft: '0 !important', paddingRight: '0 !important' }}>
//           <Grid container spacing={3} py={1}>
//             <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
//               <Box textAlign="center" style={{ display: 'flex', justifyContent: 'space-between' }} mt={4}>
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   startIcon={<ArrowBackIcon />}
//                   component={Link}
//                   to={`/pets/${pet.id}`}
//                   style={{ textDecoration: 'none', color: 'inherit' }}
//                 >
//                   Atpakaļ
//                 </Button>
//                 <Button variant="contained" color="primary" onClick={generatePDF} startIcon={<ArrowDownwardIcon />}>
//                   Lejupielādēt PDF
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </Container>
//   );
// };
// export default Poster;
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Link, useParams } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import html2PDF from 'html2pdf.js';

import { DOMAIN_URL } from '../../../constants/config';
import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Poster = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NEW STATES
  const [posterName, setPosterName] = useState('');
  const [posterCount, setPosterCount] = useState(1);
  const [generatedPosters, setGeneratedPosters] = useState([]);
  const [downloading, setDownloading] = useState(null); // track which poster is downloading
  const [downloadedIds, setDownloadedIds] = useState([]);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/api/pets/${id}/?format=json`);
        if (!response.ok) throw new Error('Failed to fetch pet details');
        const data = await response.json();
        console.log('pet', pet);
        setPet(data);
      } catch (err) {
        setError('Failed to fetch pet details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);
  const bulkDownloadPDFs = async () => {
    for (const poster of generatedPosters) {
      await generatePDF(poster.id);
    }
  };
  const handleGeneratePosters = async () => {
    try {
      setLoading(true);

      const payload = {
        pet: id,
        name: posterName || 'Poster',
        count: posterCount,
      };

      const accessToken = localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE_URL}/api/pets/posters/bulk-create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from server:', errorText);
        throw new Error(`Failed to create posters. Status: ${response.status}`);
      }

      const posters = await response.json();
      setGeneratedPosters(posters);
    } catch (error) {
      console.error(error);
      setError(error.message || 'Could not create posters. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  // Currently you download posters one by one. If your posters are many and small, you could also kick off all downloads in parallel like this:
  // const bulkDownloadPDFs = async () => {
  //   await Promise.all(
  //     generatedPosters.map((poster) => generatePDF(poster.id))
  //   );
  // };
  const generatePDF = async (posterId) => {
    try {
      setDownloading(posterId);
      const page = document.getElementById(`page-${posterId}`);
      const options = {
        jsPDF: { format: 'a4' },
        html2canvas: { useCORS: true, scale: 2 },
      };
      await html2PDF().from(page).set(options).save();
      setDownloadedIds((prev) => [...prev, posterId]);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!pet) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="textSecondary">
          Pet details are unavailable.
        </Typography>
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" mb={2}>
          Generate Posters for {pet.name}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Poster Name"
              fullWidth
              value={posterName}
              onChange={(e) => setPosterName(e.target.value)}
              placeholder="Lost Max Poster"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Number of Posters"
              fullWidth
              type="number"
              value={posterCount}
              onChange={(e) => setPosterCount(e.target.value)}
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button variant="contained" fullWidth onClick={handleGeneratePosters}>
              Generate Posters
            </Button>
          </Grid>
        </Grid>
      </Box>

      {generatedPosters.length > 0 && (
        <>
          <Typography variant="h5" mt={4}>
            Generated Posters:
          </Typography>
          <Box mt={2}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ArrowDownwardIcon />}
              onClick={bulkDownloadPDFs}
              disabled={downloading !== null}
            >
              Download All Posters as PDF
            </Button>
          </Box>
          {generatedPosters.map((poster) => {
            const posterUrl = `${DOMAIN_URL}/posters/${poster.id}/scan/`;

            return (
              <Box
                key={poster.id}
                id={`page-${poster.id}`}
                sx={{
                  background: '#fff',
                  maxWidth: '794px',
                  maxHeight: '1122px',
                  padding: 2,
                  marginBottom: 4,
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                }}
              >
                <Box
                  style={{
                    background: 'darkred',
                    padding: '0.5rem 0',
                    marginBottom: '0.5rem',
                  }}
                >
                  <Typography
                    variant="h4"
                    textAlign="center"
                    sx={{ textTransform: 'uppercase', fontWeight: 700, color: '#fff' }}
                  >
                    UZMANĪBU!
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}
                  >
                    Pazudis {pet.species_display}
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                    {pet.pet_image_1 && (
                      <Box
                        position="relative"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ width: '100%', borderRadius: 1 }}
                      >
                        <img
                          src={pet.pet_image_1}
                          alt={pet.name}
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '4px',
                          }}
                        />
                        {/* <Typography
                          variant="caption"
                          sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                           
                            color: 'black',
                            px: 1,
                            py: 0.2,
                            borderRadius: 1,
                            fontSize: '0.6rem',
                            fontWeight: 500,
                          }}
                        >
                          Made by {APP_NAME}
                        </Typography> */}
                      </Box>
                    )}
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="center" mt={2}>
                  <QRCode value={posterUrl} size={200} />
                </Box>

                <Typography variant="body1" textAlign="center" mt={2}>
                  {poster.name}
                </Typography>

                <Box textAlign="center" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => generatePDF(poster.id)}
                    startIcon={<ArrowDownwardIcon />}
                    disabled={downloading === poster.id}
                  >
                    {downloading === poster.id ? 'Generating...' : 'Download PDF'}
                  </Button>

                  {downloadedIds.includes(poster.id) && (
                    <Typography mt={1} color="green">
                      PDF downloaded!
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          })}
        </>
      )}

      <Box mt={4}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          component={Link}
          to={`/pets/${pet.id}`}
        >
          Atpakaļ
        </Button>
      </Box>
    </Container>
  );
};

export default Poster;
