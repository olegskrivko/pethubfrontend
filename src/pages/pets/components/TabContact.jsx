// import React from 'react';
// import PhoneIcon from '@mui/icons-material/Phone';
// import { Avatar, Box, Card, CardContent, IconButton, Link, Typography } from '@mui/material';
// import moment from 'moment';
// const TabContact = ({ pet }) => {
//   return (
//     <Card
//       sx={{
//         borderRadius: 3,
//         background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
//         cursor: 'pointer',
//         transition: 'all 0.3s ease-in-out',
//         '&:hover': {
//           background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
//         },
//       }}
//     >
//       <CardContent style={{ paddingBottom: '1rem' }}>
//         <Box display="flex" alignItems="center" mb={2}>
//           <Avatar
//             src={`a.svg`}
//             alt={pet.author.username.toUpperCase()}
//             style={{ backgroundColor: '#00b3a4', color: '#f7f9fd' }}
//           />
//           <Box ml={2}>
//             <Typography variant="body2" fontWeight="bold">
//               {pet.author.username.toUpperCase()}
//             </Typography>
//           </Box>
//         </Box>
//         <Box display="flex" alignItems="center" gap={2} mt={2}>
//           <IconButton
//             style={{
//               backgroundColor: '#00b3a4',
//               color: '#f7f9fd',
//               pointerEvents: 'none',
//             }}
//           >
//             <PhoneIcon />
//           </IconButton>
//           {pet.contact_phone ? (
//             <Typography variant="body1">
//               <Link href={`tel:+${pet.phone_code}${pet.contact_phone}`} underline="none" color="inherit">
//                 +{pet.phone_code} {pet.contact_phone}
//               </Link>
//             </Typography>
//           ) : (
//             <Box>
//               <Typography variant="body1" color="textSecondary">
//                 Telefona numurs nav norādīts
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };
// export default TabContact;
import React from 'react';
import { useTranslation } from 'react-i18next';

import PhoneIcon from '@mui/icons-material/Phone';
import { Avatar, Box, Card, CardContent, IconButton, Link, Typography } from '@mui/material';

import AnimalAvatar from '../../../shared/components/AnimalAvatar';

const TabContact = ({ pet }) => {
  const { t } = useTranslation('petDetails');

  return (
    <Card
      sx={{
        p: { xs: 1, sm: 2 },
        borderRadius: 3,
        background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
        },
      }}
    >
      {/* <CardContent style={{ paddingBottom: '1rem' }}> */}
      <Box display="flex" alignItems="center" mb={2}>
        {/* <Avatar
            src={`a.svg`}
            alt={pet.author.username.toUpperCase()}
            style={{ backgroundColor: '#00b3a4', color: '#f7f9fd' }}
          /> */}

        <AnimalAvatar animal={pet.author.avatar} username={pet.author.username} />

        <Box ml={2}>
          <Typography variant="body2" fontWeight="bold">
            {pet.author.username.toUpperCase()}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <IconButton
          style={{
            backgroundColor: '#00b3a4',
            color: '#f7f9fd',
            pointerEvents: 'none', // keeps icon non-clickable
          }}
        >
          <PhoneIcon />
        </IconButton>

        {pet.contact_phone ? (
          <Typography variant="body1">
            <Link
              href={`tel:+${pet.phone_code}${pet.contact_phone}`}
              underline="none"
              color="inherit"
              sx={{ cursor: 'pointer' }}
            >
              +{pet.phone_code} {pet.contact_phone}
            </Link>
          </Typography>
        ) : (
          <Box>
            <Typography variant="body1" color="textSecondary">
              {t('contact.phoneNotProvided')}
            </Typography>
          </Box>
        )}
      </Box>
      {/* </CardContent> */}
    </Card>
  );
};

export default TabContact;
