// PetAttributeItem.jsx
import { Box, IconButton, Typography } from '@mui/material';

const PetAttributeItem = ({ icon, label, value, background = '#f7f9fd', isStatic = false }) => (
  <Box
    gap={1}
    sx={{
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      paddingBottom: '0.3rem',
      color: '#16477c',
    }}
  >
    <IconButton
      disableRipple
      disableFocusRipple
      disableTouchRipple
      sx={{
        cursor: 'default',
        pointerEvents: 'none',
        color: '#16477c',
        // background: 'white',
      }}
    >
      {icon}
    </IconButton>
    <b>{label}:</b> <span style={{ textTransform: 'capitalize' }}>{value ?? '-'}</span>
    <Typography variant="body1" gutterBottom></Typography>
  </Box>
);

export default PetAttributeItem;
