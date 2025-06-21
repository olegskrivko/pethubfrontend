import React from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
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
      {/* <CardContent style={{ paddingBottom: '1rem' }}> */}

      {/* </CardContent> */}
      <CardContent style={{ paddingBottom: '1rem' }}>
        <Box>
          <Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                style={{
                  backgroundColor: '#555',
                  color: '#fff',
                  pointerEvents: 'none',
                }}
              >
                <TaskAltIcon />
              </IconButton>{' '}
              {pet.final_status_display}
            </Box>
          </Typography>
        </Box>
        <Box mt={2}>
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default TabNotes;
