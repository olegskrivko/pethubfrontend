import React, { useEffect, useState } from 'react';

import { Autocomplete, Box, CircularProgress, InputLabel, ListItem, TextField } from '@mui/material';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ServiceSearchAutocomplete = ({ filters, searchValue, onSearchSelect }) => {
  const [inputValue, setInputValue] = useState('');
  console.log('filtersfilters', filters);
  useEffect(() => {
    // Whenever searchValue from parent changes, update the input
    setInputValue(searchValue || '');
  }, [searchValue]);

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue.length >= 3) {
      setLoading(true);
      const fetchSuggestions = async () => {
        try {
          // added part after ?search=${inputValue} so it would suggest based on already filtered pets
          const res = await axios.get(
            `${API_BASE_URL}/api/services/?search=${inputValue}&category=${filters.category}`,
          );
          const suggestions = res.data.results.map((service) => ({
            label: `${service.title || ''} ${service.description || ''}`.trim(),
            value: service.title || '',
          }));
          setOptions(suggestions);
        } catch (err) {
          console.error('Failed to fetch suggestions:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchSuggestions();
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  return (
    <ListItem sx={{ padding: '0 !important', paddingTop: '0.8rem !important' }}>
      <Box sx={{ width: '100%' }}>
        <InputLabel sx={{ fontWeight: '500', color: '#16477c' }}>Meklēt</InputLabel>
        <Autocomplete
          freeSolo
          options={options}
          loading={loading}
          inputValue={inputValue}
          onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
          onChange={(e, newValue) => {
            if (newValue === null) {
              // User clicked the clear (X) button
              setInputValue('');
              onSearchSelect('');
            } else if (typeof newValue === 'string') {
              onSearchSelect(newValue);
            } else if (newValue?.value) {
              onSearchSelect(newValue.label);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              //   label="Search Notes / ID"
              placeholder="Sāc rakstīt, lai meklētu..."
              variant="outlined"
              size="small"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>
    </ListItem>
  );
};

export default ServiceSearchAutocomplete;
