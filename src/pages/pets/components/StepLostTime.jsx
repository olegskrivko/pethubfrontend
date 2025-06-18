import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

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

const StepLostTime = ({ formState, formErrors, handleChange }) => {
  return (
    <Box>
      <Grid container spacing={2} my={1}>
        {/* Date Field */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
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
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={formState.lostTime.date}
            onChange={(e) => handleChange('lostTime', 'date', e.target.value)}
          />
        </Grid>

        {/* Time Field */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
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
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={formState.lostTime.time}
            onChange={(e) => handleChange('lostTime', 'time', e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepLostTime;
