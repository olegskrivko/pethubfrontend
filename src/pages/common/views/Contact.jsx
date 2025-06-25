import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LocationOn as LocationOnIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  X as XIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CardContent,
  CardMedia,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Link as MuiLink,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
// import { Helmet } from 'react-helmet-async';
import axios from 'axios';

import contactImage from '../../../assets/images/contact/mobile_marketing_cuate_blue.svg';
import feedbackImage from '../../../assets/images/feedback/customer_feedback_amico_blue.svg';
import { SUBJECT_CHOICES } from '../../../constants/Choices';
import {
  CITY,
  COUNTRY,
  EMAIL,
  FACEBOOK,
  INSTAGRAM,
  PHONE_CODE,
  PHONE_NUMBER,
  X,
  YOUTUBE,
} from '../../../constants/config';
import { useAuth } from '../../../contexts/AuthContext';
import ImageTextSection from '../../layout/ImageTextSection';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Contact = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(5);
  const [sender, setSender] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
    }
  }, [user]);

  const validate = () => {
    const tempErrors = {};

    if (!sender.trim()) {
      tempErrors.sender = 'Lūdzu, ievadiet savu vārdu.';
    }
    if (!email) {
      tempErrors.email = 'Lūdzu, ievadiet e-pastu.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Lūdzu, ievadiet derīgu e-pasta adresi.';
    }
    if (!message.trim()) {
      tempErrors.message = 'Ziņa nedrīkst būt tukša.';
    } else if (message.length < 3) {
      tempErrors.message = 'Ziņai jābūt vismaz 3 rakstzīmēm garai.';
    } else if (message.length > 500) {
      tempErrors.message = 'Ziņa nedrīkst būt garāka par 500 rakstzīmēm.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ show: true, message, severity });
    setTimeout(() => setAlert({ show: false, message: '', severity: 'success' }), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!validate()) {
      showAlert('Lūdzu, aizpildiet visus obligātos laukus.', 'error');
      return;
    }

    setLoading(true);
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        showAlert('Lūdzu, ielogojieties, lai nosūtītu ziņu.', 'error');
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/feedbacks/`,
        {
          subject: parseInt(subject),
          sender,
          email,
          message,
          user: user.userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status === 201) {
        showAlert('Ziņa veiksmīgi nosūtīta!');
        setSubject(5);
        setSender('');
        setEmail('');
        setMessage('');
        setErrors({});
      }
    } catch (error) {
      console.error('Contact error:', error);

      if (error.response?.status === 429) {
        showAlert(
          'Lūdzu, uzgaidiet pirms nākamās ziņas nosūtīšanas. Jūs varat nosūtīt ziņu vēlreiz pēc 1 minūtes.',
          'error',
        );
      } else if (error.response?.status === 401) {
        showAlert('Lūdzu, ielogojieties, lai nosūtītu ziņu.', 'error');
        navigate('/login');
      } else if (error.response?.data) {
        const backendErrors = error.response.data;
        if (typeof backendErrors === 'object') {
          const newErrors = {};
          Object.keys(backendErrors).forEach((key) => {
            if (Array.isArray(backendErrors[key])) {
              newErrors[key] = backendErrors[key][0];
            } else {
              newErrors[key] = backendErrors[key];
            }
          });
          setErrors(newErrors);
          showAlert('Lūdzu, labojiet norādītās kļūdas.', 'error');
        } else {
          showAlert(backendErrors.detail || 'Radās kļūda. Mēģiniet vēlreiz vēlāk.', 'error');
        }
      } else {
        showAlert('Radās kļūda. Mēģiniet vēlreiz vēlāk.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${COUNTRY}, ${CITY}`,
    )}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <React.Fragment>
      <ToastContainer position="top-right" autoClose={3000} />

      <Container maxWidth="lg" disableGutters>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 5,
            fontWeight: 800,

            background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Kontakti
        </Typography>
        <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                src={contactImage}
                alt="Saziņas ilustrācija"
                sx={{
                  width: { xs: '70%', sm: '80%', md: '90%', lg: '100%' },
                  objectFit: 'contain',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  borderRadius: 2,
                  mb: 1,
                }}
              />
              <MuiLink
                href="https://storyset.com/business"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: '0.6rem',
                  fontStyle: 'italic',
                  color: '#999',
                  fontWeight: 300,
                }}
              >
                Business illustrations by Storyset
              </MuiLink>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
              <Typography
                variant="h4"
                align="left"
                sx={{ fontWeight: 500, color: '#16477c', mb: 2, fontSize: { xs: '1.8rem', sm: '2rem' } }}
              >
                Kādi jautājumi?
              </Typography>
              <Typography gutterBottom variant="body1" sx={{ mb: 2 }}>
                Ja jums ir jautājumi, ierosinājumi vai vienkārši vēlaties ar mums sazināties — aizpildiet formu zemāk,
                un mēs ar prieku atbildēsim.
              </Typography>
              <Typography gutterBottom variant="body1" sx={{ mb: 2 }}>
                Mēs priecājamies dzirdēt jūsu viedokli! Vai jums ir ideja, ierosinājums vai esat pamanījis kļūdu? Lūdzu,
                aizpildiet formu zemāk, un mēs ar jums sazināsimies, ja būs nepieciešams.
              </Typography>
              <Typography gutterBottom variant="body1" sx={{ mb: 2 }}>
                Jūsu atsauksmes palīdz mums uzlabot sniegto informāciju un pakalpojumus. Neatkarīgi no tā, vai vēlaties
                uzzināt vairāk, pieteikt sadarbību vai vienkārši dalīties savā pieredzē — jūsu viedoklis mums ir
                svarīgs.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3, md: 3 },
                borderRadius: 4,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  color: '#16477c',
                  textAlign: 'center',
                }}
              >
                Sazinieties ar mums
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2.5,
                }}
              >
                {alert.show && (
                  <Alert severity={alert.severity} sx={{ mb: 2 }}>
                    {alert.message}
                  </Alert>
                )}

                <FormControl fullWidth>
                  <InputLabel id="subject-label">Tēma</InputLabel>
                  <Select
                    labelId="subject-label"
                    value={subject}
                    label="Tēma"
                    onChange={(e) => setSubject(e.target.value)}
                    error={!!errors.subject}
                  >
                    {SUBJECT_CHOICES.map((choice) => (
                      <MenuItem key={choice.value} value={choice.value}>
                        {choice.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Jūsu vārds"
                  fullWidth
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  error={!!errors.sender}
                  helperText={errors.sender}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#00b5ad',
                      },
                    },
                  }}
                />
                <TextField
                  label="Jūsu e-pasts"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#00b5ad',
                      },
                    },
                  }}
                />
                <TextField
                  label="Jūsu ziņa"
                  multiline
                  rows={4}
                  fullWidth
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  error={!!errors.message}
                  helperText={errors.message}
                  inputProps={{ maxLength: 500 }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#00b5ad',
                      },
                    },
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <Checkbox
                    required={!!user}
                    sx={{
                      color: '#00b5ad',
                      '&.Mui-checked': {
                        color: '#00b5ad',
                      },
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Apstiprinu, ka esmu izlasījis{' '}
                    <MuiLink
                      href="policies"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#00b5ad',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      privātuma politiku
                    </MuiLink>
                    . Dati tiek apstrādāti, lai atbildētu uz pieprasījumu.
                  </Typography>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    mt: 2,
                    py: 1,
                    background: 'linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)',
                  }}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {loading ? 'Nosūtīšana...' : user ? 'Nosūtīt ziņu' : 'Ielogoties, lai nosūtītu ziņu'}
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                src={feedbackImage}
                alt="Saziņas ilustrācija"
                sx={{
                  width: { xs: '70%', sm: '80%', md: '90%', lg: '100%' },
                  objectFit: 'contain',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  borderRadius: 2,
                  mb: 1,
                }}
              />
              <MuiLink
                href="https://storyset.com/business"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: '0.6rem',
                  fontStyle: 'italic',
                  color: '#999',
                  fontWeight: 300,
                }}
              >
                Business illustrations by Storyset
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 500, color: '#16477c', mt: 8, mb: 4, mb: 5, fontSize: { xs: '1.8rem', sm: '2rem' } }}
        >
          Kontaktinformācija
        </Typography>
        <Grid container spacing={3} style={{ marginTop: '1rem', marginBottom: '3rem' }}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} textAlign="center">
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <MailIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />

              <div>
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: '0.5rem',
                    textAlign: 'center',
                    color: '#00b5ad',
                    fontFamily: 'Titillium Web, sans-serif',
                  }}
                >
                  <MuiLink variant="body1" href={`mailto:${EMAIL}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                    {EMAIL}
                  </MuiLink>
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    textAlign: 'center',
                    color: '#616f7d',
                    fontFamily: 'Titillium Web, sans-serif',
                  }}
                >
                  Jautājumi, atsauksmes vai sadarbība? Rakstiet mums!
                </Typography>
              </div>
            </CardContent>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} textAlign="center">
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <PhoneIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />

              <div>
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: '0.5rem',
                    textAlign: 'center',
                    color: '#00b5ad',
                    fontFamily: 'Titillium Web, sans-serif',
                  }}
                >
                  <MuiLink
                    variant="body1"
                    href={`tel:${PHONE_CODE}${PHONE_NUMBER}`}
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {`${PHONE_CODE} ${PHONE_NUMBER}`}
                  </MuiLink>
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    textAlign: 'center',
                    color: '#616f7d',
                    fontFamily: 'Titillium Web, sans-serif',
                  }}
                >
                  Zvaniet mums darba laikā – mēs vienmēr esam gatavi palīdzēt.
                </Typography>
              </div>
            </CardContent>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} textAlign="center">
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <LocationOnIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
              <div>
                <Typography
                  variant="h6"
                  style={{
                    marginBottom: '0.5rem',
                    textAlign: 'center',
                    color: '#00b5ad',
                    fontFamily: 'Titillium Web, sans-serif',
                  }}
                >
                  <MuiLink
                    variant="body1"
                    href="#"
                    onClick={handleLocationClick}
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {`${COUNTRY}, ${CITY}`}
                  </MuiLink>
                </Typography>

                <Typography
                  variant="body2"
                  style={{
                    textAlign: 'center',
                    color: '#616f7d',
                    fontFamily: 'Titillium Web, sans-serif',
                  }}
                >
                  Mēs atrodamies šajā reģionā, bet vienmēr esam gatavi palīdzēt attālināti!
                </Typography>
              </div>
            </CardContent>
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              sx={{ fontWeight: 500, color: '#16477c', mt: 8, mb: 4, fontSize: { xs: '1.8rem', sm: '2rem' } }}
            >
              Sekojiet mums sociālajos tīklos
            </Typography>

            <Typography variant="body1" align="center" sx={{ maxWidth: 700, mx: 'auto', mb: 3, color: '#555' }}>
              Mēs dalāmies ar noderīgiem padomiem, jaunākajām ziņām, sadarbībām un stāstiem par pazudušiem
              mājdzīvniekiem. Pievienojieties mums Facebook un Instagram, lai vienmēr būtu lietas kursā.
            </Typography>
          </Grid>

          {[
            {
              href: FACEBOOK,
              icon: <FacebookIcon fontSize="large" />,
              color: '#16477c',
            },
            {
              href: INSTAGRAM,
              icon: <InstagramIcon fontSize="large" />,
              color: '#16477c',
            },
            {
              href: YOUTUBE,
              icon: <YouTubeIcon fontSize="large" />,
              color: '#16477c',
            },
            { href: X, icon: <XIcon fontSize="large" />, color: '#16477c' },
          ].map(({ href, icon, color }, index) => (
            <Grid item key={index}>
              <MuiLink href={href} target="_blank" rel="noopener" underline="none">
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: color,
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: '#3498db',
                    },
                  }}
                >
                  {icon}
                </Box>
              </MuiLink>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Contact;
