import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import TestVisaCard from '../components/TestVisaCard';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const plans = [
  // ... your plans unchanged ...
  {
    name: 'Freemium plāns',
    price: 'Bezmaksas',
    id: 'freemium',
    color: '#d0f0f5',
    features: [
      { text: 'Publicējiet 1 pazudušu, atrastu dzīvnieku' },
      { text: 'Pārlūkojiet pakalpojumus un meklējiet dzīvniekus' },
      { text: 'Saņemiet reāllaika paziņojumus' },
      { text: 'Publicējiet 1 pakalpojumu' },
      { text: 'Piekļuve pamata nodarbībām' },
      { text: 'Sludinājuma laiks līdz 30 dienām', extra: true },
      { text: 'Ekskluzīvas atlaides dzīvnieku pakalpojumiem', extra: true },
      { text: 'Plus punkts karmai', extra: true },
      { text: 'Piekļuve premium nodarbībām', extra: true },
      { text: 'Sludinājums sociālajos tīklos', extra: true },
      { text: 'Individuālās konsultācijas', extra: true },
      { text: 'Bez reklāmām', extra: true },
      { text: 'AI chatbots', extra: true },
    ],
  },
  {
    name: 'Plus plāns',
    price: '5€ / mēnesī',
    id: 'plus',
    color: '#e8f6f9',
    features: [
      { text: 'Prioritārie dzīvnieku sludinājumi (parādās augšā)' },
      { text: 'Paplašināts sludinājumu laiks 90 dienas' },
      { text: 'Publicējiet līdz 5 pazudušiem, atrastiem dzīvniekiem' },
      { text: 'Saņemiet reāllaika paziņojumus' },
      { text: 'Ekskluzīvas atlaides dzīvnieku pakalpojumiem' },
      { text: 'Publicējiet līdz 3 pakalpojumiem' },
      { text: 'Plus punkts karmai' },
      { text: 'Piekļuve premium nodarbībām' },
      { text: 'Sludinājums sociālajos tīklos' },
      { text: 'Individuālās konsultācijas', extra: true },
      { text: 'Bez reklāmām', extra: true },
      { text: 'AI chatbots', extra: true },
    ],
  },
  {
    name: 'Premium plāns',
    price: '12€ / mēnesī',
    id: 'premium',
    color: '#e8f6f9',
    features: [
      { text: 'Prioritārie dzīvnieku sludinājumi (parādās augšā)' },
      { text: 'Paplašināts sludinājumu laiks 90 dienas' },
      { text: 'Publicējiet līdz 5 pazudušiem, atrastiem dzīvniekiem' },
      { text: 'Saņemiet reāllaika paziņojumus' },
      { text: 'Ekskluzīvas atlaides dzīvnieku pakalpojumiem' },
      { text: 'Publicējiet līdz 5 pakalpojumiem' },
      { text: 'Plus punkts karmai' },
      { text: 'Piekļuve premium nodarbībām' },
      { text: 'Sludinājums sociālajos tīklos' },
      { text: 'Individuālās konsultācijas' },
      { text: 'Bez reklāmām' },
      { text: 'AI chatbots' },
    ],
  },
];

const isSubscriptionActive = (endDate) => {
  if (!endDate) return false;
  return new Date() < new Date(endDate);
};

