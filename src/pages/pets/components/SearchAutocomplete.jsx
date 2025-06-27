import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Autocomplete, Box, CircularProgress, InputLabel, ListItem, TextField } from '@mui/material';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchAutocomplete = ({ filters, searchValue, onSearchSelect }) => {
  const { t } = useTranslation('pets');
  const [inputValue, setInputValue] = useState('');
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
            `${API_BASE_URL}/api/pets/?search=${inputValue}&status=${filters.status}&species=${filters.species}&gender=${filters.gender}&size=${filters.size}&pattern=${filters.pattern}&date=${filters.date}&color=${filters.color}`,
          );
          const suggestions = res.data.results.map((pet) => ({
            label: pet.notes || '',
            value: pet.identifier || '',
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
        <InputLabel sx={{ fontWeight: '500', color: '#16477c' }}>{t('sidebar.search', { ns: 'pets' })}</InputLabel>
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
              placeholder={t('sidebar.searchPlaceholder', { ns: 'pets' })}
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

export default SearchAutocomplete;
