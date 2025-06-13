// import React from 'react';
// import { Card, CardContent, Typography, Box, Grid, Tooltip, IconButton } from '@mui/material';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// const testCard = {
//   number: '4242 4242 4242 4242',
//   expiry: '12/34',
//   cvc: '123',
//   zip: '12345',
// };

// const copyToClipboard = (text) => {
//   navigator.clipboard.writeText(text);
// };

// const TestVisaCard = () => {
//   return (
//     <Box sx={{ maxWidth: 420, mx: 'auto', mt: 4 }}>
//       <Typography variant="body1" color="textSecondary" sx={{ mb: 2, textAlign: 'center' }}>
//         For testing purposes, please use the following card details:
//       </Typography>

//       <Card sx={{ background: 'linear-gradient(135deg, #1976d2, #0d47a1)', color: 'white', borderRadius: 3 }}>
//         <CardContent>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="h6">Test Visa Card</Typography>
//             <CreditCardIcon sx={{ fontSize: 40 }} />
//           </Box>

//           <Box display="flex" alignItems="center" mb={2}>
//             <Typography variant="h5" sx={{ letterSpacing: 2, fontFamily: 'monospace', flexGrow: 1 }}>
//               {testCard.number}
//             </Typography>
//             <Tooltip title="Copy number">
//               <IconButton onClick={() => copyToClipboard(testCard.number)} size="small" sx={{ color: 'white' }}>
//                 <ContentCopyIcon fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           </Box>

//           <Grid container spacing={2}>
//             <Grid size={{xs:4}} >
//               <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                 Expiry
//               </Typography>
//               <Typography>{testCard.expiry}</Typography>
//             </Grid>
//             <Grid size={{xs:4}}>
//               <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                 CVC
//               </Typography>
//               <Typography>{testCard.cvc}</Typography>
//             </Grid>
//             <Grid size={{xs:4}}>
//               <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                 ZIP
//               </Typography>
//               <Typography>{testCard.zip}</Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default TestVisaCard;
import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Tooltip, IconButton } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const testCard = {
  name: 'JANIS KALNINS',
  number: '4242 4242 4242 4242',
  expiry: '12/34',
  cvc: '123',
  zip: '12345',
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

const TestVisaCard = () => {
  return (
    <Box sx={{ maxWidth: 420, mx: 'auto', mt: 4 }}>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 2, textAlign: 'center' }}>
        For testing purposes, please use the following card details:
      </Typography>

      <Card sx={{ background: 'linear-gradient(135deg, #1976d2, #0d47a1)', color: 'white', borderRadius: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Test Visa Card</Typography>
            <CreditCardIcon sx={{ fontSize: 40 }} />
          </Box>

          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
            {testCard.name}
          </Typography>

          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="h5" sx={{ letterSpacing: 2, fontFamily: 'monospace', flexGrow: 1 }}>
              {testCard.number}
            </Typography>
            <Tooltip title="Copy number">
              <IconButton onClick={() => copyToClipboard(testCard.number)} size="small" sx={{ color: 'white' }}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Expiry
              </Typography>
              <Typography>{testCard.expiry}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                CVC
              </Typography>
              <Typography>{testCard.cvc}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                ZIP
              </Typography>
              <Typography>{testCard.zip}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TestVisaCard;
