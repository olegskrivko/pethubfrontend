import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import { Box, CardMedia, Chip, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ImageCarousel = ({ pet, images = [] }) => {
  const theme = useTheme();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <Box position="relative" width="100%" textAlign="center">
      <CardMedia
        component="img"
        alt={`Image ${currentIndex + 1}`}
        image={
          typeof images[currentIndex] === 'string' ? images[currentIndex] : URL.createObjectURL(images[currentIndex])
        }
        sx={{
          height: {
            xs: 380,
            sm: 420,
            md: 460,
            lg: 500,
          },
          objectFit: 'cover',
          borderRadius: theme.shape.borderRadius,
        }}
      />

      {/* <Box style={{ position: 'absolute', top: 16, left: 16, zIndex: 999 }}>
        <Chip
          label={pet.status_display}
          variant="filled"
          sx={{
            // backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backgroundColor: 'rgba(0, 179, 164, 0.6)',
            color: 'white',
            letterSpacing: '1px',
            fontWeight: 400,
            backdropFilter: 'blur(6px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            paddingY: 0.5,
            //   fontSize: '0.85rem',
          }}
        />
      </Box> */}
      {/* Left arrow */}
      {images.length > 1 && (
        <IconButton
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 10,
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.7)',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      )}

      {/* Right arrow */}
      {images.length > 1 && (
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 10,
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255,255,255,0.7)',
          }}
        >
          <ArrowBackIosNewIcon sx={{ transform: 'scaleX(-1)' }} />
        </IconButton>
      )}
    </Box>
  );
};

export default ImageCarousel;
