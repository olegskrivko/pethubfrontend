import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import PinterestIcon from '@mui/icons-material/Pinterest';
import PublicIcon from '@mui/icons-material/Public';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
  Paper,
  Typography,
} from '@mui/material';
import axios from 'axios';

import shelterImage from '../../../assets/images/shelters/animal_shelter_pana_blue.svg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ShelterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shelter, setShelter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShelter = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/shelters/${id}/?format=json`);
        setShelter(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shelter:', error);
        setError('Failed to load shelter. Please try again later.');
        setLoading(false);
      }
    };

    if (id) {
      fetchShelter();
    }
  }, [id]);

  if (!shelter) {
    return (
      <Typography variant="h6" align="center" gutterBottom sx={{ mt: 4 }}>
        Loading...
      </Typography>
    );
  }

  const handleLocationClick = () => {
    const { latitude, longitude } = shelter;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/shelters')} sx={{ mb: 3 }}>
        Atpakaļ uz patversmēm
      </Button>

      <Typography variant="h3" align="center" sx={{ mt: 4, mb: 5, fontWeight: 500 }}>
        {shelter.name}
      </Typography>

      <Grid spacing={3}>
        <Grid size={{ xs: 12, sm: 5, md: 5, lg: 5 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <CardMedia
              component="img"
              src={shelterImage}
              alt={shelter.name}
              sx={{
                width: { xs: '100%', sm: '80%', md: '100%' },
                objectFit: 'contain',
                userSelect: 'none',
                pointerEvents: 'none',
                borderRadius: 2,
                mb: 1,
              }}
            />
            {!shelter.image && (
              <MuiLink
                href="https://storyset.com/love"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontSize: '0.6rem',
                  fontStyle: 'italic',
                  color: '#999',
                  fontWeight: 300,
                }}
              >
                Love illustrations by Storyset
              </MuiLink>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 7, md: 7, lg: 7 }}>
          <Card
            sx={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }}
            elevation={0}
          >
            <Typography variant="body1" mb={2}>
              <strong>Par mums: </strong>
              {shelter.description}
            </Typography>

            <Typography variant="body1">
              <strong>Vietne:</strong>
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PublicIcon sx={{ color: '#6E6E6E' }} />
                </ListItemIcon>
                <ListItemText sx={{ ml: -2 }}>
                  <MuiLink href={shelter.website} target="_blank" rel="noopener noreferrer" underline="none">
                    {shelter.website}
                  </MuiLink>
                </ListItemText>
              </ListItem>
            </List>

            <Typography variant="body1">
              <strong>Adrese:</strong>
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon sx={{ color: '#6E6E6E' }} />
                </ListItemIcon>
                <ListItemText sx={{ ml: -2 }}>
                  <MuiLink onClick={handleLocationClick} sx={{ cursor: 'pointer' }}>
                    {shelter.full_address}
                  </MuiLink>
                </ListItemText>
              </ListItem>
            </List>

            <Typography variant="body1">
              <strong>Kontakti:</strong>
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon sx={{ color: '#6E6E6E' }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography component="span">
                      <span>{shelter.phone_code}</span> <span>{shelter.phone_number}</span>
                    </Typography>
                  }
                  sx={{ ml: -2 }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon sx={{ color: '#6E6E6E' }} />
                </ListItemIcon>
                <ListItemText primary={shelter.email} sx={{ ml: -2 }} />
              </ListItem>
            </List>

            <Typography variant="body1">
              <strong>Sociālie mediji:</strong>
            </Typography>
            <List>
              {shelter.social_media.map((profile) => {
                let IconComponent;
                switch (profile.platform.toLowerCase()) {
                  case 'facebook':
                    IconComponent = FacebookIcon;
                    break;
                  case 'instagram':
                    IconComponent = InstagramIcon;
                    break;
                  case 'linkedin':
                    IconComponent = LinkedInIcon;
                    break;
                  case 'youtube':
                    IconComponent = YouTubeIcon;
                    break;
                  case 'x':
                    IconComponent = XIcon;
                    break;
                  case 'pinterest':
                    IconComponent = PinterestIcon;
                    break;
                  default:
                    IconComponent = PublicIcon;
                }

                return (
                  <ListItem key={profile.id}>
                    <ListItemIcon>
                      <IconComponent sx={{ color: '#6E6E6E' }} />
                    </ListItemIcon>
                    <ListItemText sx={{ ml: -2 }}>
                      <MuiLink href={profile.profile_url} target="_blank" rel="noopener noreferrer" underline="none">
                        {profile.platform}
                      </MuiLink>
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>

            {/* Animal types as chips */}
            {shelter.animal_types && shelter.animal_types.length > 0 && (
              <Box mt={2}>
                <Typography variant="body1" gutterBottom>
                  <strong>Dzīvnieku tipi:</strong>
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {shelter.animal_types.map((type) => (
                    <Chip
                      key={type.id}
                      label={type.name}
                      size="small"
                      sx={{ backgroundColor: '#00b5ad', color: '#fff' }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ShelterDetails;
