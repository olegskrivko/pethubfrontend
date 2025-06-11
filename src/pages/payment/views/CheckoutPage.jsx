// import { Container, Typography, Paper } from "@mui/material";
// import CheckoutButton from "../components/CheckoutButton";
// import { useLocation } from "react-router-dom";

// const CheckoutPage = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const plan = queryParams.get("plan");

//   // Define plan pricing with price IDs from Stripe Dashboard (make sure these are correct)
//   const planDetails = {
//     plus: {
//       name: "Plus Subscription",
//       priceId: "price_1RYk7uBnYVUZPzgiGonItYec", // Example price ID for Plus plan
//     },
//     premium: {
//       name: "Premium Subscription",
//       priceId: "price_1RYk6rBnYVUZPzginrD4F4cV", // Example price ID for Premium plan
//     },
//     freemium: {
//       name: "Freemium Plan",
//       priceId: "", // No price for Freemium
//     },
//   };
 
//   const selectedPlan = planDetails[plan] || planDetails["freemium"];

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ p: 4, mt: 5, textAlign: "center", borderRadius: 3 }}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           {selectedPlan.name}
//         </Typography>
//         <Typography variant="h6" color="text.secondary" gutterBottom>
//           Unlock exclusive features and enjoy premium content.
//         </Typography>
//         <Typography variant="h5" color="primary" fontWeight="bold" sx={{ my: 2 }}>
//           {selectedPlan.priceId ? "Subscription Price" : "Free"}
//         </Typography>
//         <CheckoutButton priceId={selectedPlan.priceId} />
//       </Paper>
//     </Container>
//   );
// };

// export default CheckoutPage;
import { Container, Typography, Paper, Box } from "@mui/material";
import CheckoutButton from "../components/CheckoutButton";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const plan = queryParams.get("plan");

  // Define plan details with subscription types and features
  const planDetails = {
    plus: {
      name: "Plus Subscription",
      price: "€5.00/month",
      features: [
        "Unlimited pet profiles",
        "Advanced pet care tracking",
        "Priority support",
        "Basic analytics"
      ]
    },
    premium: {
      name: "Premium Subscription",
      price: "€12.00/month",
      features: [
        "All Plus features",
        "Veterinary consultation",
        "Pet health reports",
        "Advanced analytics",
        "24/7 support"
      ]
    },
    freemium: {
      name: "Free Plan",
      price: "Free",
      features: [
        "Basic pet profile",
        "Limited pet care tracking",
        "Community access"
      ]
    }
  };
 
  const selectedPlan = planDetails[plan] || planDetails["freemium"];

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5, textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {selectedPlan.name}
        </Typography>
        
        <Typography variant="h5" color="primary" fontWeight="bold" sx={{ my: 2 }}>
          {selectedPlan.price}
        </Typography>

        {/* <Box sx={{ my: 3 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Features included:
          </Typography>
          {selectedPlan.features.map((feature, index) => (
            <Typography 
              key={index} 
              variant="body1" 
              sx={{ 
                my: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              ✓ {feature}
            </Typography>
          ))}
        </Box> */}

        {plan !== 'freemium' && (
          <CheckoutButton subscriptionType={plan} />
        )}
      </Paper>
    </Container>
  );
};

export default CheckoutPage;