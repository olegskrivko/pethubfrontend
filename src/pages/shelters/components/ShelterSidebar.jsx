import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Chip, InputLabel, List, ListItem
} from '@mui/material'; 
import SearchAutocomplete from './ShelterSearchAutocomplete';
import { SHELTER_CATEGORIES } from '../../../constants/petOptions';

// const categoryLabelsLv = {
//   1: "Dzīvnieku pieskatīšana",
//   2: "Suņu pastaigas",
//   3: "Kopšana",
//   4: "Apmācība",
//   5: "Izmitināšana",
//   6: "Veterinārārsts",
//   7: "Foto sesijas",
//   8: "Glābšana un meklēšana",
//   9: "Piederumi un aksesuāri",
//   10: "Māksla",
//   11: "Apbedīšana",
//   12: "Transports",
//   13: "Audzētavas",
//   14: "Apdrošināšana",
//   15: "Citi pakalpojumi"
// };

const ServiceSidebar = ({ filters, setFilters, onFilterChange, onReset }) => {
//   const [localFilters, setLocalFilters] = useState(filters);

  const handleChipClick = (type, value) => {
    const newFilters = {
      ...filters,
      [type]: filters[type] === value ? '' : value, // toggle selection
    };

    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

//   const handleChipClick = (field, value) => {
//     setLocalFilters((prev) => ({
//       ...prev,
//       [field]: prev[field] === value ? '' : value, // toggle on click
//     }));
//   };

  const handleSearchSelect = (searchTerm) => {
    const newFilters = {
      ...filters,
      search: searchTerm,
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <form>
        <List sx={{ paddingTop: '0' }}>
            {/* Category Filter */}
             <ListItem sx={{ padding: '0 !important' }}>
          <Box>
            <InputLabel sx={{ fontWeight: '500', color: '#16477c' }}>Kategorija</InputLabel>
            {SHELTER_CATEGORIES.map((category) => (
              <Chip
                key={category.value}
                label={category.label}
                clickable
                color={filters.category === category.value ? 'primary' : 'default'}
                onClick={() => handleChipClick('category', category.value)}
                sx={{ marginRight: '5px', marginBottom: '5px' }}
              />
            ))}
          </Box>

             </ListItem>


            {/* Search Filter */}

            <SearchAutocomplete
            filters={filters}
      searchValue={filters.search}
      onSearchSelect={handleSearchSelect}
    />

          {/* Reset Filters */}
            <ListItem sx={{ padding: '0 !important', paddingTop: '2rem !important', paddingBottom: '0.8rem !important' }}>
              <Button
                variant="outlined"
                sx={{ width: '100%' }}
                color="primary"
                onClick={onReset}
              >
                Atiestatīt filtrus
              </Button>
            </ListItem>
    </List>
    </form>
  );
};

export default ServiceSidebar;
