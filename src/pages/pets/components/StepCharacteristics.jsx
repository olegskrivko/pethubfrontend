import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import {
  AGE_CHOICES,
  AGE_CHOICES_BY_SPECIES,
  BEHAVIOR_CHOICES,
  COLOR_CHOICES,
  GENDER_CHOICES,
  PATTERN_CHOICES,
  PHONE_CODE_CHOICES,
  SIZE_CHOICES,
  SPECIES_CHOICES,
  STATUS_CHOICES,
} from '../../../constants/petOptions';

const StepCharacteristics = ({ formState, formErrors, handleChange }) => {
  const [ageChoices, setAgeChoices] = useState(AGE_CHOICES_BY_SPECIES[3]);
  /** Update age choices when species changes */
  useEffect(() => {
    setAgeChoices(AGE_CHOICES_BY_SPECIES[formState.characteristics.species] || AGE_CHOICES_BY_SPECIES[3]);
  }, [formState.characteristics.species]);
  return (
    <Grid container spacing={2} my={1}>
      {/* Status Field */}
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel shrink>
            Statuss <span style={{ color: 'red' }}>*</span>
          </InputLabel>
          <Select
            required
            value={formState.characteristics.status}
            onChange={(e) => handleChange('characteristics', 'status', e.target.value)}
            notched
            size="small"
            label="Statuss *"
          >
            {STATUS_CHOICES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Species Field */}
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel shrink>
            Suga <span style={{ color: 'red' }}>*</span>
          </InputLabel>
          <Select
            required
            value={formState.characteristics.species}
            onChange={(e) => handleChange('characteristics', 'species', e.target.value)}
            notched
            size="small"
            label="Suga *"
          >
            {SPECIES_CHOICES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Identifier Field */}
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <TextField
          id="identifier"
          name="identifier"
          label="Unikāls identifikators"
          fullWidth
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={formState.characteristics.identifier}
          onChange={(e) => handleChange('characteristics', 'identifier', e.target.value)}
        />
      </Grid>

      {/* Gender Field */}
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="gender-label" shrink>
            Dzimums
          </InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            value={formState.characteristics.gender}
            label="Dzimums"
            notched
            size="small"
            onChange={(e) => handleChange('characteristics', 'gender', e.target.value)}
          >
            {GENDER_CHOICES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {formState.characteristics.gender && (
            <IconButton
              size="small"
              onClick={() => handleClearSelect('gender')}
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

      {/* Age Field */}
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="age-label" shrink>
            Vecums
          </InputLabel>
          <Select
            labelId="age-label"
            id="age"
            value={formState.characteristics.age}
            disabled={
              formState.characteristics.species === null ||
              formState.characteristics.species === '' ||
              formState.characteristics.species === undefined
            }
            label="Vecums"
            notched
            size="small"
            onChange={(e) => handleChange('characteristics', 'age', e.target.value)}
          >
            {ageChoices.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {formState.characteristics.age && (
            <IconButton
              size="small"
              onClick={() => handleClearSelect('age')}
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

      {/* Breed Field */}
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <TextField
          id="breed"
          name="breed"
          label="Sķirne"
          fullWidth
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={formState.characteristics.breed}
          placeholder=""
          onChange={(e) => handleChange('characteristics', 'breed', e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default StepCharacteristics;