const PricingPage = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionError, setSubscriptionError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      setSubscriptionError(null);
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/api/payment/subscription/status/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log('Subscription status response:', data);
      setSubscription(data);
    } catch (error) {
      setSubscriptionError('Neizdevās iegūt abonementa statusu.');
      console.error('Error fetching subscription status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
        {/* <Typography mt={2}>Ielādē plānus...</Typography> */}
      </Box>
    );
  }

  if (subscriptionError) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography color="error">{subscriptionError}</Typography>
      </Box>
    );
  }

  const hasActiveSubscription = subscription && isSubscriptionActive(subscription.subscription_end);
  const currentPlanId = subscription?.subscription_type;

  // Handler when user clicks disabled button
  const handleDisabledClick = (e) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  return (
    <Container maxWidth="lg">
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
        Izvēlieties savu plānu
      </Typography>

      {/* {hasActiveSubscription && (
        <Box mb={3} textAlign="center" color="error.main" fontWeight="bold">
          Jums jau ir aktīvs <u>{currentPlanId}</u> plāns līdz{" "}
          {new Date(subscription.subscription_end).toLocaleDateString()}. Jaunus plānus varēs iegādāties tikai pēc šī perioda beigām.
        </Box>
      )} */}

      <Grid container spacing={3} justifyContent="center">
        {plans.map((plan) => {
          const isActive = plan.id === currentPlanId && hasActiveSubscription;

          return (
            <Grid size={{ xs: 12, sm: 8, md: 4, lg: 4 }} key={plan.id} display="flex" justifyContent="center">
              <Box position="relative" width="100%" maxWidth="380px">
                {/* {isActive && (
                  <Chip
                    label="Aktīvais plāns"
                    color="success"
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      zIndex: 10,
                      fontWeight: "bold",
                    }}
                  />
                )} */}
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '12px',
                    border: '1px solid #ddd',
                    textAlign: 'center',
                    height: '100%',
                    background: isActive
                      ? 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)'
                      : 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                    //background: isActive ? `linear-gradient(90deg, ${plan.color} 0%, #f1faff 100%)` : "white",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#16477c' }}>
                      {plan.name}
                    </Typography>
                    <Typography variant="h5" mt={1} sx={{ color: '#00b5ad' }} gutterBottom>
                      {plan.price}
                    </Typography>
                    <List sx={{ textAlign: 'left' }}>
                      {plan.features.map((feat, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <CheckCircle sx={{ color: feat.extra ? '#FF746C' : '#1976d2' }} />
                          </ListItemIcon>
                          <ListItemText primary={feat.text} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                  <CardActions sx={{ width: '100%', px: 2, pb: 2 }}>
                    {isActive ? (
                      <Button variant="contained" fullWidth disabled>
                        Aktīvs
                      </Button>
                    ) : hasActiveSubscription ? (
                      <Button
                        variant="outlined"
                        fullWidth
                        disabled={false} // Not disabled visually, but will block clicks to show dialog
                        onClick={handleDisabledClick}
                        sx={{
                          mt: 1,
                          py: 1,
                          background: 'linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)',
                          color: 'white',
                          cursor: 'pointer',
                        }}
                      >
                        Izvēlēties
                      </Button>
                    ) : (
                      <Link to={`/checkout?plan=${plan.id}`} style={{ width: '100%', textDecoration: 'none' }}>
                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{
                            mt: 1,
                            py: 1,
                            background: 'linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)',
                            color: 'white',
                          }}
                        >
                          Izvēlēties
                        </Button>
                      </Link>
                    )}
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3} justifyContent="center">
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} display="flex" justifyContent="center">
          {/* Single message below all cards */}
          <Typography variant="body2" align="center" sx={{ mt: 4, color: '#555' }}>
            Lai pārvaldītu vai atceltu plānu, dodieties uz profilu.
          </Typography>
        </Grid>
      </Grid>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Nevar iegādāties jaunu plānu</DialogTitle>
        <DialogContent>
          {hasActiveSubscription && (
            <Box mb={3} textAlign="center" color="error.main" fontWeight="bold">
              Jums jau ir aktīvs <u>{currentPlanId}</u> plāns līdz{' '}
              {new Date(subscription.subscription_end).toLocaleDateString()}. Jaunus plānus varēs iegādāties tikai pēc
              šī perioda beigām.
            </Box>
          )}
          {/* Jums jau ir aktīvs abonements. Jaunu plānu varēs iegādāties tikai pēc esošā abonementa perioda beigām. */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} autoFocus>
            Labi
          </Button>
        </DialogActions>
      </Dialog>

      <TestVisaCard />
    </Container>
  );
};

export default PricingPage;
