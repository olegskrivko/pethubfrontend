import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // to extract the pet ID from the URL
import { CircularProgress, Alert,Grid, Typography, Card,CardMedia,Box,Tooltip,  IconButton   } from '@mui/material';
import Chip from '@mui/material/Chip';
import TagIcon from '@mui/icons-material/Tag';
import HeightIcon from '@mui/icons-material/Height';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import MoodIcon from '@mui/icons-material/Mood';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import CakeIcon from '@mui/icons-material/Cake';
import EventIcon from '@mui/icons-material/Event';
import TextureIcon from '@mui/icons-material/Texture';
import moment from 'moment';

import 'moment/locale/lv'; // Import Latvian locale


  
const PetPhoto = ({ pet }) => {

  return (
    <Box>

  </Box>
   
  );
};

export default PetPhoto;
