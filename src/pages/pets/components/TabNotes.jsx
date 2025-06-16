import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Tooltip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import moment from 'moment';

const TabNotes = ({ pet }) => {
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
        {pet.notes ? (
          <Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                style={{
                  backgroundColor: '#555',
                  color: '#fff',
                  pointerEvents: 'none',
                }}
              >
                <TextSnippetIcon />
              </IconButton>{' '}
              {pet.notes}
            </Box>
          </Typography>
        ) : (
          <Typography color="textSecondary">
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                style={{
                  backgroundColor: '#555',
                  color: '#fff',
                  pointerEvents: 'none',
                }}
              >
                <TextSnippetIcon />
              </IconButton>{' '}
              Šim sludinājumam nav pievienotas piezīmes.
            </Box>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TabNotes;
