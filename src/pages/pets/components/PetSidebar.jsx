import { Box, Button, Chip, InputLabel, List, ListItem, TextField } from '@mui/material';

import {
  COLOR_CHOICES,
  GENDER_CHOICES,
  PATTERN_CHOICES,
  SIZE_CHOICES,
  SPECIES_CHOICES,
  STATUS_CHOICES,
} from '../../../constants/Choices';
import SearchAutocomplete from './SearchAutocomplete';

const PetSidebar = ({ filters, setFilters, onFilterChange, onReset }) => {
  const handleChipClick = (type, value) => {
    const newFilters = {
      ...filters,
      [type]: filters[type] === value ? '' : value,
    };

    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleDateChange = (e) => {
    const newFilters = {
      ...filters,
      date: e.target.value,
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
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
        {/* Status Filter */}
        <ListItem sx={{ padding: '0 !important' }}>
          <Box>
            <InputLabel sx={{ fontWeight: '500', color: '#16477c' }}>Statuss</InputLabel>
            {STATUS_CHOICES.map((status) => (
              <Chip
                key={status.value}
                label={status.label}
                clickable
                color={filters.status === status.value ? 'primary' : 'default'}
                onClick={() => handleChipClick('status', status.value)}
                sx={{ marginRight: '5px', marginBottom: '5px' }}
              />
            ))}
          </Box>
        </ListItem>

        {/* Species Filter */}
        <ListItem sx={{ padding: '0 !important', paddingTop: '0.8rem !important' }}>
          <Box>
            <InputLabel sx={{ fontWeight: '500', color: '#16477c' }}>Suga</InputLabel>
            {SPECIES_CHOICES.map((species) => (
              <Chip
                key={species.value}
                label={species.label}
                clickable
                color={filters.species === species.value ? 'primary' : 'default'}
                onClick={() => handleChipClick('species', species.value)}
                sx={{ marginRight: '5px', marginBottom: '5px' }}
              />
            ))}
          </Box>
        </ListItem>

        {/* Gender Filter */}
        <ListItem sx={{ padding: '0 !important', paddingTop: '0.8rem !important' }}>
          <Box>
            <InputLabel sx={{ fontWeight: '500', color: '#16477c' }}>Dzimums</InputLabel>
            {GENDER_CHOICES.map((gender) => (
              <Chip
                key={gender.value}
                label={gender.label}
                clickable
                color={filters.gender === gender.value ? 'primary' : 'default'}
                onClick={() => handleChipClick('gender', gender.value)}
                sx={{ marginRight: '5px', marginBottom: '5px' }}
              />
            ))}
          </Box>
        </ListItem>

        {/* Size Filter */}
        <ListItem sx={{ padding: '0 !important', paddingTop: '0.8rem !important' }}>
          <Box>
            <InputLabel sx={{ fontWeight: '500', color: '#16477c' }}>Izmērs</InputLabel>
            {SIZE_CHOICES.map((size) => (
              <Chip
                key={size.value}
                label={size.label}
                clickable
                color={filters.size === size.value ? 'primary' : 'default'}
                onClick={() => handleChipClick('size', size.value)}
                sx={{ marginRight: '5px', marginBottom: '5px' }}
              />
            ))}
          </Box>
        </ListItem>

        {/* Pattern Filter */}
        <ListItem sx={{ padding: '0 !important', paddingTop: '0.8rem !important' }}>
          <Box>
            <InputLabel sx={{ fontWeight: '500', color: '#16477c' }}>Kažoka raksts</InputLabel>
            {PATTERN_CHOICES.map((pattern) => (
              <Chip
                key={pattern.value}
                label={pattern.label}
                clickable
                color={filters.pattern === pattern.value ? 'primary' : 'default'}
                onClick={() => handleChipClick('pattern', pattern.value)}
                sx={{ marginRight: '5px', marginBottom: '5px' }}
              />
            ))}
          </Box>
        </ListItem>

        {/* Color Filter */}
        <ListItem sx={{ padding: '0 !important', paddingTop: '0.8rem !important' }}>
          <Box>
            <InputLabel sx={{ fontWeight: '500', color: '#16477c' }}>Krāsa</InputLabel>
            {COLOR_CHOICES.map((color) => (
              <Chip
                key={color.value}
                label={color.label}
                clickable
                color={filters.color === color.value ? 'primary' : 'default'}
                onClick={() => handleChipClick('color', color.value)}
                sx={{ marginRight: '5px', marginBottom: '5px' }}
              />
            ))}
          </Box>
        </ListItem>

        {/* Date Filter */}
        <ListItem sx={{ padding: '0 !important', paddingTop: '0.8rem !important' }}>
          <Box sx={{ width: '100%' }}>
            <InputLabel sx={{ fontWeight: '500', color: '#16477c' }}>Datums</InputLabel>

            <TextField
              type="date"
              variant="outlined"
              size="small"
              fullWidth
              value={filters.date || ''}
              onChange={handleDateChange}
            />
          </Box>
        </ListItem>

        {/* Search Filter */}
        <SearchAutocomplete filters={filters} searchValue={filters.search} onSearchSelect={handleSearchSelect} />

        {/* Reset Filters */}
        <ListItem sx={{ p: 0 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={onReset}
            sx={{
              mt: 4,
              py: 1,
              background: 'linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)',
            }}
          >
            Atiestatīt filtrus
          </Button>
        </ListItem>
      </List>
    </form>
  );
};

export default PetSidebar;
