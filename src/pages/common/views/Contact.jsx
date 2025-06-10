import React, { useState, useEffect } from "react";
// import { Helmet } from 'react-helmet-async';
import axios from "axios";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Link as MuiLink,
  Button,
  CardMedia,
  CardContent,
  TextField,
  Checkbox,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Mail as MailIcon,
  LocationOn as LocationOnIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  YouTube as YouTubeIcon, 
  X as XIcon, 
} from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../contexts/AuthContext";
import contactImage from "../../../assets/images/contact/mobile_marketing_cuate_blue.svg";
import ImageTextSection from "../../layout/ImageTextSection"
import feedbackImage from "../../../assets/images/feedback/customer_feedback_amico_blue.svg";
import { useNavigate } from 'react-router-dom';

import { EMAIL, PHONE_CODE, PHONE_NUMBER, COUNTRY, CITY, FACEBOOK, INSTAGRAM, YOUTUBE, X } from "../../../constants/config";
import { SUBJECT_CHOICES } from "../../../constants/Choices";
// Getting API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
 

const Contact = () => {
  const { user } = useAuth(); // Accessing the user context (if logged in)
  const navigate = useNavigate();
  const [subject, setSubject] = useState(5);
  const [sender, setSender] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });

  // Prefill email from logged-in user (if available)
  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      // setSender(user.username || "");
    }
  }, [user]);

  const validate = () => {
    const tempErrors = {};
    
    // Basic frontend validation for better UX
    if (!sender.trim()) {
      tempErrors.sender = "Lūdzu, ievadiet savu vārdu.";
    }
    if (!email) {
      tempErrors.email = "Lūdzu, ievadiet e-pastu.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Lūdzu, ievadiet derīgu e-pasta adresi.";
    }
    if (!message.trim()) {
      tempErrors.message = "Ziņa nedrīkst būt tukša.";
    } else if (message.length < 3) {
      tempErrors.message = "Ziņai jābūt vismaz 3 rakstzīmēm garai.";
    } else if (message.length > 500) {
      tempErrors.message = "Ziņa nedrīkst būt garāka par 500 rakstzīmēm.";
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
      showAlert("Lūdzu, aizpildiet visus obligātos laukus.", 'error');
      return;
    }

    setLoading(true);
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        showAlert("Lūdzu, ielogojieties, lai nosūtītu ziņu.", 'error');
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
          user: user.userId
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        showAlert("Ziņa veiksmīgi nosūtīta!");
        setSubject(5);
        setSender("");
        setEmail("");
        setMessage("");
        setErrors({});
      }
    } catch (error) {
      console.error("Contact error:", error);
      
      if (error.response?.status === 429) {
        showAlert("Lūdzu, uzgaidiet pirms nākamās ziņas nosūtīšanas. Jūs varat nosūtīt ziņu vēlreiz pēc 1 minūtes.", 'error');
      } else if (error.response?.status === 401) {
        showAlert("Lūdzu, ielogojieties, lai nosūtītu ziņu.", 'error');
        navigate('/login');
      } else if (error.response?.data) {
        const backendErrors = error.response.data;
        if (typeof backendErrors === 'object') {
          const newErrors = {};
          Object.keys(backendErrors).forEach(key => {
            if (Array.isArray(backendErrors[key])) {
              newErrors[key] = backendErrors[key][0];
            } else {
              newErrors[key] = backendErrors[key];
            }
          });
          setErrors(newErrors);
          showAlert("Lūdzu, labojiet norādītās kļūdas.", 'error');
        } else {
          showAlert(backendErrors.detail || "Radās kļūda. Mēģiniet vēlreiz vēlāk.", 'error');
        }
      } else {
        showAlert("Radās kļūda. Mēģiniet vēlreiz vēlāk.", 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${COUNTRY}, ${CITY}`
    )}`;
    window.open(googleMapsUrl, "_blank");
  };

  // Test function to check backend validation
  // const testBackendValidation = async () => {
  //   const testCases = [
  //     {
  //       name: "Empty name",
  //       data: { subject: 1, sender: "", email: "test@test.com", message: "Test message" }
  //     },
  //     {
  //       name: "Name with numbers",
  //       data: { subject: 1, sender: "John123", email: "test@test.com", message: "Test message" }
  //     },
  //     {
  //       name: "Short name",
  //       data: { subject: 1, sender: "J", email: "test@test.com", message: "Test message" }
  //     },
  //     {
  //       name: "Invalid email",
  //       data: { subject: 1, sender: "John", email: "invalid-email", message: "Test message" }
  //     },
  //     {
  //       name: "Empty message",
  //       data: { subject: 1, sender: "John", email: "test@test.com", message: "" }
  //     },
  //     {
  //       name: "Short message",
  //       data: { subject: 1, sender: "John", email: "test@test.com", message: "Hi" }
  //     },
  //     {
  //       name: "Long message",
  //       data: { subject: 1, sender: "John", email: "test@test.com", message: "a".repeat(501) }
  //     }
  //   ];

  //   console.log("Starting backend validation tests...");
    
  //   for (const testCase of testCases) {
  //     try {
  //       const accessToken = localStorage.getItem("access_token");
  //       const response = await axios.post(
  //         `${API_BASE_URL}/api/feedbacks/`,
  //         testCase.data,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
  //       console.log(`✅ Test "${testCase.name}" passed (should have failed)`);
  //     } catch (error) {
  //       console.log(`🔍 Test "${testCase.name}":`);
  //       console.log("Backend response:", error.response?.data);
  //       console.log("-------------------");
  //     }
  //   }
  // };

  // Add a test button (only in development)
  // const TestButton = () => {
  //   if (import.meta.env.DEV) {
  //     return (
  //       <Button
  //         onClick={testBackendValidation}
  //         variant="outlined"
  //         color="secondary"
  //         sx={{ mt: 2 }}
  //       >
  //         Test Backend Validation
  //       </Button>
  //     );
  //   }
  //   return null;
  // };

  return (
    <React.Fragment>
      <ToastContainer position="top-right" autoClose={3000} />

      <Container component="main" maxWidth="lg" >
        <Typography variant="h4" align="center" sx={{ mb: 5, fontWeight: 800,
       
              
                      
                      background: "linear-gradient(60deg, #16477c 0%, #00b5ad 100%)",
                      WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
           }}>Kontakti</Typography>
        <Grid container spacing={6} alignItems="center" sx={{mb:8}}>
          {/* Image */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                src={contactImage}
                alt="Saziņas ilustrācija"
                sx={{
                  width: { xs: "70%", sm: "80%", md: "90%",  lg: "100%" },
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                  borderRadius: 2,
                  mb: 1,
                }}
              />
              <MuiLink
                href="https://storyset.com/business"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: "0.6rem",
                  fontStyle: "italic",
                  color: "#999",
                  fontWeight: 300,
                }}
              >
                Business illustrations by Storyset
              </MuiLink>
            </Box>
          </Grid>

          {/* Form */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box sx={{display: 'flex', flexDirection: "column", mb: 2}}>

               <Typography variant="h4" align="left" sx={{ fontWeight: 500, color: "#16477c", mb: 2 }}>
           Kādi jautājumi?
        </Typography>
            <Typography gutterBottom variant="body1" sx={{mb: 2}}>
              Ja jums ir jautājumi, ierosinājumi vai vienkārši vēlaties ar mums sazināties — aizpildiet formu
              zemāk, un mēs ar prieku atbildēsim.
            </Typography>
              <Typography gutterBottom variant="body1" sx={{mb: 2}}>
              Mēs priecājamies dzirdēt jūsu viedokli! Vai jums ir ideja, ierosinājums vai esat pamanījis kļūdu? Lūdzu, aizpildiet formu zemāk, un mēs ar jums sazināsimies, ja būs nepieciešams.
            </Typography>
  <Typography gutterBottom variant="body1" sx={{mb: 2}}>
            Jūsu atsauksmes palīdz mums uzlabot sniegto informāciju un pakalpojumus.
Neatkarīgi no tā, vai vēlaties uzzināt vairāk, pieteikt sadarbību vai vienkārši dalīties savā pieredzē — jūsu viedoklis mums ir svarīgs.
         </Typography>
</Box>
            
          </Grid>
        </Grid>



   {/* Contact Info */}
        {/* <Typography variant="h4" align="left" sx={{ fontWeight: 500, color: "#16477c",  mb: 2  }}>
           Rakstiet mums.
        </Typography> */}
       <Grid container spacing={6} alignItems="center">
       

          {/* Form */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
       
{/* <Paper sx={{p: 2, borderRadius: 3,  background: '#e3f2fd',  }}>
            <Box
              component="form"
              
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                    <TextField
                label="Tēma"
                fullWidth
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                error={!!errors.subject}
                helperText={errors.subject}
        
         
              />
              <TextField
                label="Jūsu vārds"
                fullWidth
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                error={!!errors.sender}
                helperText={errors.sender}
              />
              <TextField
                label="Jūsu e-pasts"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
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
              />
              <div className="flex items-start gap-2">
            <Checkbox
              id="consent"
              name="consent"
        
              required
            />
     
              Apstiprinu, ka esmu izlasījis{" "}
              <a
                href="policies"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                privātuma politiku
              </a>
              . Dati tiek apstrādāti, lai atbildētu uz pieprasījumu.
 
          </div>
<Button
  type="submit"
  variant="contained"
  fullWidth 
  disabled={loading}
    sx={{ background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)" }}
 
  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
>
  {loading ? "Nosūtīšana..." : "Nosūtīt ziņu"}
</Button>

            </Box>
            </Paper> */}
         <Paper 
              elevation={3}
              sx={{ 
                p: 4, 
                borderRadius: 4,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                // transition: 'transform 0.3s ease-in-out',
                // '&:hover': {
                //   transform: 'translateY(-5px)'
                // }
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 600,
                  color: '#16477c',
                  textAlign: 'center'
                }}
              >
                Sazinieties ar mums
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: 2.5 
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
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mt: 1 }}>
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
                    background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)",
                    // boxShadow: '0 3px 5px 2px rgba(0, 181, 173, .3)',
                  }}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {loading ? "Nosūtīšana..." : user ? "Nosūtīt ziņu" : "Ielogoties, lai nosūtītu ziņu"}
                </Button>
              </Box>
            </Paper>
            {/* <Paper sx={{p: 2, borderRadius: 3,  background: '#e3f2fd',  }}>
            <Box
              component="form"
              
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                    <TextField
                label="Tēma"
                fullWidth
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                error={!!errors.subject}
                helperText={errors.subject}
        
         
              />
              <TextField
                label="Jūsu vārds"
                fullWidth
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                error={!!errors.sender}
                helperText={errors.sender}
              />
              <TextField
                label="Jūsu e-pasts"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
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
              />
              <div className="flex items-start gap-2">
            <Checkbox
              id="consent"
              name="consent"
      
              required
            />

              Apstiprinu, ka esmu izlasījis{" "}
              <a
                href="policies"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                privātuma politiku
              </a>
              . Dati tiek apstrādāti, lai atbildētu uz pieprasījumu.
         
          </div>
<Button
  type="submit"
  variant="contained"
  fullWidth 
  disabled={loading}
    sx={{ background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)" }}
   
  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
>
  {loading ? "Nosūtīšana..." : "Nosūtīt ziņu"}
</Button>

            </Box>
            </Paper> */}
          </Grid>

             {/* Image */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <CardMedia
                component="img"
                src={feedbackImage}
                alt="Saziņas ilustrācija"
                sx={{
                  width: { xs: "70%", sm: "80%", md: "90%",  lg: "100%" },
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                  borderRadius: 2,
                  mb: 1,
                }}
              />
              <MuiLink
                href="https://storyset.com/business"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: "0.6rem",
                  fontStyle: "italic",
                  color: "#999",
                  fontWeight: 300,
                }}
              >
                Business illustrations by Storyset
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
        {/* Contact Info */}
        <Typography variant="h4" align="center" sx={{ fontWeight: 500, color: "#16477c", mt: 8, mb: 4 }}>
          Kontaktinformācija
        </Typography>
