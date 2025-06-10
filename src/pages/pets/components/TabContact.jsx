import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
  Link,
  Avatar,
} from '@mui/material';

import PhoneIcon from '@mui/icons-material/Phone';
import moment from 'moment';
  
const TabContact = ({ pet }) => {
  return (
  <Card>
    <CardContent style={{ paddingBottom: "1rem" }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar src={`a.svg`} alt={pet.author.username.toUpperCase()} style={{ backgroundColor: '#555', color: '#fff' }} />
        <Box ml={2}>
        <Typography variant="body2" fontWeight="bold">
        {pet.author.username.toUpperCase()}
        </Typography>
        {/* <Typography variant="body2" color="textSecondary">
        {moment(pet.created_at).fromNow()}
        </Typography> */}
      </Box>
      </Box>               
       <Box display="flex" alignItems="center" gap={2} mt={2}>
      <IconButton style={{ backgroundColor: '#555', color: '#fff', pointerEvents: 'none' }}>
        <PhoneIcon />
      </IconButton>
  
  {pet.contact_phone ? (
    <Typography variant="body1">
       <Link href={`tel:+${pet.phone_code}${pet.contact_phone}`} underline="none" color="inherit">
      +{pet.phone_code} {pet.contact_phone}
    </Link>
    </Typography>
  ) : (
    <Box>
      <Typography variant="body1" color="textSecondary">
      Telefona numurs nav norādīts
      </Typography>
      {/* <Typography variant="body2" color="textSecondary">
      Saziņai izmantojiet komentāru sadaļu
      </Typography> */}
    </Box>
  )}
</Box>
</CardContent>
</Card>
   
  );
};

export default TabContact;
