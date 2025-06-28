import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Link, useParams } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CakeIcon from '@mui/icons-material/Cake';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DescriptionIcon from '@mui/icons-material/Description';
import FemaleIcon from '@mui/icons-material/Female';
import HeightIcon from '@mui/icons-material/Height';
import MaleIcon from '@mui/icons-material/Male';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import MoodIcon from '@mui/icons-material/Mood';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import TagIcon from '@mui/icons-material/Tag';
import TextureIcon from '@mui/icons-material/Texture';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import html2PDF from 'html2pdf.js';

import { APP_NAME, DOMAIN_URL } from '../../../constants/config';
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

  // Generate default poster name with timestamp
  const generateDefaultPosterName = () => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    return `poster_${timestamp}`;
  };

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
        // Set default poster name when pet data is loaded
        setPosterName(generateDefaultPosterName());
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
        name: posterName || generateDefaultPosterName(),
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits (e.g., 01, 02)
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits

    // Return the date in 'YYYY-MM-DD' format
    return `${year}-${month}-${day}`;
  };

  const generatePDF = async (posterId) => {
    try {
      setDownloading(posterId);
      const page = document.getElementById(`page-${posterId}`);

      // Find the poster to get its name
      const poster = generatedPosters.find((p) => p.id === posterId);
      const fileName = poster ? `${poster.name}.pdf` : `poster_${posterId}.pdf`;

      const options = {
        jsPDF: { format: 'a4' },
        html2canvas: { useCORS: true, scale: 2 },
        filename: fileName, // Use the poster name for the PDF filename
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
    <Container component="main" maxWidth="lg">
      {/* Premium Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 3,
          p: 4,
          mb: 4,
          color: 'white',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}
      >
        <Stack spacing={3}>
          <Box textAlign="center">
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 1,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Generate Posters
            </Typography>
            <Typography
              variant="h5"
              sx={{
                opacity: 0.9,
                fontWeight: 300,
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              for {pet.name}
            </Typography>
          </Box>

          <Card
            sx={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Poster Name"
                    fullWidth
                    value={posterName}
                    onChange={(e) => setPosterName(e.target.value)}
                    placeholder="poster_2024-01-15T10-30-00"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255,255,255,0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255,255,255,0.8)',
                        '&.Mui-focused': {
                          color: 'white',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Number of Posters"
                    fullWidth
                    type="number"
                    value={posterCount}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value >= 1 && value <= 50) {
                        setPosterCount(value);
                      }
                    }}
                    inputProps={{
                      min: 1,
                      max: 50,
                      step: 1,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            /50
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255,255,255,0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(255,255,255,0.8)',
                        '&.Mui-focused': {
                          color: 'white',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleGeneratePosters}
                    disabled={loading}
                    sx={{
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      fontWeight: 600,
                      py: 1.5,
                      '&:hover': {
                        background: 'rgba(255,255,255,0.3)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Generate Posters'}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      {generatedPosters.length > 0 && (
        <>
          <Box
            sx={{
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              borderRadius: 2,
              p: 3,
              mb: 3,
            }}
          >
            <Typography variant="h5" mb={2} sx={{ fontWeight: 600, color: '#2c3e50' }}>
              Generated Posters ({generatedPosters.length})
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowDownwardIcon />}
              onClick={bulkDownloadPDFs}
              disabled={downloading !== null}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
              }}
            >
              Download All Posters as PDF
            </Button>
          </Box>

          {generatedPosters.map((poster) => {
            const posterUrl = `${DOMAIN_URL}/posters/${poster.id}/scan/`;

            return (
              <Box key={poster.id} mb={4}>
                {/* Download Button - Outside PDF Content */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    p: 2,
                    background: 'rgba(102, 126, 234, 0.1)',
                    borderRadius: 2,
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                    {poster.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => generatePDF(poster.id)}
                      startIcon={<ArrowDownwardIcon />}
                      disabled={downloading === poster.id}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                        },
                      }}
                    >
                      {downloading === poster.id ? 'Generating...' : 'Download PDF'}
                    </Button>
                    {downloadedIds.includes(poster.id) && (
                      <Typography color="success.main" sx={{ fontWeight: 500 }}>
                        ✓ Downloaded
                      </Typography>
                    )}
                  </Box>
                </Box>

                {/* PDF Content - No Download Button Inside */}
                <Box
                  id={`page-${poster.id}`}
                  sx={{
                    background: '#fff',
                    maxWidth: '794px',
                    maxHeight: '1122px',
                    padding: 2,
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
                  {/* image */}
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
                          <Typography
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
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                  {/* attributes */}
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 4, sm: 4, md: 4, lg: 4 }}>
                      <Box display="flex" alignItems="center" my={1} gap={1}>
                        <MergeTypeIcon color="primary" />
                        <Typography
                          sx={{
                            fontSize: { xs: '0.8rem', sm: '1rem' },
                          }}
                        >
                          <strong>Šķirne:</strong> {pet.breed || '-'}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" my={1} gap={1}>
                        <MaleIcon color="primary" />
                        <Typography
                          sx={{
                            fontSize: { xs: '0.8rem', sm: '1rem' },
                          }}
                        >
                          <strong>Dzimums:</strong> {pet.gender_display || '-'}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" my={1} gap={1}>
                        <TextureIcon color="primary" />
                        <Typography
                          sx={{
                            fontSize: { xs: '0.8rem', sm: '1rem' },
                          }}
                        >
                          <strong>Kažoks:</strong> {pet.pattern_display || '-'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 4, sm: 4, md: 4, lg: 4 }}>
                      <Box display="flex" alignItems="center" my={1} gap={1}>
                        <CakeIcon color="primary" />
                        <Typography
                          sx={{
                            fontSize: { xs: '0.8rem', sm: '1rem' },
                          }}
                        >
                          <strong>Vecums:</strong> {pet.age_display || '-'}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" my={1} gap={1}>
                        <HeightIcon color="primary" />
                        <Typography
                          sx={{
                            fontSize: { xs: '0.8rem', sm: '1rem' },
                          }}
                        >
                          <strong>Augums:</strong> {pet.size_display || '-'}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" my={1} gap={1}>
                        <ColorLensIcon color="primary" />
                        <Typography
                          sx={{
                            fontSize: { xs: '0.8rem', sm: '1rem' },
                          }}
                        >
                          <strong>Pamatkrāsa:</strong> {pet.primary_color_display || '-'}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 4, sm: 4, md: 4, lg: 4 }}>
                      <Box display="flex" alignItems="center" my={1} gap={1}>
                        <AccessTimeIcon color="primary" />
                        <Typography
                          sx={{
                            fontSize: { xs: '0.8rem', sm: '1rem' },
                          }}
                        >
                          <strong>Datums:</strong> {formatDate(pet.created_at)}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" my={1} gap={1}>
                        <TagIcon color="primary" />
                        <Typography
                          sx={{
                            fontSize: { xs: '0.8rem', sm: '1rem' },
                          }}
                        >
                          <strong>ID:</strong> {pet.identifier}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" my={1} gap={1}>
                        <ColorLensIcon color="primary" />
                        <Typography
                          sx={{
                            fontSize: { xs: '0.8rem', sm: '1rem' },
                          }}
                        >
                          <strong>Sekundārā krāsa:</strong> {pet.secondary_color_display || '-'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  {/* phone line */}
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                      <Box
                        style={{
                          background: 'darkred',
                          padding: '0.5rem 0',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          minHeight: '76px',
                        }}
                      >
                        <Typography
                          variant="h6"
                          textAlign="center"
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: '700',
                            color: '#fff',
                          }}
                        >
                          Ja esat redzējuši, lūgums sazināties!
                        </Typography>

                        {/* Conditionally render input only if phone is not empty */}
                        {pet.contact_phone && (
                          <Box display="flex" justifyContent="center" alignItems="center">
                            <span
                              style={{
                                color: '#fff',
                                fontSize: '1.4rem',
                                fontWeight: '500',
                              }}
                            >
                              +{pet.phone_code} {pet.contact_phone}
                            </span>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                  {/* qrcode */}
                  <Grid container spacing={3} py={2}>
                    {/* <Grid
                      size={{ xs: 4, sm: 4, md: 6, lg: 6 }}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      mt={1}
                    >
                      <Box sx={{ width: '100%', maxWidth: 160, aspectRatio: '1 / 1' }}>
                        <QRCode value={posterUrl} size={200} />
                      </Box>
                    </Grid> */}
                    <Grid
                      size={{ xs: 4, sm: 4, md: 6, lg: 6 }}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      mt={1}
                    >
                      <Box sx={{ width: '100%', maxWidth: 160, aspectRatio: '1 / 1' }}>
                        <QRCode value={posterUrl} style={{ width: '100%', height: '100%' }} viewBox={`0 0 256 256`} />
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 8, sm: 8, md: 6, lg: 6 }} mt={1}>
                      <Box
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'start',
                        }}
                      >
                        <Stack direction="column" spacing={2} alignItems="left">
                          <Typography variant="body2" textAlign="start" sx={{ fontWeight: 'bold' }}>
                            1. Noskenējiet QR kodu
                          </Typography>
                          <Typography variant="body2" textAlign="start" sx={{ mt: 1, fontWeight: 'bold' }}>
                            2. Klikšķiniet uz saites, kas parādās
                          </Typography>
                          <Typography variant="body2" textAlign="start" sx={{ mt: 1, fontWeight: 'bold' }}>
                            3. Rakstiet komentārus, ja ir kāda informācija
                          </Typography>
                          <Typography variant="body2" textAlign="start" sx={{ mt: 1, fontWeight: 'bold' }}>
                            4. Sekojiet līdzi mājdzīvnieka statusam
                          </Typography>
                          <Typography variant="body2" textAlign="start" sx={{ mt: 1, fontWeight: 'bold' }}>
                            5. Dalieties ar saiti, lai palīdzētu mājdzīvniekam
                          </Typography>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
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
