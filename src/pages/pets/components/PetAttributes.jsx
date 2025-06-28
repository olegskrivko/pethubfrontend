import React from 'react';
import { useTranslation } from 'react-i18next';

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

import {
  getStatusLabel,
  getSpeciesLabel,
  getSizeLabel,
  getGenderLabel,
  getAgeLabel,
  getPatternLabel,
  getColorLabel,
} from '../../../constants/Choices';
import PetAttributeItem from './PetAttributeItem';

const PetAttributes = ({ pet }) => {
  const { t } = useTranslation('pets');
  const { t: tPetDetails } = useTranslation('petDetails');

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
    { icon: <SearchIcon />, label: t('attributes.status', { ns: 'pets' }), value: getStatusLabel(pet.status, tPetDetails) },
    { icon: <PetsIcon />, label: t('attributes.species', { ns: 'pets' }), value: getSpeciesLabel(pet.species, tPetDetails) },
    { icon: <HeightIcon />, label: t('attributes.size', { ns: 'pets' }), value: getSizeLabel(pet.size, tPetDetails) },
    { icon: <MaleIcon />, label: t('attributes.gender', { ns: 'pets' }), value: getGenderLabel(pet.gender, tPetDetails) },
    { icon: <CakeIcon />, label: t('attributes.age', { ns: 'pets' }), value: getAgeLabel(pet.age, tPetDetails) },
    { icon: <MergeTypeIcon />, label: t('attributes.breed', { ns: 'pets' }), value: breedLabel },
    {
      icon: <TextureIcon />,
      label: t('attributes.pattern', { ns: 'pets' }),
      value: getPatternLabel(pet.pattern, tPetDetails),
    },
    {
      icon: <ColorLensIcon />,
      label: t('attributes.primaryColor', { ns: 'pets' }),
      value: getColorLabel(pet.primary_color, tPetDetails),
    },
    {
      icon: <ColorLensIcon />,
      label: t('attributes.secondaryColor', { ns: 'pets' }),
      value: getColorLabel(pet.secondary_color, tPetDetails),
    },
    {
      icon: <EventIcon />,
      label: t('attributes.date', { ns: 'pets' }),
      value: formattedDate,
    },
    // {
    //   icon: <EventIcon />,
    //   label: t('attributes.dateTime', { ns: 'pets' }),
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
