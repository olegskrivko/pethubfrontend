import { Box, Button, Chip, InputLabel, List, ListItem } from '@mui/material';

import { CATEGORY_CHOICES, PROVIDER_TYPES } from '../../../constants/Choices';
import SearchAutocomplete from './ServiceSearchAutocomplete';

const ServiceSidebar = ({ filters, setFilters, onFilterChange, onReset }) => {
  const handleChipClick = (type, value) => {
    const newFilters = {
      ...filters,
      [type]: filters[type] === value ? '' : value,
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
            {CATEGORY_CHOICES.map((category) => (
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

        {/* Service Provider Filter */}
        <ListItem sx={{ padding: '0 !important', paddingTop: '0.8rem !important' }}>
          <Box>
            <InputLabel sx={{ fontWeight: '500', color: '#16477c' }}>Pakalpojuma sniedzējs</InputLabel>
            {PROVIDER_TYPES.map((provider) => (
              <Chip
                key={provider.value}
                label={provider.label}
                clickable
                color={filters.provider === provider.value ? 'primary' : 'default'}
                onClick={() => handleChipClick('provider', provider.value)}
                sx={{ marginRight: '5px', marginBottom: '5px' }}
              />
            ))}
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

export default ServiceSidebar;
