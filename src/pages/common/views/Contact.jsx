import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
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
import axios from 'axios';

import contactImage from '../../../assets/images/contact/mobile_marketing_cuate_blue.svg';
import feedbackImage from '../../../assets/images/feedback/customer_feedback_amico_blue.svg';
import { SUBJECT_CHOICES, getSubjectChoices } from '../../../constants/Choices';
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
// import { LanguageContext } from '../../../contexts/LanguageContext';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Contact = () => {
  const { i18n } = useTranslation();
  console.log(i18n.language);
  const { t } = useTranslation('contact');
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
      tempErrors.sender = t('errors.nameRequired');
    }
    if (!email) {
      tempErrors.email = t('errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = t('errors.emailInvalid');
    }
    if (!message.trim()) {
      tempErrors.message = t('errors.messageRequired');
    } else if (message.length < 3) {
      tempErrors.message = t('errors.messageTooShort');
    } else if (message.length > 500) {
      tempErrors.message = t('errors.messageTooLong');
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
      showAlert(t('errors.fillRequiredFields'), 'error');
      return;
    }

    setLoading(true);
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        showAlert(t('errors.loginRequired'), 'error');
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
        showAlert(t('errors.success'));
        setSubject(5);
        setSender('');
        setEmail('');
        setMessage('');
        setErrors({});
      }
    } catch (error) {
      console.error('Contact error:', error);

      if (error.response?.status === 429) {
        showAlert(t('errors.rateLimit'), 'error');
      } else if (error.response?.status === 401) {
        showAlert(t('errors.loginRequired'), 'error');
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
          showAlert(t('errors.fixErrors'), 'error');
        } else {
          showAlert(backendErrors.detail || t('errors.generalError'), 'error');
        }
      } else {
        showAlert(t('errors.generalError'), 'error');
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
      <Helmet>
        {/* Dynamically set the language attribute on <html> */}
        <html lang={i18n.language || 'lv'} />

        {/* Dynamic title */}
        <title>{t('meta.title')}</title>

        {/* Dynamic description */}
        <meta name="description" content={t('meta.description')} />

        {/* Keywords (optional) */}
        <meta name="keywords" content={t('meta.keywords')} />

        {/* Open Graph tags for social */}
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
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
          {t('title')}
        </Typography>
        <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                src={contactImage}
                alt={t('illustrations.alt')}
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
                {t('illustrations.attribution')}
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
                {t('questions.title')}
              </Typography>
              <Typography gutterBottom variant="body1" sx={{ mb: 2 }}>
                {t('questions.description1')}
              </Typography>
              <Typography gutterBottom variant="body1" sx={{ mb: 2 }}>
                {t('questions.description2')}
              </Typography>
              <Typography gutterBottom variant="body1" sx={{ mb: 2 }}>
                {t('questions.description3')}
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
                {t('form.title')}
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
                  <InputLabel id="subject-label">{t('form.subject')}</InputLabel>
                  <Select
                    labelId="subject-label"
                    value={subject}
                    label={t('form.subject')}
                    onChange={(e) => setSubject(e.target.value)}
                    error={!!errors.subject}
                  >
                    {getSubjectChoices(i18n.language).map((choice) => (
                      <MenuItem key={choice.value} value={choice.value}>
                        {choice.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label={t('form.name')}
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
                  label={t('form.email')}
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
                  label={t('form.message')}
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
                    {t('form.privacy')}{' '}
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
                      {t('form.privacyLink')}
                    </MuiLink>
                    {t('form.privacyEnd')}
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
                  {loading ? t('form.submitLoading') : user ? t('form.submit') : t('form.loginToSubmit')}
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                src={feedbackImage}
                alt={t('illustrations.alt')}
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
                {t('illustrations.attribution')}
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 500, color: '#16477c', mt: 8, mb: 4, mb: 5, fontSize: { xs: '1.8rem', sm: '2rem' } }}
        >
          {t('contactInfo.title')}
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
                  {t('contactInfo.email.description')}
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
                  {t('contactInfo.phone.description')}
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
                  {t('contactInfo.location.description')}
                </Typography>
              </div>
            </CardContent>
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent="center">
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h4"
              align="center"
              sx={{ fontWeight: 500, color: '#16477c', mt: 8, mb: 4, fontSize: { xs: '1.8rem', sm: '2rem' } }}
            >
              {t('socialMedia.title')}
            </Typography>

            <Typography variant="body1" align="center" sx={{ maxWidth: 700, mx: 'auto', mb: 3, color: '#555' }}>
              {t('socialMedia.description')}
            </Typography>
          </Grid>

          <Grid container spacing={2} justifyContent="center">
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
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Contact;
