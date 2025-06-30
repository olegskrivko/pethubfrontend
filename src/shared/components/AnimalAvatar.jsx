import React from 'react';

import { Avatar } from '@mui/material';

// Animal avatar images
import alligatorImg from '../../assets/images/profile/alligator.svg';
import bearImg from '../../assets/images/profile/bear.svg';
import catImg from '../../assets/images/profile/cat.svg';
import dogImg from '../../assets/images/profile/dog.svg';
import foxImg from '../../assets/images/profile/fox.svg';
import horseImg from '../../assets/images/profile/horse.svg';
import lionImg from '../../assets/images/profile/lion.svg';
import owlImg from '../../assets/images/profile/owl.svg';
import penguinImg from '../../assets/images/profile/penguin.svg';
import pigImg from '../../assets/images/profile/pig.svg';

/**
 * Mapping of animal types to their corresponding avatar images
 */
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

/**
 * Animal Avatar Component
 * Displays an animal-themed avatar with fallback to user initials
 * 
 * @param {string} animal - The type of animal for the avatar
 * @param {string} username - The username to display as fallback
 */
const AnimalAvatar = ({ animal, username }) => {
  const imageSrc = animalImageMap[animal?.toLowerCase()] || null;
  const altText = username?.toUpperCase() || 'U';

  return (
    <Avatar 
      src={imageSrc} 
      alt={altText} 
      sx={{ backgroundColor: '#00b3a4', color: '#fff' }}
    >
      {!imageSrc && altText[0]}
    </Avatar>
  );
};

export default AnimalAvatar;
