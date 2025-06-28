import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('petDetails');

  return (
    <Card
      sx={{
        p: { xs: 1, sm: 2 },
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
      {/* <CardContent style={{ paddingBottom: '1rem' }}> */}
      {/* <Box>
        <Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              style={{
                backgroundColor: '#00b3a4',
                color: '#fff',
                pointerEvents: 'none',
              }}
            >
              <TaskAltIcon />
            </IconButton>{' '}
            {pet.final_status_display}
          </Box>
        </Typography>
      </Box> */}
      <Box>
        {pet.notes ? (
          <Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                style={{
                  backgroundColor: '#00b3a4',
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
                  backgroundColor: '#00b3a4',
                  color: '#fff',
                  pointerEvents: 'none',
                }}
              >
                <TextSnippetIcon />
              </IconButton>{' '}
              {t('notes.noNotes')}
            </Box>
          </Typography>
        )}
      </Box>
      {/* </CardContent> */}
    </Card>
  );
};

export default TabNotes;
