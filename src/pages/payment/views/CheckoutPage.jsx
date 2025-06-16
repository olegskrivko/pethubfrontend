import { Container, Typography, Paper, Box } from '@mui/material';
import CheckoutButton from '../components/CheckoutButton';
import { useLocation } from 'react-router-dom';
import TestVisaCard from '../components/TestVisaCard';

const CheckoutPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const plan = queryParams.get('plan');

  // Define plan details with subscription types and features
  const planDetails = {
    plus: {
      name: 'Plus Subscription',
      price: '€5.00/month',
      features: ['Unlimited pet profiles', 'Advanced pet care tracking', 'Priority support', 'Basic analytics'],
    },
    premium: {
      name: 'Premium Subscription',
      price: '€12.00/month',
      features: [
        'All Plus features',
        'Veterinary consultation',
        'Pet health reports',
        'Advanced analytics',
        '24/7 support',
      ],
    },
    freemium: {
      name: 'Free Plan',
      price: 'Free',
      features: ['Basic pet profile', 'Limited pet care tracking', 'Community access'],
    },
  };

  const selectedPlan = planDetails[plan] || planDetails['freemium'];

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5, textAlign: 'center', borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {selectedPlan.name}
        </Typography>

        <Typography variant="h5" color="primary" fontWeight="bold" sx={{ my: 2 }}>
          {selectedPlan.price}
        </Typography>

        {plan !== 'freemium' && <CheckoutButton subscriptionType={plan} />}
      </Paper>
    </Container>
  );
};

export default CheckoutPage;
