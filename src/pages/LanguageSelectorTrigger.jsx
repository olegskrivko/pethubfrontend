import React, { useState } from 'react';

import LanguageIcon from '@mui/icons-material/Language';
import { IconButton } from '@mui/material';

import LanguageSelectorModal from './LanguageSelectorModal';

const LanguageSelectorTrigger = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} sx={{ color: 'white' }} size="small">
        <LanguageIcon />
      </IconButton>
      <LanguageSelectorModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default LanguageSelectorTrigger;
