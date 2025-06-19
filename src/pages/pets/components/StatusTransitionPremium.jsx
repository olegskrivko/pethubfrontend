// import React from 'react';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// import ErrorIcon from '@mui/icons-material/Error';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
// import TaskAltIcon from '@mui/icons-material/TaskAlt';
// import { Box, Fade, Paper, Stack, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
// const closedStatuses = ['Atgriezts saimniekam', 'Nodots patversmei', 'Atradies miris', 'Nav aktuāli'];
// const isClosedStatus = (status) => closedStatuses.includes(status);
// const getDaysLeft = (lastUpdated) => {
//   if (!lastUpdated) return null;
//   const now = new Date();
//   const updated = new Date(lastUpdated);
//   const daysPassed = (now - updated) / (1000 * 60 * 60 * 24);
//   return Math.max(0, 90 - Math.floor(daysPassed));
// };
// const StatusTransitionPremium = ({ initialStatus, currentStatus, lastUpdated }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const daysLeft = getDaysLeft(lastUpdated);
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         p: isMobile ? 1 : 1.5,
//         borderRadius: 2,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: isMobile ? 'space-between' : 'center',
//         gap: 2,
//         backgroundColor: '#f9f9f9',
//         mb: 2,
//         overflow: 'hidden',
//       }}
//     >
//       {/* Initial Status (Icon + Label) */}
//       <Tooltip title="Sākotnējais status">
//         <Box display="flex" alignItems="center" gap={0.5}>
//           <RadioButtonUncheckedIcon color="primary" sx={{ fontSize: 22 }} />
//           <Typography variant="body2" fontWeight={400} noWrap>
//             {initialStatus || 'Nav statusa'}
//           </Typography>
//         </Box>
//       </Tooltip>
//       {/* Arrow */}
//       <Fade in timeout={1500}>
//         <DoubleArrowIcon
//           color="primary"
//           sx={{
//             fontSize: isMobile ? 20 : 24,
//             // animation: 'slideArrow 2s infinite alternate',
//             // '@keyframes slideArrow': {
//             //   '0%': { transform: 'translateX(0)' },
//             //   '100%': { transform: 'translateX(6px)' },
//             // },
//           }}
//         />
//       </Fade>
//       {/* Current Status (Icon + Label) */}
//       <Tooltip title="Tagadējais status">
//         <Box display="flex" alignItems="center" gap={0.5}>
//           <TaskAltIcon color="primary" sx={{ fontSize: 22 }} />
//           <Typography variant="body2" fontWeight={400} noWrap>
//             {currentStatus || 'Nav statusa'}
//           </Typography>
//         </Box>
//       </Tooltip>
//     </Paper>
//   );
// };
// export default StatusTransitionPremium;
import React from 'react';

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, Paper, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';

const StatusTransitionPremium = ({ currentStatus }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      //   elevation={0}
      sx={{
        p: isMobile ? 1 : 1.5,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        // backgroundColor: '#f9f9f9',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        mb: 2,
      }}
    >
      <Tooltip title="Tagadējais status">
        <Box display="flex" alignItems="center" gap={1}>
          <TaskAltIcon color="primary" sx={{ fontSize: 22 }} />
          <Typography variant="body2" fontWeight={500} noWrap sx={{ color: '#333' }}>
            {currentStatus || 'Nav statusa'}
          </Typography>
        </Box>
      </Tooltip>
    </Paper>
  );
};

export default StatusTransitionPremium;
