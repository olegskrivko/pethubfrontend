import React, { useState, useEffect } from 'react';
import { Grid, TextField, IconButton, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {
  STATUS_CHOICES,
  SPECIES_CHOICES,
  AGE_CHOICES_BY_SPECIES,
  SIZE_CHOICES,
  GENDER_CHOICES,
  BEHAVIOR_CHOICES,
  AGE_CHOICES,
  PHONE_CODE_CHOICES,
  COLOR_CHOICES,
  PATTERN_CHOICES,
} from '../../../constants/petOptions';
import CloseIcon from '@mui/icons-material/Close';
const StepAppearance = ({ formState, formErrors, handleChange }) => {
  return (
    <Box>
      <Grid container spacing={2} my={1}>
        {/* Size Field */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="size-label" shrink>
              Izmērs
            </InputLabel>

            <Select
              labelId="size-label"
              id="size"
              value={formState.appearance.size}
              label="Izmērs"
              notched
              size="small"
              onChange={(e) => handleChange('appearance', 'size', e.target.value)}
              error={Boolean(formErrors.size)}
              fullWidth
            >
              {SIZE_CHOICES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {formState.appearance.size && (
              <IconButton
                size="small"
                onClick={() => handleClearSelect('size')}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  backgroundColor: '#f5f5f5',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                  borderRadius: '50%',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                <CloseIcon fontSize="small" sx={{ color: '#616161' }} />
              </IconButton>
            )}
          </FormControl>
        </Grid>

        {/* Pattern Field */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="pattern-label" shrink>
              Kažoka raksts
            </InputLabel>
            <Select
              labelId="pattern-label"
              id="pattern"
              size="small"
              value={formState.appearance.pattern}
              onChange={(e) => handleChange('appearance', 'pattern', e.target.value)}
              label="Kažoka raksts"
              notched
            >
              {PATTERN_CHOICES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {formState.appearance.pattern && (
              <IconButton
                size="small"
                onClick={() => handleClearSelect('pattern')}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  backgroundColor: '#f5f5f5',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                  borderRadius: '50%',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                <CloseIcon fontSize="small" sx={{ color: '#616161' }} />
              </IconButton>
            )}
          </FormControl>
        </Grid>

        {/* Primary Color Field */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="primary-color-label" shrink>
              Pamatkrāsa
            </InputLabel>
            <Select
              displayEmpty
              labelId="primary-color-label"
              disabled={formState.appearance.pattern === ''}
              value={formState.appearance.primary_color.hex}
              onChange={(e) => {
                const selectedColor = COLOR_CHOICES.find((color) => color.hex === e.target.value);
                handleChange('appearance', 'primary_color', selectedColor || { hex: '', label: '', value: '' });
              }}
              label="Pamatkrāsa"
              size="small"
              renderValue={(selected) => {
                const color = COLOR_CHOICES.find((color) => color.hex === selected);
                return color ? (
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: color.hex,
                        display: 'inline-block',
                        marginRight: 1,
                      }}
                    />
                    {color.label}
                  </Box>
                ) : (
                  'Izvēlieties krāsu'
                );
              }}
            >
              {COLOR_CHOICES.map((color) => (
                <MenuItem key={color.value} value={color.hex}>
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: color.hex,
                        display: 'inline-block',
                        marginRight: 1,
                      }}
                    />
                    {color.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
            {formState.appearance.primary_color && formState.appearance.primary_color.value && (
              <IconButton
                size="small"
                onClick={() => handleClearSelect('primary_color')}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  backgroundColor: '#f5f5f5',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                  borderRadius: '50%',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                <CloseIcon fontSize="small" sx={{ color: '#616161' }} />
              </IconButton>
            )}
          </FormControl>
        </Grid>

        {/* Secondary Color Field */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="secondary-color-label" shrink>
              Sekundārā krāsa
            </InputLabel>
            <Select
              labelId="secondary-color-label"
              displayEmpty
              disabled={formState.appearance.pattern === 1 || formState.appearance.pattern === ''}
              value={formState.appearance.secondary_color.hex || ''}
              onChange={(e) => {
                const selectedColor = COLOR_CHOICES.find((color) => color.hex === e.target.value);
                handleChange('appearance', 'secondary_color', selectedColor || { hex: '', label: '', value: '' });
              }}
              label="Sekundārā krāsa"
              size="small"
              renderValue={(selected) => {
                const color = COLOR_CHOICES.find((color) => color.hex === selected);
                return color ? (
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: color.hex,
                        display: 'inline-block',
                        marginRight: 1,
                      }}
                    />
                    {color.label}
                  </Box>
                ) : (
                  'Izvēlieties krāsu'
                );
              }}
            >
              {COLOR_CHOICES.map((color) => (
                <MenuItem key={color.value} value={color.hex}>
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: color.hex,
                        display: 'inline-block',
                        marginRight: 1,
                      }}
                    />
                    {color.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
            {formState.appearance.secondary_color && formState.appearance.secondary_color.value && (
              <IconButton
                size="small"
                onClick={() => handleClearSelect('secondary_color')}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  backgroundColor: '#f5f5f5',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                  borderRadius: '50%',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                }}
              >
                <CloseIcon fontSize="small" sx={{ color: '#616161' }} />
              </IconButton>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepAppearance;
