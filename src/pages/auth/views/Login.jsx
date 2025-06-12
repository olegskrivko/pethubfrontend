import React, { useState, useLayoutEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, IconButton, InputAdornment, CircularProgress,  Link as MuiLink, } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext"; // Import the useAuth hook

const Login = () => {
  const { login } = useAuth(); // Destructure the login method from the context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading
  const emailInputRef = useRef(null); // Create a ref for the email input
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Lūdzu, ievadiet savu e-pastu un paroli");
      return;
    }

    setLoading(true); // Start the loading spinner

    try {
      const success = await login(email, password); // login from AuthContext will handle the API request

      if (success) {
        setLoading(false); // Stop the loading spinner
        navigate("/"); // Redirect to home page after login
      } else {
        setError("Nepareizs e-pasts vai parole");
        setLoading(false); // Stop the loading spinner if login fails
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Radās kļūda pieteikšanās laikā");
      setLoading(false); // Stop the loading spinner if an error occurs
    }
  };

  // Use useLayoutEffect to focus the email input when the component is mounted
  useLayoutEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus(); // Focus the email input immediately after mount
    }
  }, []); // Empty dependency array to run once when the component mounts

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" align="center" sx={{color:"#16477c"}}>
          Pieteikties
        </Typography>
        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-pasts"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputRef={emailInputRef} // Focus the email input immediately
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Parole"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

<Button
            type="submit"
            fullWidth
            variant="contained"
       
            sx={{ mt: 2, mb: 2, background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)" }}
            disabled={loading} // Disable button during loading
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Pieteikties"}
          </Button>
          <Box style={{display: "flex",  flexDirection: 'column'}}>
          {/* Register Link */}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Jums vēl nav konta? <Link to="/register" style={{
                        color: '#00b5ad',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }} >Reģistrējieties tagad!</Link>
          </Typography>

          {/* Forgot Password Link */}
          <Typography variant="body2" align="center" sx={{ mt: 1,  }}>
            <Link to="/forgot-password"  style={{
                        color: '#00b5ad',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}>Aizmirsi paroli?</Link>
          </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
{/* <MuiLink
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
                    ></MuiLink> */}