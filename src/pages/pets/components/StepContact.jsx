import React, { useState, useEffect } from 'react';
import { Grid,TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import  { STATUS_CHOICES, SPECIES_CHOICES, AGE_CHOICES_BY_SPECIES, SIZE_CHOICES, GENDER_CHOICES, BEHAVIOR_CHOICES, AGE_CHOICES, PHONE_CODE_CHOICES, COLOR_CHOICES, PATTERN_CHOICES } from "../../../constants/petOptions";
import CloseIcon from '@mui/icons-material/Close';
const StepContact = ({ formState,formErrors, handleChange }) => {
  return (
    <Box>
          
    <Grid container spacing={2} my={1}>
                                {/* Phone Code Field */}
                                  <Grid  size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                  <FormControl fullWidth variant="outlined">
                                        <InputLabel id="phoneCode-label" shrink>
                                        Telefona kods
                                        </InputLabel>
                                        <Select
                                          labelId="phoneCode-label"
                                          id="phoneCode"
                                          name="phone_code"
                                          readOnly
                                              size="small"
                                          value={formState.contact.phone_code}
                                          onChange={(e) => handleChange('contact','phone_code', e.target.value)}
                                          label="Telefona kods"
                                          notched
                                        >
                                          {PHONE_CODE_CHOICES.map((code) => (
                                            <MenuItem key={code.value} value={code.value}>
                                              {code.label}
                                            </MenuItem>
                                          ))}
                      
                                        </Select>
                                        {/* {formState.phone_code && (
                                          <IconButton
                                            size="small"
                                            onClick={() => handleClearSelect('phone_code')} // Pass the field name here
                                            sx={{
                                              position: 'absolute',
                                              right: 8, // Adjust as needed
                                              top: '50%',
                                              transform: 'translateY(-50%)',
                                              zIndex: 1, // Ensure it is on top of the select
                                              backgroundColor: '#f5f5f5', // Light gray background
                                              '&:hover': {
                                                backgroundColor: '#e0e0e0', // Slightly darker on hover
                                              },
                                              borderRadius: '50%', // Round button
                                              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow
                                            }}
                                          >
                                            <CloseIcon fontSize="small" sx={{ color: '#616161' }} />
                                          </IconButton>
                                        )} */}
                                      </FormControl>
                                  </Grid>
                      
                                  {/* Phone Number Field */}
                                  <Grid  size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                                      <TextField
                                      
                                        id="phone"
                                        name="phone"
                                        label="Telefona numurs"
                                        type="text"
                                            size="small"
                                        fullWidth
                                        placeholder="12345678"
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formState.contact.contact_phone}
                                        onChange={(e) => handleChange('contact','contact_phone', e.target.value)}
                                      />
                                  </Grid>

                                         {/* Notes Field */}
                                                          <Grid  size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                                                              <TextField
                                                                id="notes"
                                                                name="notes"
                                                                label="Piezīmes"
                                                                fullWidth
                                                                multiline
                                                                    size="small"
                                                                rows={4}
                                                                variant="outlined"
                                                                value={formState.contact.notes}
                                                             
                                                                // onChange={(e) => handleChange('notes', e.target.value)}
                                                                onChange={(e) => {
                                                                  const value = e.target.value.slice(0, 250); // ✅ Limit input to 250 characters
                                                                  handleChange('contact',"notes", value);
                                                                }}
                                                                placeholder="Norādiet būtisku informāciju par izskatu, veselības stāvokli, zaudēšanas apstākļiem vai citus svarīgus faktus"
                                                                InputLabelProps={{
                                                                  shrink: true, 
                                                                }}
                                                              />
                                                          </Grid>
 
 </Grid>
 </Box>
  );
};

export default StepContact;