<Grid container spacing={3} style={{ marginTop: '1rem', marginBottom: '3rem' }}>
       
  <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} textAlign="center">
   
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>

         <MailIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
    
         
        <div>
          <Typography variant="h6" style={{ marginBottom: '0.5rem', textAlign:  "center", color: '#00b5ad', fontFamily: "Titillium Web, sans-serif" }}>
            <MuiLink  variant="body1"
                    href={`mailto:${EMAIL}`}
                    sx={{ textDecoration: "none", color: "inherit"  }}
                  >
                  {EMAIL}
                  </MuiLink>

          </Typography>
          <Typography variant="body2" style={{ textAlign:  "center", color: '#616f7d', fontFamily: "Titillium Web, sans-serif" }}>
            Jautājumi, atsauksmes vai sadarbība? Rakstiet mums!
          </Typography>
        </div>
      </CardContent>
  
  </Grid>

  <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}  textAlign="center">
   
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>

          <PhoneIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
          
        <div>
          <Typography variant="h6" style={{ marginBottom: '0.5rem', textAlign:  "center", color: '#00b5ad', fontFamily: "Titillium Web, sans-serif" }}>
              <MuiLink  variant="body1"
                    href={`tel:${PHONE_CODE}${PHONE_NUMBER}`}
                    sx={{ textDecoration: "none", color: "inherit"  }}
                  >
                  {`${PHONE_CODE} ${PHONE_NUMBER}`}
                  </MuiLink>
      
          </Typography>
          <Typography variant="body2" style={{ textAlign:  "center", color: '#616f7d', fontFamily: "Titillium Web, sans-serif"  }}>
            
