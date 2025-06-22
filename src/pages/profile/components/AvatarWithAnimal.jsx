import React from 'react';

import { Avatar } from '@mui/material';

import alligatorImg from '../../../assets/images/profile/alligator.svg';
import bearImg from '../../../assets/images/profile/bear.svg';
import catImg from '../../../assets/images/profile/cat.svg';
import dogImg from '../../../assets/images/profile/dog.svg';
// Import all pet images
import foxImg from '../../../assets/images/profile/fox.svg';
import horseImg from '../../../assets/images/profile/horse.svg';
import lionImg from '../../../assets/images/profile/lion.svg';
import owlImg from '../../../assets/images/profile/owl.svg';
import penguinImg from '../../../assets/images/profile/penguin.svg';
import pigImg from '../../../assets/images/profile/pig.svg';

// Map animal types to images
const animalImageMap = {
  fox: foxImg,
  dog: dogImg,
  cat: catImg,
  bear: bearImg,
  horse: horseImg,
  alligator: alligatorImg,
  penguin: penguinImg,
  pig: pigImg,
  lion: lionImg,
  owl: owlImg,
};

const AnimalAvatar = ({ animal, username }) => {
  const imageSrc = animalImageMap[animal?.toLowerCase()] || null;
  const altText = username?.toUpperCase() || 'U';
  console.log('imageSrc', imageSrc);
  return (
    <Avatar
      src={imageSrc}
      alt={altText}
      sx={{ backgroundColor: '#00b3a4', color: '#fff', width: '200px', height: '200px', padding: '1rem 1rem' }}
    >
      {!imageSrc && altText[0]} {/* fallback to first letter if no image */}
    </Avatar>
  );
};

export default AnimalAvatar;
