import React from 'react';

// import lionAvatar from '../pages/images/avatars/lion.svg';
// import tigerAvatar from '../pages/images/avatars/tiger.svg';
// import dogAvatar from '../pages/images/avatars/dog.svg';
// import catAvatar from '../pages/images/avatars/cat.svg';
import foxAvatar from '../../../assets/images/profile/fox.svg';
import dogAvatar from '../../../assets/images/profile/dog.svg';
import catAvatar from '../../../assets/images/profile/cat.svg';
import bearAvatar from '../../../assets/images/profile/bear.svg';
import horseAvatar from '../../../assets/images/profile/horse.svg';
import alligatorAvatar from '../../../assets/images/profile/alligator.svg';
import penguinAvatar from '../../../assets/images/profile/penguin.svg';
import pigAvatar from '../../../assets/images/profile/pig.svg';
import lionAvatar from '../../../assets/images/profile/lion.svg';
import owlAvatar from '../../../assets/images/profile/owl.svg';
import defaultAvatar from '../../../assets/images/profile/default.svg';

// You can import images directly or reference them from public directory
const AvatarWithAnimal = ({ user }) => {
  // Assuming user.animal_name is a field that stores the random animal name
  const avatarAnimal = user.avatar_animal || '../../../assets/images/profile/Owl.svg'; // Convert to lowercase for consistency
  ['Fox', 'Dog', 'Cat', 'Bear', 'Horse', 'Alligator', 'Penguin', 'Pig', 'Lion', 'Owl'];
  // Map animal name to the appropriate image
  const animalAvatars = {
    Alligator: alligatorAvatar,
    Bear: bearAvatar,
    Cat: catAvatar,
    Dog: dogAvatar,
    Fox: foxAvatar,
    Horse: horseAvatar,
    Lion: lionAvatar,
    Owl: owlAvatar,
    Penguin: penguinAvatar,
    Pig: pigAvatar,
  };
  // Map animal name to the appropriate image (path relative to public folder)
  //   const animalAvatars = {
  //     lion: '/images/avatars/lion.svg',
  //     tiger: '/images/avatars/tiger.svg',
  //     dog: '/images/avatars/dog.svg',
  //     cat: '/images/avatars/cat.svg',
  //     // Add other animals here
  //   };

  // Set default avatar if animal is not found
  const avatarSrc = animalAvatars[avatarAnimal] || defaultAvatar;

  return (
    <img
      alt={user.username}
      src={avatarSrc}
      style={{
        width: '200px',
        height: '200px',
        padding: '1rem 1rem',
      }}
    />
  );
};

export default AvatarWithAnimal;