Zvaniet mums darba laikā – mēs vienmēr esam gatavi palīdzēt.
          </Typography>
        </div>
      </CardContent>
   
  </Grid>
  <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}  textAlign="center">
   
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <LocationOnIcon sx={{ fontSize: 60, color: '#16477c', mb: 2 }} />
        <div>
          <Typography variant="h6" style={{ marginBottom: '0.5rem',  textAlign:  "center", color: '#00b5ad', fontFamily: "Titillium Web, sans-serif" }}>
               <MuiLink  variant="body1"
                    href="#"
                    onClick={handleLocationClick}
                    sx={{ textDecoration: "none", color: "inherit"  }}
                  >
                  {`${COUNTRY}, ${CITY}`}
                  </MuiLink>
          </Typography>
     
          <Typography variant="body2" style={{ textAlign:  "center" , color: '#616f7d', fontFamily: "Titillium Web, sans-serif" }}>
            Mēs atrodamies šajā reģionā, bet vienmēr esam gatavi palīdzēt attālināti!


          </Typography>
        </div>
      </CardContent>
   
  </Grid>




  </Grid>
        {/* Social Media */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" align="center" sx={{fontWeight: 500, color: "#16477c", mt: 8, mb: 4 }}>
              Sekojiet mums sociālajos tīklos
            </Typography>

            <Typography
              variant="body1"
              align="center"
              sx={{ maxWidth: 700, mx: "auto", mb: 3, color: "#555" }}
            >
              Mēs dalāmies ar noderīgiem padomiem, jaunākajām ziņām, sadarbībām un stāstiem par pazudušiem
              mājdzīvniekiem. Pievienojieties mums Facebook un Instagram, lai vienmēr būtu lietas kursā.
            </Typography>
          </Grid>

          {[{ href: FACEBOOK, icon: <FacebookIcon fontSize="large" />, color: "#16477c" }, 
          { href: INSTAGRAM, icon: <InstagramIcon fontSize="large" />, color: "#16477c" },
          { href: YOUTUBE, icon: <YouTubeIcon fontSize="large" />, color: "#16477c" }, 
          { href: X, icon: <XIcon fontSize="large" />, color: "#16477c" }].map(({ href, icon, color }, index) => (
            <Grid item key={index}>
              <MuiLink href={href} target="_blank" rel="noopener" underline="none">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: color,
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "#3498db",
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
