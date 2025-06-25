import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  AddLocationAlt as AddLocationAltIcon,
  AddPhotoAlternate as AddPhotoAlternateIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Send as SendIcon,
  WrongLocation as WrongLocationIcon,
} from '@mui/icons-material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Box, Card, CardContent, Collapse, IconButton, TextField, Tooltip, Typography } from '@mui/material';

import { useAuth } from '../../../contexts/AuthContext';
import AnimalAvatar from '../../../shared/components/AnimalAvatar';

const SendMessage = ({
  message,
  onMessageChange,
  onSendMessage,
  onUploadImage,
  filePreview,
  file,
  isLocationAdded,
  onAddLocation,
  onRemoveLocation,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuth();
  const handleToggleExpand = () => setExpanded((prev) => !prev);

  const handleFileInputChange = (event) => {
    console.log('File input changed:', event);
    const file = event.target.files[0];
    console.log('Selected file:', file);
    if (file) {
      console.log('Calling onUploadImage with file:', file.name);
      onUploadImage(file);
    }
  };

  return (
    <Card
      sx={{
        p: { xs: 1, sm: 2 },
        borderRadius: 3,
        background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
        onClick={handleToggleExpand}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography color="textSecondary">
            <Box display="flex" alignItems="center">
              {user ? (
                <AnimalAvatar animal={user.avatar} username={user.username} />
              ) : (
                <>
                  <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }}>
                    <AddCommentIcon />
                  </IconButton>
                </>
              )}

              <Typography color="textSecondary" sx={{ pl: { xs: 1, sm: 2 } }}>
                PIEVIENOT ZIŅOJUMU
              </Typography>
            </Box>
          </Typography>
        </Box>
        <IconButton>{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
      </Box>
      {user ? (
        <Collapse in={expanded}>
          <Box sx={{ py: { xs: 1, sm: 2 } }}>
            <TextField
              label="Ierakstiet savu komentāru šeit..."
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={3}
              value={message}
              onChange={(e) => onMessageChange(e.target.value)}
            />
          </Box>
          {filePreview ? (
            <Box>
              <Typography variant="body2" color="textSecondary" mb={1}>
                Selected file: {file?.name}
              </Typography>
              <img
                src={filePreview}
                alt="Preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                }}
              />
            </Box>
          ) : file ? (
            <Box>
              <Typography variant="body2" color="textSecondary">
                Selected file: {file.name}
              </Typography>
            </Box>
          ) : null}

          <Box sx={{ pt: { xs: 0, sm: 1 } }} display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              {!isLocationAdded ? (
                <Tooltip title="Pievienot atrašanās vietu">
                  <IconButton onClick={onAddLocation} sx={{ backgroundColor: '#00b3a4', color: '#fff', mr: 1 }}>
                    <AddLocationAltIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Noņemt atrašanās vietu">
                  <IconButton onClick={onRemoveLocation} sx={{ backgroundColor: '#00b3a4', color: '#fff', mr: 1 }}>
                    <WrongLocationIcon />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Pievienot foto">
                <IconButton
                  sx={{
                    backgroundColor: '#00b3a4',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#007c73' },
                  }}
                >
                  <AddPhotoAlternateIcon />
                </IconButton>
              </Tooltip>
              <input
                accept="image/*"
                type="file"
                onChange={handleFileInputChange}
                style={{ display: 'block', marginTop: '10px' }}
              />
            </Box>

            <Tooltip title="Aizsūtīt ziņu">
              <IconButton
                onClick={() => {
                  onSendMessage();
                  if (isLocationAdded) onRemoveLocation();
                }}
                sx={{
                  backgroundColor: '#00b3a4',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#007c73' },
                }}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Collapse>
      ) : (
        <Box p={2}>
          <Typography color="textSecondary">Lūdzu, piesakieties, lai pievienotu ziņojumu.</Typography>{' '}
          <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>
            Pieslēgties
          </Link>
        </Box>
      )}
    </Card>
  );
};

export default SendMessage;
