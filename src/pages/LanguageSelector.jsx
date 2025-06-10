import React, { useContext } from 'react';
import { MenuItem, Select } from '@mui/material';
import { LanguageContext } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);

  const handleChangeLanguage = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <Select
      value={selectedLanguage}
      onChange={handleChangeLanguage}
      size="small"
      
      sx={{
        color: '#fff',
        fontWeight: 500,
        fontSize: 'small',
        '& .MuiSelect-icon': {
          color: '#fff',
        },
        '&:focus': {
          backgroundColor: 'transparent',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        backgroundColor: 'transparent',
        minWidth: 60,
      }}
      variant="outlined"
    >
      <MenuItem style={{ fontSize: 'small' }} value="en">EN</MenuItem>
      <MenuItem style={{ fontSize: 'small' }} value="lv">LV</MenuItem>
      <MenuItem style={{ fontSize: 'small' }} value="ru">RU</MenuItem>
    </Select>
  );
};

export default LanguageSelector;