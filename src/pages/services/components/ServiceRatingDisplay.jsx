import React, { useEffect, useState } from 'react';

import { Avatar, Box, Paper, Rating, Typography } from '@mui/material';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('lv-LV', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return '';
  }
};

const ServiceRatingDisplay = ({ serviceId, rating, reviewCount }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/services/${serviceId}/reviews/`);
        setReviews(response.data);
      } catch (error) {
        setError('Neizdevās ielādēt atsauksmes.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [serviceId]);

  if (loading) return <Typography>Notiek atsauksmju ielāde...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box my={4}>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Atsauksmes
        </Typography>
        <Rating value={rating || 0} readOnly precision={0.5} />
        <Typography variant="body2" color="text.secondary">
          {reviewCount || 0} atsauksmes
        </Typography>
      </Box>

      {reviews?.length ? (
        reviews.map((review, idx) => (
          <Paper
            key={idx}
            elevation={1}
            sx={{ background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)', p: 2, mb: 2 }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              <Avatar>{review.user_name?.charAt(0).toUpperCase() || '?'}</Avatar>
              <Box>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Typography variant="subtitle2" fontWeight={500}>
                    {review.user_name}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {formatDate(review.created_at)}
                  </Typography>
                </Box>
                <Rating value={review.rating} readOnly size="small" precision={0.5} />
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {review.comment}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          Lietotāji vēl nav pievienojuši atsauksmes. Esi pirmais!
        </Typography>
      )}
    </Box>
  );
};

export default ServiceRatingDisplay;
