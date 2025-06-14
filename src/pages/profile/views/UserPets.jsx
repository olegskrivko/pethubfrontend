import React, { useState, useEffect } from 'react';
import {
  Modal,
 

  Select,
  MenuItem,

} from '@mui/material';
import {
  Typography,
  Card,
  Chip,
  CardContent,
  Avatar,
  Grid,
  Box,
  Button,
  Tooltip,
  Link as MuiLink,
  Container,
  IconButton,
} from '@mui/material';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkIcon from '@mui/icons-material/Bookmark';  // ✅ Import missing icon
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PetsIcon from '@mui/icons-material/Pets';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
function UserPets() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownedPets, setOwnedPets] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
const [selectedPet, setSelectedPet] = useState(null);
const [newStatus, setNewStatus] = useState('');

  console.log("user", user);
  console.log("ownedPets", ownedPets);

  useEffect(() => {
    const fetchUserPets = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setError('You must be logged in to view pets.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/accounts/user-pets/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setOwnedPets(response.data);
      } catch (error) {
        console.error('Error fetching pets data:', error);
        setError('Failed to fetch pets data');
      } finally {
        setLoading(false);  // ✅ Ensure loading stops after fetch
      }
    };

    fetchUserPets();
  }, []);

  const handleDeletePet = async (petId) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      alert('You must be logged in to delete pets.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/accounts/user-pets/${petId}/delete/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Pet deleted successfully');
        setOwnedPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));  // ✅ Remove pet from UI
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error deleting pet:', error);
      alert('Error deleting pet');
    }
  };

  // const handleEditPet = (petId) => {
  //   navigate(`/user-profile/edit-pet/${petId}`);
  // };
const handleEditPet = (pet) => {
  setSelectedPet(pet);
  setNewStatus(pet.final_status || '');
  setEditModalOpen(true);
};
  // Loading and error state handling
  if (loading) {
    return (
      <Container>
        <Typography variant="h5" align="center">
          Ielādē mājdzīvniekus...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h5" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
 <Container component="main" maxWidth="lg" >

  <Typography variant="h4" align="center" sx={{ mb: 5, fontWeight: 800,
       
              
                      
                      background: "linear-gradient(60deg, #16477c 0%, #00b5ad 100%)",
                      WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
           }}>Mani mājdzīvnieki</Typography>
      {ownedPets.length === 0 ? (
        // ✅ Display message when user has no pets
  

        <Card sx={{
            p: 2,
            borderRadius: 3,
            background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
            },
          }}>
        <CardContent  sx={{paddingBottom: "1rem !important"}}>

        <Box display="flex" alignItems="center">
        <PetsIcon color="primary" sx={{ fontSize: 28, marginRight: "1rem"  }} />
          <Typography variant="body2" color="textSecondary">
            Jums vēl nav pievienotu mājdzīvnieku.
          </Typography>
        
          </Box>
        </CardContent>
      </Card>
      ) : (
        <Grid container spacing={2}>
          {ownedPets.map((pet) => (
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={pet.id}>
              <Card sx={{
            p: 2,
            borderRadius: 3,
            background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            // cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
            },
          }}>
                {/* <CardContent> */}
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={pet.pet_image_1}
                      alt={pet.species_display}
                      sx={{ width: 64, height: 64, marginRight: 2 }}
                    />
                    <Box flexGrow={1}>
                      <Typography variant="h6">
                        <MuiLink href={`/pets/${pet.id}`} underline="none">
                          <Chip
                            label={pet.species_display || 'Nezināms'}
                            size="small"
                            variant="contained"
                            style={{ backgroundColor: '#5B9BD5', color: '#fff' }}
                          />
                        </MuiLink>
                      </Typography>
                          <Box style={{display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                    <Typography variant="body2" color="textSecondary">
                      {pet.status_display || "Nav statusa"}
                    </Typography>
                    <DoubleArrowIcon color="primary"  sx={{marginLeft: "1rem", marginRight: "1rem", fontSize: "1rem"}} />
     <Typography variant="body2" color="textSecondary">
                      {pet.final_status_display || "Nav statusa"}
                    </Typography>
               </Box>
                    </Box>

                    <Tooltip title="Rediģēt">
                      <IconButton
                        edge="end"
                        color="primary"
                        style={{ marginLeft: '0.5rem' }}
                        aria-label="edit"
                        // onClick={() => handleEditPet(pet.id)}
                        onClick={() => handleEditPet(pet)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Izdzēst">
                      <IconButton
                        edge="end"
                        color="error"
                        style={{ marginLeft: '1rem' }}
                        aria-label="delete"
                        onClick={() => handleDeletePet(pet.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                {/* </CardContent> */}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}


      <Grid container spacing={2}>
  <Grid size={{xs: 12, sm: 12, md: 12, lg: 12}} >
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
    >
      <Button
        variant="outlined"
        color="primary"
        startIcon={<ArrowBackIcon />}
        component={Link}
        to={`/user-profile`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        Atpakaļ
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<PetsIcon />}
        component={Link}
        to="/add-pet"
        style={{ textDecoration: "none" }}
      >
        Pievienot mājdzīvnieku
      </Button>
    </Box>
  </Grid>
</Grid>
<Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 300,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 24,
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
  >
    <Typography variant="h6">Mainīt statusu</Typography>
    <Select
      fullWidth
      value={newStatus}
      onChange={(e) => setNewStatus(e.target.value)}
      sx={{ mb: 3 }}
    >
      <MenuItem value={1}>Nav atrisināts</MenuItem>
      <MenuItem value={2}>Atgriezts saimniekam</MenuItem>
      <MenuItem value={3}>Nodots patversmei</MenuItem>
      <MenuItem value={4}>Joprojām tiek meklēts</MenuItem>
      <MenuItem value={5}>Nav aktuāli</MenuItem>
      <MenuItem value={6}>Atradies miris</MenuItem>
      <MenuItem value={7}>Saimnieks neatrasts</MenuItem>
    </Select>

    <Box display="flex" justifyContent="space-between">
      <Button onClick={() => setEditModalOpen(false)}>Atcelt</Button>
      <Button
        variant="contained"
        onClick={async () => {
          try {
            const accessToken = localStorage.getItem('access_token');
            await axios.patch(`${API_BASE_URL}/api/accounts/user-pets/${selectedPet.id}/update/`, {
              final_status: newStatus,
            }, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            // Update state
            setOwnedPets((prev) =>
              prev.map((pet) =>
                pet.id === selectedPet.id ? { ...pet, final_status: newStatus } : pet
              )
            );

            setEditModalOpen(false);
          } catch (err) {
            console.error("Error updating status", err);
            alert("Neizdevās saglabāt statusu.");
          }
        }}
      >
        Saglabāt
      </Button>
    </Box>
  </Box>
</Modal>
    </Container>
  );
}

export default UserPets;
