import { Container, Typography, Paper } from "@mui/material";

const CancelPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5, textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h4" color="error.main" fontWeight="bold">
          Payment Canceled ❌
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Your payment was not completed. If this was a mistake, please try again.
        </Typography>
      </Paper>
    </Container>
  );
};

export default CancelPage;
// import { Container, Typography, Paper, Button, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import CancelIcon from '@mui/icons-material/Cancel';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// const SubscriptionCancelPage = () => {
//   const navigate = useNavigate();

//   return (
//     <Container maxWidth="sm">
//       <Paper 
//         elevation={3} 
//         sx={{ 
//           p: 4, 
//           mt: 5, 
//           textAlign: "center", 
//           borderRadius: 3,
//           background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
//           position: 'relative',
//           overflow: 'hidden'
//         }}
//       >
//         {/* Decorative elements */}
//         <Box
//           sx={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             height: '4px',
//             background: 'linear-gradient(90deg, #ff6b6b 0%, #ff8e8e 100%)',
//           }}
//         />

//         {/* Main content */}
//         <Box sx={{ mb: 4 }}>
//           <CancelIcon 
//             sx={{ 
//               fontSize: 80, 
//               color: '#ff6b6b',
//               mb: 2
//             }} 
//           />
//           <Typography 
//             variant="h4" 
//             fontWeight="bold" 
//             gutterBottom
//             sx={{ color: '#2d3436' }}
//           >
//             Subscription Cancelled
//           </Typography>
//           <Typography 
//             variant="body1" 
//             color="text.secondary"
//             sx={{ mb: 3 }}
//           >
//             Your subscription process was cancelled. No charges have been made.
//           </Typography>
//         </Box>

//         {/* Features box */}
//         <Paper 
//           elevation={0}
//           sx={{ 
//             p: 3, 
//             mb: 4, 
//             backgroundColor: 'rgba(255, 107, 107, 0.1)',
//             borderRadius: 2
//           }}
//         >
//           <Typography 
//             variant="h6" 
//             gutterBottom
//             sx={{ color: '#2d3436' }}
//           >
//             What you're missing out on:
//           </Typography>
//           <Box sx={{ textAlign: 'left', pl: 2 }}>
//             {[
//               "Unlimited pet profiles",
//               "Advanced pet care tracking",
//               "Priority support",
//               "Exclusive content"
//             ].map((feature, index) => (
//               <Typography 
//                 key={index}
//                 variant="body1"
//                 sx={{ 
//                   mb: 1,
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1,
//                   color: '#636e72'
//                 }}
//               >
//                 • {feature}
//               </Typography>
//             ))}
//           </Box>
//         </Paper>

//         {/* Action buttons */}
//         <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
//           <Button
//             variant="outlined"
//             startIcon={<ArrowBackIcon />}
//             onClick={() => navigate(-1)}
//             sx={{
//               borderRadius: 2,
//               px: 3,
//               py: 1,
//               borderColor: '#ff6b6b',
//               color: '#ff6b6b',
//               '&:hover': {
//                 borderColor: '#ff5252',
//                 backgroundColor: 'rgba(255, 107, 107, 0.1)'
//               }
//             }}
//           >
//             Go Back
//           </Button>
//           <Button
//             variant="contained"
//             onClick={() => navigate('/subscription')}
//             sx={{
//               borderRadius: 2,
//               px: 3,
//               py: 1,
//               backgroundColor: '#ff6b6b',
//               '&:hover': {
//                 backgroundColor: '#ff5252'
//               }
//             }}
//           >
//             Try Again
//           </Button>
//         </Box>

//         {/* Additional info */}
//         <Typography 
//           variant="body2" 
//           color="text.secondary"
//           sx={{ mt: 4 }}
//         >
//           Need help? Contact our support team at support@pethub.com
//         </Typography>
//       </Paper>
//     </Container>
//   );
// };

// export default SubscriptionCancelPage;