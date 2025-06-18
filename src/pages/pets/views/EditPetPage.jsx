import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';

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

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [formErrors, setFormErrors] = useState({});
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
      pattern: '',
    },
    contact: { contact_phone: '', phone_code: '371', notes: '' },
  });

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get(`${API_BASE_URL}/api/pets/${id}/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const data = response.data;

        setFormState({
          location: {
            lat: data.latitude,
            lng: data.longitude,
            date: data.date,
            time: data.time,
          },
          characteristics: {
            status: data.status || '',
            species: data.species || '',
            breed: data.breed || '',
            identifier: data.identifier || '',
            gender: data.gender || '',
            age: data.age || '',
          },
          images: {
            pet_image_1: data.pet_image_1 || '',
            pet_image_2: data.pet_image_2 || '',
            pet_image_3: data.pet_image_3 || '',
            pet_image_4: data.pet_image_4 || '',
          },
          appearance: {
            primary_color: {
              value: data.primary_color,
              label: data.primary_color,
              hex: data.primary_color,
            },
            secondary_color: {
              value: data.secondary_color,
              label: data.secondary_color,
              hex: data.secondary_color,
            },
            size: data.size || '',
            pattern: data.pattern || '',
          },
          contact: {
            phone_code: data.phone_code || '371',
            contact_phone: data.contact_phone || '',
            notes: data.notes || '',
          },
        });
      } catch (err) {
        console.error('❌ Failed to load pet data', err);
      }
    };

    fetchPet();
  }, [id]);

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleChange = (section, field, value) => {
    if (typeof field === 'object') {
      setFormState((prev) => ({
        ...prev,
        [section]: { ...prev[section], ...field },
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    }
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();

    try {
      const accessToken = localStorage.getItem('access_token');
      const formData = new FormData();

      const latitude = parseFloat(formState.location.lat).toFixed(6);
      const longitude = parseFloat(formState.location.lng).toFixed(6);

      if (isNaN(latitude) || isNaN(longitude)) {
        console.error('❌ Invalid latitude or longitude');
        return;
      }

      formData.append('status', formState.characteristics.status);
      formData.append('species', formState.characteristics.species);
      formData.append('identifier', formState.characteristics.identifier);
      formData.append('size', formState.appearance.size);
      formData.append('gender', formState.characteristics.gender);
      formData.append('age', formState.characteristics.age);
      formData.append('breed', formState.characteristics.breed);

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

      ['pet_image_1', 'pet_image_2', 'pet_image_3', 'pet_image_4'].forEach((field) => {
        if (formState.images[field] instanceof File) {
          formData.append(`${field}_media`, formState.images[field]);
        }
      });

      const userId = localStorage.getItem('user_id');
      if (userId) {
        formData.append('author', userId);
      }

      const response = await axios.patch(`${API_BASE_URL}/api/pets/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('✅ Pet successfully updated!', response.data);
      navigate(`/pets/${response.data.id}`);
    } catch (error) {
      console.error('❌ Error sending pet data:', error.response?.data || error.message);
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
    <Container component="main" maxWidth="lg" sx={{ paddingLeft: 0, paddingRight: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 70, height: 70, mr: 2 }}>
          <CircularProgressbar
            value={progress}
            text={`${activeStep + 1}/${steps.length}`}
            styles={buildStyles({
              textSize: '18px',
              pathColor: '#1976d2',
              textColor: '#333',
              trailColor: '#ddd',
            })}
          />
        </Box>
        <Box>
          <Typography variant="h6">{steps[activeStep]}</Typography>
          {activeStep < steps.length - 1 && (
            <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
              Nākamais solis: {steps[activeStep + 1]}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, mb: 3 }}>{getStepContent(activeStep)}</Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: 2,
          pt: 2,
          padding: '0 !important',
        }}
      >
        <Button variant="outlined" disabled={activeStep === 0} onClick={handleBack} sx={{ flex: 1, mr: 1 }}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext} sx={{ flex: 1, ml: 1 }}>
          {activeStep === steps.length - 1 ? 'Save Changes' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
};

export default EditPet;
