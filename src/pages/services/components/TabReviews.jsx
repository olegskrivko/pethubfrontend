import React, { useEffect, useState } from 'react';

import { AccessTime, Email, Euro, LocationOn, Phone } from '@mui/icons-material';
import { Facebook, Instagram, Language, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MapIcon from '@mui/icons-material/Map';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import moment from 'moment';

import ServiceRatingDisplay from './ServiceRatingDisplay';

const TabNotes = ({ service }) => {
  return (
    // <Card
    //   sx={{
    //     borderRadius: 3,
    //     background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
    //     cursor: 'pointer',
    //     transition: 'all 0.3s ease-in-out',
    //     '&:hover': {
    //       background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
    //     },
    //   }}
    // >
    <ServiceRatingDisplay
      serviceId={service.id}
      rating={service.rating}
      reviewCount={service.review_count}
      reviews={service.reviews}
    />
    // </Card>
  );
};

export default TabNotes;
