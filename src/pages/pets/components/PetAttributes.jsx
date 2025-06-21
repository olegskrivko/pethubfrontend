import React from 'react';

import {
  Cake as CakeIcon,
  ColorLens as ColorLensIcon,
  Event as EventIcon,
  Height as HeightIcon,
  Male as MaleIcon,
  MergeType as MergeTypeIcon,
  Pets as PetsIcon,
  Search as SearchIcon,
  Tag as TagIcon,
  Texture as TextureIcon,
} from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import { format } from 'date-fns';
import { lv } from 'date-fns/locale';

import PetAttributeItem from './PetAttributeItem';

const PetAttributes = ({ pet }) => {
  const AGE_LABELS_BY_SPECIES = {
    1: { 1: 'Kucēns', 2: 'Pieaugušais', 3: 'Seniors' },
    2: { 1: 'Kaķēns', 2: 'Pieaugušais', 3: 'Seniors' },
    3: { 1: 'Mazulis', 2: 'Pieaugušais', 3: 'Seniors' },
  };

  const ageLabel = AGE_LABELS_BY_SPECIES[pet.species]?.[pet.age] || '-';
  const breedLabel = pet.breed || '-';

  const eventDate = pet.event_occurred_at ? new Date(pet.event_occurred_at.replace(' ', 'T')) : null;

  const formattedDate = eventDate ? format(eventDate, 'd. MMMM yyyy', { locale: lv }) : 'Nav pieejams';

  const formattedTime = eventDate ? format(eventDate, 'HH:mm', { locale: lv }) : 'Nav pieejams';

  const attributes = [
    { icon: <SearchIcon />, label: 'Statuss', value: pet.status_display },
    { icon: <PetsIcon />, label: 'Suga', value: pet.species_display },
    { icon: <HeightIcon />, label: 'Augums', value: pet.size_display },
    { icon: <MaleIcon />, label: 'Dzimums', value: pet.gender_display },
    { icon: <CakeIcon />, label: 'Vecums', value: ageLabel },
    { icon: <MergeTypeIcon />, label: 'Šķirne', value: breedLabel },
    {
      icon: <TextureIcon />,
      label: 'Kažoka raksts',
      value: pet.pattern_display,
    },
    {
      icon: <ColorLensIcon />,
      label: 'Pamatkrāsa',
      value: pet.primary_color_display,
    },
    {
      icon: <ColorLensIcon />,
      label: 'Sekundārā krāsa',
      value: pet.secondary_color_display,
    },
    {
      icon: <EventIcon />,
      label: 'Datums',
      value: formattedDate,
    },
    // {
    //   icon: <EventIcon />,
    //   label: 'Datums un laiks',
    //   value: `${formattedDate}, ${formattedTime}`,
    // },
  ];

  return (
    <Box>
      <Grid container spacing={1}>
        {attributes.map((attr, idx) => (
          <Grid key={idx} size={{ xs: 12 }}>
            <PetAttributeItem {...attr} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PetAttributes;
