import { Container, Typography, Paper } from "@mui/material";
import CheckoutButton from "../components/CheckoutButton";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const plan = queryParams.get("plan");

  // Define plan pricing with price IDs from Stripe Dashboard (make sure these are correct)
  const planDetails = {
    plus: {
      name: "Plus Subscription",
      priceId: "price_1RL6AsBnYVUZPzgipQBY09uT", // Example price ID for Plus plan
    },
    premium: {
      name: "Premium Subscription",
      priceId: "price_1RL6AsBnYVUZPzgipQBY09uT", // Example price ID for Premium plan
    },
    freemium: {
      name: "Freemium Plan",
      priceId: "", // No price for Freemium
    },
  };

  const selectedPlan = planDetails[plan] || planDetails["freemium"];

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5, textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {selectedPlan.name}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Unlock exclusive features and enjoy premium content.
        </Typography>
        <Typography variant="h5" color="primary" fontWeight="bold" sx={{ my: 2 }}>
          {selectedPlan.priceId ? "Subscription Price" : "Free"}
        </Typography>
        <CheckoutButton priceId={selectedPlan.priceId} />
      </Paper>
    </Container>
  );
};

export default CheckoutPage;