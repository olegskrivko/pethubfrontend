import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

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

const onFileUpload = () => {
  const formData = new FormData();
  formData.append('myFile', selectedFile, selectedFile.name);
  console.log(selectedFile);
  // axios.post('api/uploadfile', formData);
};

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

  // Dropzone logic
  const [selectedFile, setSelectedFile] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    if (file && onUploadImage) {
      onUploadImage(file);
    }
  }, [onUploadImage]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    multiple: false,
  });

  // Simple file input logic
  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file && onUploadImage) {
      onUploadImage(file);
    }
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate?.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
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

          <div style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 8, color: '#666' }}>Upload a file:</div>
            <div style={{ display: 'flex', gap: 16 }}>
              {/* Dropzone */}
              <div
                {...getRootProps()}
                style={{
                  border: '2px dashed #00b3a4',
                  borderRadius: 8,
                  padding: 20,
                  textAlign: 'center',
                  backgroundColor: isDragActive ? '#e8f6f9' : '#f8f9fa',
                  cursor: 'pointer',
                  minWidth: 180,
                }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the file here ...</p>
                ) : (
                  <p>Drag & drop here</p>
                )}
              </div>
              <div style={{ alignSelf: 'center' }}>OR</div>
              {/* Plain file input */}
              <input type="file" accept="image/*" onChange={onFileChange} />
            </div>
            {fileData()}
          </div>

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
                  // If we have a selected file, pass it to parent
                  if (selectedFile) {
                    onUploadImage(selectedFile);
                  }
                  onSendMessage();
                  if (isLocationAdded) onRemoveLocation();
                  // Clear local file state after sending
                  setSelectedFile(null);
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
