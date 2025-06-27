import { Box, Divider, Paper, Stack, Typography } from '@mui/material';

const StatsCard = ({ totalPosters, postersCountByPet }) => (
  <Paper
    elevation={3}
    sx={{
      mt: 3,
      px: 3,
      py: 2,
      borderTop: '4px solid #00b5ad',
      boxShadow: 1,
      position: 'relative',
      backgroundColor: '#fff',
      borderRadius: 2,
    }}
  >
    <Typography variant="h5" sx={{ fontWeight: '700', mb: 2, color: '#222' }}>
      Posters Statistics
    </Typography>

    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#444' }}>
      Total Posters: {totalPosters}
    </Typography>

    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#444' }}>
      Posters per Pet:
    </Typography>

    <Stack
      component="ul"
      sx={{
        pl: 3,
        listStyleType: 'disc',
        color: '#555',
        fontWeight: 500,
        fontSize: '1rem',
      }}
    >
      {Object.entries(postersCountByPet).map(([petId, count]) => (
        <Typography key={petId} component="li" sx={{ mb: 0.5 }}>
          Pet ID {petId}: {count} poster{count > 1 ? 's' : ''}
        </Typography>
      ))}
    </Stack>
  </Paper>
);

export default StatsCard;
