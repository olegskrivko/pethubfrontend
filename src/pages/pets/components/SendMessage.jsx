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
import { Box, Card, Collapse, IconButton, TextField, Tooltip, Typography } from '@mui/material';

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

  // Simple file handling like UploadTest
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log('File selected:', file);
    if (file) {
      setSelectedFile(file);
      onUploadImage(file);
    }
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <p><strong>Selected File:</strong> {selectedFile.name}</p>
          <p><strong>File Type:</strong> {selectedFile.type}</p>
          <p><strong>File Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>No file selected</p>
        </div>
      );
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

          {/* Simple file input like UploadTest */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary" mb={1}>
              Pievienot foto:
            </Typography>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleFileInputChange}
              style={{ 
                display: 'block',
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: '#fff'
              }}
            />
          </Box>

          {/* File details like UploadTest */}
          <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            {fileData()}
          </Box>

          {/* File preview if available */}
          {filePreview && (
            <Box sx={{ mb: 2 }}>
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
          )}

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
