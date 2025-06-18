import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import { getCurrentDate, getCurrentTime } from '../../../utils/formHelpers';
// import LeafletAddPetMap from '../../../components/LeafletAddPetMap';
// React MUI Icons
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';

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
import { useAuth } from '../../../contexts/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function PetsAdd() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    status: '',
    species: '',
    location: { lat: 56.946285, lng: 24.105078 },
    identifier: '',
    size: '',
    gender: '',
    behavior: '',
    age: '',
    breed: '',
    pattern: '',
    primary_color: { hex: '', label: '', value: '' },
    secondary_color: { hex: '', label: '', value: '' },
    notes: '',
    contact_phone: '',
    phone_code: '371',
    // date: getCurrentDate(),
    // time: getCurrentTime(),
    pet_image_1: '',
    pet_image_2: '',
    pet_image_3: '',
    pet_image_4: '',
  });
  const [formErrors, setFormErrors] = useState({});
  // const [imagePreview, setImagePreview] = useState(null);
  const [extraImagesPreview, setExtraImagesPreview] = useState({
    pet_image_1: '',
    pet_image_2: '',
    pet_image_3: '',
    pet_image_4: '',
  });
  const [imageErrors, setImageErrors] = useState({
    pet_image_1: '',
    pet_image_2: '',
    pet_image_3: '',
    pet_image_4: '',
  });

  const [ageChoices, setAgeChoices] = useState(AGE_CHOICES_BY_SPECIES[3]);

  const validateImage = (file, field) => {
    let errors = {};
    let success = {};

    // ✅ Allowed file types
    const allowedTypes = ['image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      errors[field] = '❌ Atļauts tikai JPG formāts.';
    }

    // ✅ Max file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      errors[field] = '❌ Maksimālais bildes izmērs ir 5MB.';
    }

    // ✅ Check file name length
    if (file.name.length > 50) {
      errors[field] = '❌ Faila nosaukums ir pārāk garš.';
    }

    // ✅ If no errors, show success message
    if (Object.keys(errors).length === 0) {
      success[field] = '✅ Faila formāts un izmērs ir pareizs!';
    }

    return { errors, success };
  };
  const handleImageUpload = (file, field) => {
    if (!file) return;

    const { errors } = validateImage(file, field);
    if (Object.keys(errors).length > 0) {
      setImageErrors((prev) => ({ ...prev, [field]: errors[field] }));
      return;
    }

    // Reset errors if valid
    setImageErrors((prev) => ({ ...prev, [field]: null }));

    // Resize and store image in state
    resizeAndCropImage(file, (resizedFile) => {
      setFormState((prevState) => ({
        ...prevState,
        [field]: resizedFile,
      }));

      const previewUrl = URL.createObjectURL(resizedFile);
      setExtraImagesPreview((prev) => ({
        ...prev,
        [field]: previewUrl,
      }));
    });
  };

  const handleChange = (field, value) => {
    setFormState((prevState) => {
      let newState = { ...prevState, [field]: value };

      // Reset secondary color when pattern changes
      if (field === 'pattern') {
        newState.secondary_color = { hex: '', label: '', value: '' };
      }

      return newState;
    });
  };

  const handleLocationChange = (coords) => {
    setFormState((prevState) => ({
      ...prevState,
      location: {
        lat: coords.lat,
        lng: coords.lng,
      },
    }));
  };

  /** Update age choices when species changes */
  useEffect(() => {
    setAgeChoices(AGE_CHOICES_BY_SPECIES[formState.species] || AGE_CHOICES_BY_SPECIES[3]);
  }, [formState.species]);

  const handleClearSelect = (field) => {
    setFormState((prevState) => {
      let updatedState = { ...prevState };

      // Check the field passed and clear corresponding fields
      if (field === 'pattern') {
        updatedState.pattern = '';
        updatedState.primary_color = { hex: '', label: '', value: '' };
        updatedState.secondary_color = { hex: '', label: '', value: '' };
      } else if (field === 'primary_color') {
        updatedState.primary_color = { hex: '', label: '', value: '' };
        updatedState.secondary_color = { hex: '', label: '', value: '' };
      } else if (field === 'secondary_color') {
        updatedState.secondary_color = { hex: '', label: '', value: '' };
      }

      return updatedState;
    });
  };

  const resizeAndCropImage = (file, callback) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const targetWidth = 800;
        const targetAspectRatio = 4 / 3;
        const targetHeight = targetWidth / targetAspectRatio;
        const quality = 0.8;

        let srcX = 0,
          srcY = 0,
          srcWidth = img.width,
          srcHeight = img.height;
        if (img.width / img.height > targetAspectRatio) {
          srcWidth = img.height * targetAspectRatio;
          srcX = (img.width - srcWidth) / 2;
        } else {
          srcHeight = img.width / targetAspectRatio;
          srcY = (img.height - srcHeight) / 2;
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, 0, 0, targetWidth, targetHeight);

        const fileExtension = file.name.split('.').pop().toLowerCase();
        const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';

        canvas.toBlob(
          (blob) => {
            const resizedFile = new File([blob], `resized_pet.${fileExtension}`, { type: mimeType });
            callback(resizedFile);
          },
          mimeType,
          quality,
        );
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };
  const handleClearImage = (field) => {
    // Clear the image from form state and preview
    setFormState((prevState) => ({ ...prevState, [field]: '' }));
    setExtraImagesPreview((prev) => ({ ...prev, [field]: '' }));
  };

  useEffect(() => {
    return () => {
      Object.values(extraImagesPreview).forEach((preview) => {
        if (preview) URL.revokeObjectURL(preview);
      });
    };
  }, [extraImagesPreview]);

  /** Submit form data to the backend */
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('🚀 Submitting form:', formState);

    try {
      const accessToken = localStorage.getItem('access_token');
      const formData = new FormData();

      // Round latitude & longitude to 6 decimal places
      const latitude = parseFloat(formState.location.lat).toFixed(6);
      const longitude = parseFloat(formState.location.lng).toFixed(6);
      console.log('formState', formState);

      if (isNaN(latitude) || isNaN(longitude)) {
        console.error('❌ Invalid latitude or longitude');
        return;
      }

      // Append form fields
      formData.append('status', formState.status);
      formData.append('species', formState.species);
      formData.append('identifier', formState.identifier);
      formData.append('size', formState.size);
      formData.append('gender', formState.gender);
      formData.append('behavior', formState.behavior);
      formData.append('age', formState.age);
      formData.append('breed', formState.breed);
      formData.append('date', formState.date);
      formData.append('time', formState.time);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('pattern', formState.pattern);
      formData.append('primary_color', formState.primary_color.value);
      formData.append('secondary_color', formState.secondary_color.value);
      formData.append('notes', formState.notes);
      formData.append('phone_code', formState.phone_code);
      formData.append('contact_phone', formState.contact_phone);

      // Append images
      ['pet_image_1', 'pet_image_2', 'pet_image_3', 'pet_image_4'].forEach((field) => {
        if (formState[field]) {
          formData.append(`${field}_media`, formState[field]);
        }
      });

      // Append the author (logged-in user)
      if (user?.userId) {
        formData.append('author', user.userId);
      }

      console.log('🚀 FormData ready to send:', Object.fromEntries(formData.entries()));

      // Send request to backend
      const response = await axios.post(`${API_BASE_URL}/api/pets/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('✅ Pet successfully added!', response.data);
      navigate(`/pets/${response.data.id}`);
    } catch (error) {
      console.error('❌ Error sending pet data:', error.response?.data || error.message);
    }
  };

  const getImageBackground = (field) => {
    return extraImagesPreview[field] ? `url(${extraImagesPreview[field]}) center/cover` : '#f5f5f5';
  };
  return (
    // <Grid container spacing={3}>
    <Container
      component="main"
      sx={{
        flexGrow: 1,
        py: '2rem',
        // pb: '2rem',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Ziņot par mājdzīvnieku
        </Typography>
        {/* {Object.keys(formErrors).length > 0 && (
  <div style={{ color: "red" }}>
   
    {Object.entries(formErrors).map(([field, error]) => (
      <span key={field}>{error}</span>
    ))}
  </div>
)} */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} my={2}>
            {/* Status Field */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="status-label" shrink>
                  Statuss <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  required
                  labelId="status-label"
                  value={formState.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  label="Statuss *"
                  notched
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
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="species-label" shrink>
                  Suga <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  required
                  labelId="species-label"
                  value={formState.species}
                  onChange={(e) => handleChange('species', e.target.value)}
                  label="Suga *"
                  notched
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
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                id="identifier"
                name="identifier"
                label="Unikāls identifikators"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={formState.identifier}
                // placeholder="Mikročipa numurs"
                onChange={(e) => handleChange('identifier', e.target.value)}
              />
            </Grid>

            {/* Size Field */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="size-label" shrink>
                  Izmērs
                </InputLabel>

                <Select
                  labelId="size-label"
                  id="size"
                  value={formState.size}
                  label="Izmērs"
                  notched
                  onChange={(e) => handleChange('size', e.target.value)}
                  error={Boolean(formErrors.size)}
                  fullWidth
                >
                  {SIZE_CHOICES.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formState.size && (
                  <IconButton
                    size="small"
                    onClick={() => handleClearSelect('size')} // Pass the field name here
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
                )}
              </FormControl>
            </Grid>

            {/* Gender Field */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="gender-label" shrink>
                  Dzimums
                </InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={formState.gender}
                  label="Dzimums"
                  notched
                  onChange={(e) => handleChange('gender', e.target.value)}
                >
                  {GENDER_CHOICES.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formState.gender && (
                  <IconButton
                    size="small"
                    onClick={() => handleClearSelect('gender')} // Pass the field name here
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
                )}
              </FormControl>
            </Grid>

            {/* Behavior Field */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="behavior-label" shrink>
                  Uzvedība
                </InputLabel>
                <Select
                  labelId="behavior-label"
                  id="behavior"
                  value={formState.behavior}
                  onChange={(e) => handleChange('behavior', e.target.value)}
                  label="Uzvedība"
                  notched
                >
                  {BEHAVIOR_CHOICES.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formState.behavior && (
                  <IconButton
                    size="small"
                    onClick={() => handleClearSelect('behavior')} // Pass the field name here
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
                )}
              </FormControl>
            </Grid>

            {/* Age Field */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="age-label" shrink>
                  Vecums
                </InputLabel>
                <Select
                  labelId="age-label"
                  id="age"
                  value={formState.age}
                  disabled={formState.species === null || formState.species === '' || formState.species === undefined}
                  label="Vecums"
                  notched
                  onChange={(e) => handleChange('age', e.target.value)}
                >
                  {ageChoices.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formState.age && (
                  <IconButton
                    size="small"
                    onClick={() => handleClearSelect('age')} // Pass the field name here
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
                )}
              </FormControl>
            </Grid>

            {/* Breed Field */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                id="breed"
                name="breed"
                label="Sķirne"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={formState.breed}
                placeholder=""
                onChange={(e) => handleChange('breed', e.target.value)}
              />
            </Grid>

            {/* Pattern Field2 */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="pattern-label" shrink>
                  Kažoka raksts
                </InputLabel>
                <Select
                  labelId="pattern-label"
                  id="pattern"
                  value={formState.pattern}
                  onChange={(e) => handleChange('pattern', e.target.value)}
                  label="Kažoka raksts"
                  notched
                >
                  {PATTERN_CHOICES.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formState.pattern && (
                  <IconButton
                    size="small"
                    onClick={() => handleClearSelect('pattern')} // Pass the field name here
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
                )}
              </FormControl>
            </Grid>

            {/* Pattern Field */}
            {/* <Grid item xs={12}>
                <FormControl component="fieldset">
                 
                  <Typography
                    variant="body1"
                    style={{ fontWeight: '500' }}
                    gutterBottom
                    textAlign="left"
                  >

                    Kažoka raksts
                  </Typography>
                  <RadioGroup
  style={{ display: 'flex !important', flexDirection: 'row' }}
  value={formState.pattern}
  onChange={(e) => handleChange('pattern', e.target.value)}
>
  {PATTERN_CHOICES.map((pattern) => (
    <FormControlLabel
      key={pattern.value}
      value={pattern.value}
      control={<Radio />}
      label={pattern.label}
    />
  ))}
</RadioGroup>

           
                </FormControl>
            </Grid> */}

            {/* Primary Color Field */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="primary-color-label" shrink>
                  Pamatkrāsa
                </InputLabel>
                <Select
                  displayEmpty
                  labelId="primary-color-label"
                  disabled={formState.pattern === ''} // Disable if pattern is ""
                  value={formState.primary_color.hex}
                  onChange={(e) => {
                    const selectedColor = COLOR_CHOICES.find((color) => color.hex === e.target.value);
                    handleChange('primary_color', selectedColor || { hex: '', label: '', value: '' });
                  }}
                  label="Pamatkrāsa"
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
                {formState.primary_color && formState.primary_color.value && (
                  <IconButton
                    size="small"
                    onClick={() => handleClearSelect('primary_color')} // Pass the field name here
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
                )}
              </FormControl>
            </Grid>

            {/* Secondary Color Field */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="secondary-color-label" shrink>
                  Sekundārā krāsa
                </InputLabel>
                <Select
                  labelId="secondary-color-label"
                  displayEmpty
                  disabled={formState.pattern === 1 || formState.pattern === ''} // Disable if pattern is "1"
                  value={formState.secondary_color.hex || ''}
                  onChange={(e) => {
                    const selectedColor = COLOR_CHOICES.find((color) => color.hex === e.target.value);
                    handleChange('secondary_color', selectedColor || { hex: '', label: '', value: '' });
                  }}
                  label="Sekundārā krāsa"
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
                {formState.secondary_color && formState.secondary_color.value && (
                  <IconButton
                    size="small"
                    onClick={() => handleClearSelect('secondary_color')} // Pass the field name here
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
                )}
              </FormControl>
            </Grid>

            {/* Map Display */}
            <Grid item xs={12}>
              {/* <LeafletAddPetMap onLocationChange={handleLocationChange} location={formState.location}  /> */}

              {/* Location Display */}
              {/* <Stack direction="row" alignItems="center" spacing={1} my={1}>
   
         <Typography
                    variant="body1"
                    style={{ fontWeight: '500' }}
                    gutterBottom
                    textAlign="left"
                  >
                
                   Atrašanās vieta
                  </Typography>
      </Stack> */}
            </Grid>

            <Grid item xs={6} sm={6} md={6} lg={6}>
              <TextField
                // id="identifier"
                // name="location"
                label="Ģeogrāfiskais platums"
                disabled={true}
                style={{ display: 'none' }} // Hides the field
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={formState.location.lat}
                // placeholder="Identifier"
                // onChange={(e) => handleChange('identifier', e.target.value)}
              />
            </Grid>

            <Grid item xs={6} sm={6} md={6} lg={6}>
              <TextField
                // id="identifier"
                // name="location"
                label="Ģeogrāfiskais garums"
                disabled={true}
                style={{ display: 'none' }} // Hides the field
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={formState.location.lng}
                // placeholder="Identifier"
                // onChange={(e) => handleChange('identifier', e.target.value)}
              />
            </Grid>

            {/* Date Field */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                // required
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
                value={formState.date}
                onChange={(e) => handleChange('date', e.target.value)}
              />
            </Grid>

            {/* Time Field */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                // required
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
                value={formState.time}
                onChange={(e) => handleChange('time', e.target.value)}
              />
            </Grid>

            {/* Phone Code Field */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="phoneCode-label" shrink>
                  Telefona kods
                </InputLabel>
                <Select
                  labelId="phoneCode-label"
                  id="phoneCode"
                  name="phone_code"
                  readOnly
                  value={formState.phone_code}
                  onChange={(e) => handleChange('phone_code', e.target.value)}
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
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                id="phone"
                name="phone"
                label="Telefona numurs"
                type="text"
                fullWidth
                placeholder="12345678"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={formState.contact_phone}
                onChange={(e) => handleChange('contact_phone', e.target.value)}
              />
            </Grid>

            {/* Notes Field */}
            <Grid item xs={12}>
              <TextField
                id="notes"
                name="notes"
                label="Piezīmes"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={formState.notes}
                // onChange={(e) => handleChange('notes', e.target.value)}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 250); // ✅ Limit input to 250 characters
                  handleChange('notes', value);
                }}
                placeholder="Norādiet būtisku informāciju par izskatu, veselības stāvokli, zaudēšanas apstākļiem vai citus svarīgus faktus"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {['pet_image_1', 'pet_image_2', 'pet_image_3', 'pet_image_4'].map((field) => (
                  <Grid item xs={6} md={3} key={field}>
                    <Box sx={{ position: 'relative' }}>
                      <input
                        accept="image/*"
                        id={field}
                        type="file"
                        onChange={(e) => handleImageUpload(e.target.files[0], field)}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor={field} style={{ display: 'block' }}>
                        <Box
                          sx={{
                            width: '100%',
                            aspectRatio: '4 / 3',
                            background: getImageBackground(field),
                            // border: `2px dashed ${imageErrors[field] ? "red" : "#aaa"}`,
                            // border: extraImagesPreview[field] ? "none" : "1px solid #aaa",
                            border: imageErrors[field] ? '1px solid red' : 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            cursor: 'pointer',
                            borderRadius: '12px',
                            color: '#666',
                            position: 'relative',
                            transition: 'border 0.3s ease',
                            '&:hover': { borderColor: '#666' },
                          }}
                        >
                          {!extraImagesPreview[field] && (
                            <>
                              <AddPhotoAlternateIcon sx={{ fontSize: 40, mb: 1, color: '#999' }} />
                              <Typography variant="body2">Izvēlēties bildi</Typography>
                              <Typography variant="caption">Atļautais formāts: JPG, Max 5MB</Typography>
                            </>
                          )}
                        </Box>
                      </label>

                      {/* Close IconButton placed outside the label */}
                      {extraImagesPreview[field] && (
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents event from bubbling up
                            handleClearImage(field);
                          }}
                          sx={{
                            position: 'absolute',
                            top: 4, // Adjust positioning
                            right: 4, // Adjust positioning
                            zIndex: 10, // Ensure it's above other elements
                            backgroundColor: '#f5f5f5',
                            '&:hover': { backgroundColor: '#e0e0e0' },
                            borderRadius: '50%',

                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                          }}
                        >
                          <CloseIcon fontSize="small" sx={{ color: '#616161' }} />
                        </IconButton>
                      )}
                    </Box>
                    {imageErrors[field] && (
                      <Typography color="red" variant="body2" mt={1} textAlign="center">
                        {imageErrors[field]}
                      </Typography>
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {/* Buttons */}
            <Grid item xs={12} mt={2}>
              <Box textAlign="center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ArrowBackIcon />}
                  component={Link}
                  to={`/`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Atpakaļ
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    backgroundColor: '#ffcb56',
                    color: 'rgba(0, 0, 0, 0.87)',
                  }}
                >
                  Izveidot
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
    // </Grid>
  );
}

export default PetsAdd;
