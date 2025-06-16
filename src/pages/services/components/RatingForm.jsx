import React, { useState } from 'react';
import { Box, Typography, Rating, TextField, Button, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RatingForm = ({ serviceId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('access_token');

    console.log('Submitting review...');
    console.log('Access Token:', accessToken);
    console.log('Service ID:', serviceId);
    console.log('Rating:', rating);
    console.log('Comment:', comment);

    if (!accessToken) {
      enqueueSnackbar('Lūdzu, piesakieties, lai pievienotu atsauksmi.', {
        variant: 'warning',
      });
      return;
    }

    if (rating < 1 || !comment.trim()) {
      enqueueSnackbar('Lūdzu, aizpildiet vērtējumu un komentāru.', {
        variant: 'info',
      });
      console.log('Validation failed: rating or comment is missing.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/services/${serviceId}/reviews/`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Review submitted successfully:', response.data);
      enqueueSnackbar('Atsauksme pievienota veiksmīgi!', {
        variant: 'success',
      });
      setRating(0);
      setComment('');
      onSuccess?.(); // callback to refresh reviews
    } catch (err) {
      console.error('Submit review error:', err);
      if (err.response) {
        console.error('Backend response:', err.response.data);
        console.error('Status code:', err.response.status);
      } else {
        console.error('No response received:', err.message);
      }
      enqueueSnackbar('Neizdevās pievienot atsauksmi.', { variant: 'error' });
    } finally {
      setSubmitting(false);
      console.log('Submitting state reset.');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Pievieno savu atsauksmi
      </Typography>
      <Rating
        name="user-rating"
        value={rating}
        onChange={(event, newValue) => {
          console.log('Rating changed:', newValue);
          setRating(newValue);
        }}
        precision={0.5}
      />
      <TextField
        label="Tavs komentārs"
        fullWidth
        multiline
        rows={3}
        value={comment}
        onChange={(e) => {
          console.log('Comment changed:', e.target.value);
          setComment(e.target.value);
        }}
        sx={{ mt: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        disabled={submitting || rating < 1 || !comment.trim()}
      >
        {submitting ? 'Iesniegšana...' : 'Iesniegt atsauksmi'}
      </Button>
    </Paper>
  );
};

export default RatingForm;
