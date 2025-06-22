import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link, useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

import { getCurrentDate, getCurrentTime } from '../../../utils/formHelpers';
import StepAppearance from '../components/StepAppearance';
import StepCharacteristics from '../components/StepCharacteristics';
import StepContact from '../components/StepContact';
import StepImages from '../components/StepImages';
import StepLocation from '../components/StepLocation';
import StepLostTime from '../components/StepLostTime';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const steps = ['Dzīvnieka raksturojums', 'Atrašanās vieta', 'Attēli', 'Izskats', 'Kontakta informācija'];

const PetAddStepper = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [formState, setFormState] = useState({
    location: {
      lat: 56.946285,
      lng: 24.105078,
      date: getCurrentDate(),
      time: getCurrentTime(),
    },
    characteristics: {
      status: '',
      species: '',
      breed: '',
      identifier: '',
      gender: '',
      age: '',
      final_status: 1,
    },
    images: {
      pet_image_1: '',
      pet_image_2: '',
      pet_image_3: '',
      pet_image_4: '',
    },
    appearance: {
      primary_color: { hex: '', label: '', value: '' },
      secondary_color: { hex: '', label: '', value: '' },
      size: '',
      age: '',
      pattern: '',
    },
    contact: { contact_phone: '', phone_code: '371', notes: '' },
  });

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

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
    else {
      console.log('Submit form here');
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleChange = (section, field, value) => {
    if (typeof field === 'object') {
      return setFormState((prev) => ({
        ...prev,
        [section]: { ...prev[section], ...field },
      }));
    }

    setFormState((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleSubmit = async (event) => {
    event?.preventDefault(); // make it optional for programmatic calls
    setServerError(''); // clear previous errors

    console.log('🚀 Submitting form:', formState);

    try {
      const accessToken = localStorage.getItem('access_token');
      const formData = new FormData();

      const latitude = parseFloat(formState.location.lat).toFixed(6);
      const longitude = parseFloat(formState.location.lng).toFixed(6);

      if (isNaN(latitude) || isNaN(longitude)) {
        console.error('❌ Invalid latitude or longitude');
        return;
      }

      // Append form fields
      formData.append('status', formState.characteristics.status);
      formData.append('species', formState.characteristics.species);
      formData.append('identifier', formState.characteristics.identifier);
      formData.append('size', formState.appearance.size);
      formData.append('gender', formState.characteristics.gender);
      formData.append('age', formState.characteristics.age);
      formData.append('breed', formState.characteristics.breed);
      formData.append('final_status', formState.characteristics.final_status);

      formData.append('date', formState.location.date);
      formData.append('time', formState.location.time);

      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('pattern', formState.appearance.pattern);
      formData.append('primary_color', formState.appearance.primary_color.value);
      formData.append('secondary_color', formState.appearance.secondary_color.value);
      formData.append('notes', formState.contact.notes);
      formData.append('phone_code', formState.contact.phone_code);
      formData.append('contact_phone', formState.contact.contact_phone);

      // Append image if exists
      // Append images
      ['pet_image_1', 'pet_image_2', 'pet_image_3', 'pet_image_4'].forEach((field) => {
        if (formState.images[field]) {
          formData.append(`${field}_media`, formState.images[field]);
        }
      });

      // Optionally, if you have a user context:
      const userId = localStorage.getItem('user_id'); // or from context
      if (userId) {
        formData.append('author', userId);
      }

      console.log('📦 FormData to send:', Object.fromEntries(formData.entries()));

      const response = await axios.post(`${API_BASE_URL}/api/pets/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('✅ Pet successfully added!', response.data);
      navigate(`/pets/${response.data.id}`);
    } catch (error) {
      // console.error('❌ Error sending pet data:', error.response?.data || error.message);
      // error.response.data usually has your validation error message(s)
      const errData = error.response?.data;

      if (typeof errData === 'object' && errData !== null) {
        // Backend might send something like: { "non_field_errors": ["Your message"] } or { "error": "Your message" }
        const errorMessage =
          errData.non_field_errors?.[0] ||
          errData.error ||
          Object.values(errData).flat()[0] || // fallback to first error message
          'Kļūda pievienojot mājdzīvnieku.';
        setServerError(errorMessage);
      } else {
        setServerError('Kļūda pievienojot mājdzīvnieku.');
      }

      console.error('❌ Error sending pet data:', errData || error.message);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <StepCharacteristics formState={formState} formErrors={formErrors} handleChange={handleChange} />;
      case 1:
        return <StepLocation formState={formState} formErrors={formErrors} handleChange={handleChange} />;
      case 2:
        return <StepImages formState={formState} formErrors={formErrors} handleChange={handleChange} />;
      case 3:
        return <StepAppearance formState={formState} formErrors={formErrors} handleChange={handleChange} />;
      case 4:
        return <StepContact formState={formState} formErrors={formErrors} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <Container component="main" maxWidth="lg">
      {/* Top section: Progress and Step Title */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: { xs: 2, sm: 3, md: 3, lg: 4, xl: 5 },
        }}
      >
        <Box sx={{ width: 70, height: 70, mr: 2 }}>
          <CircularProgressbar
            value={progress}
            text={`${activeStep + 1}/${steps.length}`}
            styles={buildStyles({
              textSize: '1.4rem',
              pathColor: '#00b3a4',
              textColor: '#333',
              trailColor: '#ddd',
            })}
          />
        </Box>
        <Box>
          <Typography variant="h6">{steps[activeStep]}</Typography>
          {/* Subtitle: Next Step */}
          {activeStep < steps.length - 1 && (
            <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
              Nākamais solis: {steps[activeStep + 1]} {/* Next step name as subtitle */}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Middle section: Step Content (this should take available space) */}
      <Box sx={{ flexGrow: 1, mb: 3 }}>{getStepContent(activeStep)}</Box>
      {/* Server error message */}
      {serverError && (
        <Typography color="error" sx={{ mb: 1, px: 2, fontWeight: 'bold' }}>
          {serverError}
        </Typography>
      )}
      {/* Bottom section: Sticky Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 2,
          pt: 2,
          padding: '0 !important',
          // borderTop: '1px solid #eee',
        }}
      >
        <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack} sx={{ flex: 1, mr: 1 }}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} sx={{ flex: 1, ml: 1 }}>
          {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
};

export default PetAddStepper;
