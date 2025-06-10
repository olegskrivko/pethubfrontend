import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

const Logout = () => {
  return (
    <Container maxWidth="xs" sx={{ paddingLeft: 0, paddingRight: 0 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Paldies, ka bijāt ar mums!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: "#5B5B5B" }} align="center">
          Jūs esat veiksmīgi izrakstījies no sistēmas. Mēs ceram jūs atkal redzēt drīzumā!
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 3, backgroundColor: "#5B9BD5" }}
          component={Link}
          to="/login"
          fullWidth
        >
          Pieteikties vēlreiz
        </Button>

        <Button
          variant="outlined"
          sx={{ mt: 2, color: "#5B9BD5" }}
          component={Link}
          to="/"
          fullWidth
        >
          Atpakaļ uz sākumlapu
        </Button>
      </Box>
    </Container>
  );
};

export default Logout;
