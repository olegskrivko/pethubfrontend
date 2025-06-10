import React, { useState, useEffect } from 'react';
import {
  Grid, Button, CircularProgress, Box, Container,
  Alert, Pagination, Drawer, useTheme, useMediaQuery
} from '@mui/material';
import PetCardSkeleton from '../components/PetCardSkeleton';
import Sidebar from '../components/Sidebar';
import PetCard from '../components/PetCard';

import FilterListIcon from '@mui/icons-material/FilterList';
import { useLocation, useNavigate } from 'react-router-dom';
import LeafletClusterMap from '../../../shared/maps/LeafletClusterMap';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PetsList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [filters, setFilters] = useState({ status: '', species: '', gender: '', size: '', pattern: '', date: '', search: '', color: '', });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [centerCoords, setCenterCoords] = useState([56.946285, 24.105078]); 
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handlePanToLocation = (lat, lng) => {
    console.log('lat, lng', lat, lng);
    setCenterCoords([lat, lng]);
  };
 

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status') || '';  // One value only
    const species = queryParams.get('species') || '';  // One value only
    const gender = queryParams.get('gender') || '';  // One value only
    const size = queryParams.get('size') || '';  // One value only
    const pattern = queryParams.get('pattern') || '';  // One value only
    const date = queryParams.get('date') || '';
    const search = queryParams.get('search') || ''; 
    const color = queryParams.get('color') || '';     
    const page = parseInt(queryParams.get('page')) || 1;

    setFilters({ status, species, gender, size, pattern, date, search, color });
    setPagination({ page, totalPages: pagination.totalPages });

    fetchPets({ status, species, gender, size, pattern, date, search, color, page });
  }, [location.search]);

  const fetchPets = async ({ status, species, gender, size, pattern, date, search, color, page }) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (status) queryParams.append('status', status);  // One status only
      if (species) queryParams.append('species', species);  // One species only
      if (gender) queryParams.append('gender', gender);  // One gender only
      if (size) queryParams.append('size', size);  // One size only
      if (pattern) queryParams.append('pattern', pattern);  // One pattern only
      if (date) queryParams.append('date', date);  // One pattern only
      if (search) queryParams.append('search', search);  // One pattern only
      if (color) queryParams.append('color', color);  // One pattern only
      queryParams.append('page', page);

      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
      navigate(newUrl, { replace: true });

      const res = await fetch(`${API_BASE_URL}/api/pets/?${queryParams}`);
      if (!res.ok) throw new Error('Failed to fetch pets');

      const data = await res.json();
      setPets(data.results);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.count / 6),
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaginationChange = (e, page) => {
    setPagination((prev) => ({ ...prev, page }));
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', page);
    navigate(`${window.location.pathname}?${queryParams.toString()}`, { replace: true });
  };

  const handleResetFilters = () => {
    setFilters({ status: '', species: '', gender: '', size: '', pattern: '', date: '', search: '', color: '', }); // Reset to empty values
    setPagination((prev) => ({ ...prev, page: 1 }));
    navigate(`${window.location.pathname}?page=1`, { replace: true });
  };

  const handleFilterChange = (newFilters) => {
    // Ensure each filter only has one value
    if (newFilters.species) {
      newFilters.species = newFilters.species;  // One value only
    }
    if (newFilters.gender) {
      newFilters.gender = newFilters.gender;  // One value only
    }
    if (newFilters.status) {
      newFilters.status = newFilters.status;  // One value only
    }
    if (newFilters.size) {
      newFilters.size = newFilters.size;  // One value only
    }
    if (newFilters.pattern) {
      newFilters.pattern = newFilters.pattern;  // One value only
    }
    if (newFilters.date) {
      newFilters.date = newFilters.date;  // One value only
    }
    if (newFilters.search) {
      newFilters.search = newFilters.search;  // One value only
    }
    if (newFilters.color) {
      newFilters.color = newFilters.color;  // One value only
    }


    
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));

    const queryParams = new URLSearchParams();

    // Add status filter to query params (only one value allowed)
    if (newFilters.status) queryParams.append('status', newFilters.status);
    if (newFilters.species) queryParams.append('species', newFilters.species);
    if (newFilters.gender) queryParams.append('gender', newFilters.gender);
    if (newFilters.size) queryParams.append('size', newFilters.size);
    if (newFilters.pattern) queryParams.append('pattern', newFilters.pattern);
    if (newFilters.date) queryParams.append('date', newFilters.date);
    if (newFilters.search) queryParams.append('search', newFilters.search);
    if (newFilters.color) queryParams.append('color', newFilters.color);

    // Add the page number
    queryParams.append('page', 1);

    // Update the URL with the new query params
    navigate(`${window.location.pathname}?${queryParams.toString()}`, { replace: true });
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {!isMobile && (
          <Grid size={{ xs: 12, sm: 12, md: 3, lg: 3 }}>
            <Sidebar
              filters={filters}
              setFilters={setFilters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </Grid>
        )}

        <Grid size={{ xs: 12, sm: 12, md: 9, lg: 9 }} md={isMobile ? 12 : 9}>
        <Box
    
            sx={{
              marginBottom: { xs: 'none', md: '1rem' },
              justifyContent: 'flex-end',
            }}
          >
          <LeafletClusterMap pets={pets} centerCoords={centerCoords} />
          </Box>
          <Box
            py={2}
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => setDrawerOpen(true)}
              startIcon={<FilterListIcon />}
            >
              Filter
            </Button>
          </Box>

          {/* Drawer for mobile */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box sx={{ width: 300, p: 2 }}>
              <Sidebar
                filters={filters}
                setFilters={setFilters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </Box>
          </Drawer>

          {loading ? (
            <Grid container spacing={2}>
              {[...Array(6)].map((_, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
                  <PetCardSkeleton />
                </Grid>
              ))}
            </Grid>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <Grid container spacing={2}>
                {pets.map((pet) => {
                  const petDetailUrl = `/pets/${pet.id}?status=${filters.status}&species=${filters.species}&gender=${filters.gender}&size=${filters.size}&pattern=${filters.pattern}&date=${filters.date}&search=${filters.search}&color=${filters.color}&page=${pagination.page}`;
                  return (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={pet.id}>
                      <PetCard
                        pet={pet}
                        filters={filters}
                        pagination={pagination}
                        petDetailUrl={petDetailUrl}
                        onPanToLocation={handlePanToLocation}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              <Pagination
                color="primary"
                sx={{ mt: '2rem' }}
                page={pagination.page}
                count={pagination.totalPages}
                onChange={handlePaginationChange}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PetsList;
