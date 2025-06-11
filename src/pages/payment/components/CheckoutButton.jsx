// import { useState } from "react";
// import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../contexts/AuthContext"; // Assuming you have this context

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

// const CheckoutButton = ({ priceId }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const handleCheckout = async () => {
//     if (!user) {
//       setError("You need to be logged in to make a payment.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const accessToken = localStorage.getItem("access_token");

//       // Check if the plan has a price ID for subscription
//       const response = await fetch(`${API_BASE_URL}/api/payment/create-checkout-session/subscription/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({ priceId }), // Pass the priceId for subscriptions
//       });

//       const data = await response.json();

//       if (response.ok && data.url) {
//         window.location.href = data.url;
//       } else {
//         setError(data.error || "Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       setError("Failed to connect to the payment server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleCheckout}
//         disabled={loading}
//         sx={{ mt: 2, px: 4, py: 1.5, fontSize: "1rem" }}
//       >
//         {loading ? <CircularProgress size={24} color="inherit" /> : "Pay Now"}
//       </Button>

//       <Snackbar
//         open={!!error}
//         autoHideDuration={5000}
//         onClose={() => setError(null)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity="error" onClose={() => setError(null)}>
//           {error}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default CheckoutButton;
// components/CheckoutButton.jsx
// import { useState } from "react";
// import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
// import { useAuth } from "../../../contexts/AuthContext";
// import { toast } from "react-toastify";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const CheckoutButton = ({ subscriptionType = 'plus' }) => {
//   const [loading, setLoading] = useState(false);
//   const { user } = useAuth();

//   const handleCheckout = async () => {
//     if (!user) {
//       toast.error("You need to be logged in to make a payment.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const accessToken = localStorage.getItem("access_token");
//       const response = await fetch(
//         `${API_BASE_URL}/api/payment/create-checkout-session/subscription/`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//           body: JSON.stringify({ subscription_type: subscriptionType }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Something went wrong. Please try again.");
//       }

//       if (data.url) {
//         window.location.href = data.url;
//       }
//     } catch (error) {
//       toast.error(error.message || "Failed to connect to the payment server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Button
//       variant="contained"
//       color="primary"
//       onClick={handleCheckout}
//       disabled={loading}
//       sx={{ mt: 2, px: 4, py: 1.5, fontSize: "1rem" }}
//     >
//       {loading ? <CircularProgress size={24} color="inherit" /> : "Subscribe Now"}
//     </Button>
//   );
// };

// export default CheckoutButton;

import { useState } from "react";
import { Button, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useAuth } from "../../../contexts/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CheckoutButton = ({ subscriptionType = 'plus' }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      setError("You need to be logged in to make a payment.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(
        `${API_BASE_URL}/api/payment/create-checkout-session/subscription/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ subscription_type: subscriptionType }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      setError(error.message || "Failed to connect to the payment server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckout}
        disabled={loading}
        sx={{ 
          mt: 2, 
          px: 4, 
          py: 1.5, 
          fontSize: "1rem",
          '&:hover': {
            backgroundColor: 'primary.dark',
          }
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Subscribe Now"}
      </Button>

      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert 
          severity="error" 
          onClose={() => setError(null)}
          sx={{ 
            width: '100%',
            '& .MuiAlert-message': {
              fontSize: '0.9rem'
            }
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CheckoutButton;