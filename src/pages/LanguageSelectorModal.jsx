import React, { useContext, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogContent, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';

import { LanguageContext } from '../contexts/LanguageContext';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'lv', label: 'Latviešu', flag: '🇱🇻' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

const LanguageSelectorModal = ({ open, onClose }) => {
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSelect = (langCode) => {
    setSelectedLanguage(langCode);
    onClose();
  };

  return (
    <Dialog fullScreen={isMobile} open={open} onClose={onClose} sx={{ zIndex: 9999 }}>
      <DialogContent
        sx={{
          position: 'relative',
          minHeight: '60vh',
          // background: `linear-gradient(180deg, #0f2027, #203a43, #2c5364)`,
          //background: `linear-gradient(180deg, #1c1c1e, #2a2a2e)`,
          //background: 'linear-gradient(to right, rgba(0,150,136,0.7), rgba(63,81,181,0.7))',

          //background: 'linear-gradient(to right, rgba(0,150,136,0.7), rgba(63,81,181,0.7))',
          background: 'linear-gradient(190deg, #16477c 0%, #00b5ad 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box>
          {/* <Typography variant="h5" align="center" mb={4} fontWeight="bold">
            Choose Your Language
          </Typography> */}
          <Typography variant="h5" align="center" mb={4} fontWeight="bold">
            Izvēlēties valodu
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {languages.map((lang) => (
              <Grid item key={lang.code}>
                <Box
                  onClick={() => handleSelect(lang.code)}
                  sx={{
                    cursor: 'pointer',
                    padding: 2,
                    borderRadius: 2,
                    border: selectedLanguage === lang.code ? '2px solid #00bfa5' : '2px solid transparent',
                    transition: '0.3s',
                    textAlign: 'center',
                    '&:hover': {
                      borderColor: '#00bfa5',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                    },
                  }}
                >
                  <Typography variant="h3" component="div">
                    {lang.flag}
                  </Typography>
                  <Typography variant="body1" mt={1}>
                    {lang.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageSelectorModal;
