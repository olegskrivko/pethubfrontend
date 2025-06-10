import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Chip, InputLabel, List, ListItem
} from '@mui/material'; 
import SearchAutocomplete from './ServiceSearchAutocomplete';
import { SERVICE_CATEGORIES } from '../../../constants/petOptions';

const ServiceSidebar = ({ filters, setFilters, onFilterChange, onReset }) => {

  const handleChipClick = (type, value) => {
    const newFilters = {
      ...filters,
      [type]: filters[type] === value ? '' : value, // toggle selection
    };

    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

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
            {SERVICE_CATEGORIES.map((category) => (
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
