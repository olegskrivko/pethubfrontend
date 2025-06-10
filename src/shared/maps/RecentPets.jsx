// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import PetCard from './PetCard';  // Assuming PetCard is in the same directory or adjust the path
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

// const RecentPets = () => {
//   const { user } = useAuth(); 
//   const [pets, setPets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const accessToken = localStorage.getItem('access_token'); 
//   if (!accessToken) {
//     setError('You must be logged in to view shelters.');
//     setLoading(false);
//     return;
// }
//   useEffect(() => {
//     // Fetch the latest 4 pets from the backend
//     axios
//       .get(`http://127.0.0.1:8000/api/pets/recent-pets/`, {  headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       },})  // Ensure this matches the correct endpoint
//       .then((response) => {
//         setPets(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('There was an error fetching the pets:', error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
//       {pets.map((pet) => (
//         <PetCard key={pet.id} pet={pet} onPanToLocation={(lat, lon) => { /* Handle pan to location */ }} />
//       ))}
//     </div>
//   );
// };

// export default RecentPets;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import PetCard from '../pages/pets/components/PetCard'; // Assuming PetCard is in the same directory or adjust the path
import { Grid, Typography, CircularProgress ,Button} from '@mui/material'; // Import MUI components
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RecentPets = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state to handle login errors
  const accessToken = localStorage.getItem('access_token');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Small screens (xs, sm)
  useEffect(() => {
    if (!accessToken) {
      setError('You must be logged in to view shelters.');
      setLoading(false);
      return;
    }

    // Fetch the latest 4 pets from the backend
    axios
      .get(`${API_BASE_URL}/pets/recent-pets/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setPets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the pets:', error);
        setLoading(false);
      });
  }, [accessToken]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress /> {/* Show loading spinner while fetching data */}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Grid container spacing={3} justifyContent="center" >
        {pets.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary" textAlign="center">
              No pets found
            </Typography>
          </Grid>
        ) : (
          pets.map((pet) => (
            <Grid item xs={6} sm={6} md={3} key={pet.id} mt={4}>
              <PetCard pet={pet} onPanToLocation={(lat, lon) => { /* Handle pan to location */ }} />
            </Grid>
          ))
        )}
      </Grid>
          {/* <Grid container spacing={2} justifyContent="center" sx={{ marginTop: "2rem" }}>
        <Grid item xs={6} sm={6} md={4} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Button
                      component={Link}
                      to="/pets"
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "#ffcb56",
                        color: "#5B5B5B",
                        fontSize: isSmallScreen ? "1rem" : "1.2rem",
                        padding: isSmallScreen ? "10px" : "16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        "&:hover": { backgroundColor: "#f1b847" },
                      }}
                    >
              
                      Meklēt mājdzīvnieku
                    </Button>
                    </Grid>
                  </Grid> */}
    </div>
  );
};

export default RecentPets;
