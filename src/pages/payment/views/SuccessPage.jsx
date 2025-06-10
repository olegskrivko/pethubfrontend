import { Container, Typography, Paper } from "@mui/material";

const SuccessPage = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5, textAlign: "center", borderRadius: 3 }}>
        <Typography variant="h4" color="success.main" fontWeight="bold">
          Payment Successful! 🎉
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Thank you for your purchase. Your premium subscription is now active.
        </Typography>
      </Paper>
    </Container>
  );
};

export default SuccessPage;
