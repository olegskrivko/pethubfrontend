import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';

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

const StepImages = ({ formState, handleChange }) => {
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
  const [dragActive, setDragActive] = useState({
    pet_image_1: false,
    pet_image_2: false,
    pet_image_3: false,
    pet_image_4: false,
  });

  const validateImage = (file, field) => {
    let errors = {};
    let success = {};

    // ✅ Allowed file types
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      errors[field] = '❌ Atļauts tikai JPG, PNG, GIF, BMP, WebP formāts.';
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

    setImageErrors((prev) => ({ ...prev, [field]: null }));

    resizeAndCropImage(file, (resizedFile) => {
      handleChange('images', field, resizedFile); // ✅ Correct update

      const previewUrl = URL.createObjectURL(resizedFile);
      setExtraImagesPreview((prev) => ({
        ...prev,
        [field]: previewUrl,
      }));
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
    handleChange('images', field, ''); // ✅ Clear via handler
    setExtraImagesPreview((prev) => ({ ...prev, [field]: '' }));
  };

  // Dropzone configuration for each field
  const createDropzoneConfig = (field) => {
    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        handleImageUpload(file, field);
      }
    }, [field]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp'],
      },
      maxFiles: 1,
      multiple: false,
    });

    return { getRootProps, getInputProps, isDragActive };
  };

  useEffect(() => {
    return () => {
      Object.values(extraImagesPreview).forEach((preview) => {
        if (preview) URL.revokeObjectURL(preview);
      });
    };
  }, [extraImagesPreview]);

  const getImageBackground = (field) => {
    return extraImagesPreview[field] ? `url(${extraImagesPreview[field]}) center/cover` : '#f5f5f5';
  };

  return (
    <Grid container spacing={2} my={1}>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Grid container spacing={2}>
          {['pet_image_1', 'pet_image_2', 'pet_image_3', 'pet_image_4'].map((field) => {
            const { getRootProps, getInputProps, isDragActive } = createDropzoneConfig(field);
            
            return (
              <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6 }} key={field}>
                <Box sx={{ position: 'relative' }}>
                  {/* Hidden file input for default upload */}
                  <input
                    accept="image/*"
                    id={field}
                    type="file"
                    onChange={(e) => handleImageUpload(e.target.files[0], field)}
                    style={{ display: 'none' }}
                  />
                  
                  {/* Dropzone area */}
                  <div
                    {...getRootProps()}
                    style={{
                      width: '100%',
                      aspectRatio: '4 / 3',
                      background: getImageBackground(field),
                      border: imageErrors[field] ? '1px solid red' : '1px solid #aaa',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      color: '#666',
                      position: 'relative',
                      transition: 'border 0.3s ease',
                      backgroundColor: isDragActive ? '#e8f6f9' : '#f5f5f5',
                      '&:hover': { borderColor: '#666' },
                    }}
                  >
                    <input {...getInputProps()} />
                    {!extraImagesPreview[field] && (
                      <>
                        <AddPhotoAlternateIcon sx={{ fontSize: 40, mb: 1, color: '#999' }} />
                        <Typography variant="body2">
                          {isDragActive ? 'Nometiet attēlu šeit...' : 'Izvēlēties bildi'}
                        </Typography>
                        <Typography variant="caption">
                          {isDragActive ? '' : 'Atļautais formāts: JPG, PNG, GIF, BMP, WebP, Max 5MB'}
                        </Typography>
                        <Typography variant="caption" sx={{ mt: 1, fontSize: '10px', color: '#999' }}>
                          ⚠️ Dažos mobilajos pārlūkos vilkšana var nedarboties pareizi.
                        </Typography>
                        <Typography variant="caption" sx={{ fontSize: '10px', color: '#999' }}>
                          Ja rodas problēmas, izmantojiet faila ievades lauku zemāk.
                        </Typography>
                      </>
                    )}
                  </div>

                  {/* Close IconButton placed outside the dropzone */}
                  {extraImagesPreview[field] && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearImage(field);
                      }}
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        zIndex: 10,
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
                
                {/* Default file input for mobile compatibility */}
                <input
                  accept="image/*"
                  id={`${field}_default`}
                  type="file"
                  onChange={(e) => handleImageUpload(e.target.files[0], field)}
                />
                
                {imageErrors[field] && (
                  <Typography color="red" variant="body2" mt={1} textAlign="center">
                    {imageErrors[field]}
                  </Typography>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StepImages;
