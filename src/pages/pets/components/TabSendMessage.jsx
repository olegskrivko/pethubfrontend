import React from 'react';

import PhoneIcon from '@mui/icons-material/Phone';
import { Avatar, Box, Card, CardContent, IconButton, Link, Typography } from '@mui/material';
import moment from 'moment';

import SendMessage from './SendMessage';

const TabSendMessage = ({ pet }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
        },
      }}
    >
      <CardContent style={{ paddingBottom: '1rem' }}>
        <SendMessage />
      </CardContent>
    </Card>
  );
};

export default TabSendMessage;
