import React, { useEffect, useState } from 'react';

import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

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
import LeafletAddPetMap from '../../../shared/maps/LeafletAddPetMap';

const StepLocation = ({ formState, formErrors, handleChange }) => {
  const handleMapChange = (newLocation) => {
    handleChange('location', newLocation);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <LeafletAddPetMap onLocationChange={handleMapChange} location={formState.location} />
      </Grid>

      <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
        <TextField
          label="Ģeogrāfiskais platums"
          disabled={true}
          style={{ display: 'none' }}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={formState.location.lat}
        />
      </Grid>

      <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
        <TextField
          label="Ģeogrāfiskais garums"
          disabled={true}
          style={{ display: 'none' }}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={formState.location.lng}
        />
      </Grid>

      {/* Date Field */}
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
        <TextField
          error={!!formErrors.date}
          helperText={formErrors.date || ''}
          id="date"
          name="date"
          label={
            <span>
              Datums <span style={{ color: 'red' }}>*</span>
            </span>
          }
          type="date"
          fullWidth
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={formState.location.date}
          onChange={(e) => handleChange('location', 'date', e.target.value)}
        />
      </Grid>

      {/* Time Field */}
      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
        <TextField
          id="time"
          name="time"
          label={
            <span>
              Laiks <span style={{ color: 'red' }}>*</span>
            </span>
          }
          type="time"
          fullWidth
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={formState.location.time}
          onChange={(e) => handleChange('location', 'time', e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default StepLocation;
