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
