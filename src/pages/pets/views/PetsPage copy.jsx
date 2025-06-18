import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Drawer,
  Grid,
  Pagination,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { DEFAULT_CENTER_COORDS, ITEMS_PER_PAGE } from '../../../constants/map';
import { useQueryParams } from '../../../hooks/useQueryParams';
import LeafletClusterMap from '../../../shared/maps/LeafletClusterMap';
import PetCard from '../components/PetCard';
import PetCardSkeleton from '../components/PetCardSkeleton';
import Sidebar from '../components/Sidebar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Separate component for the map section
const MapSection = React.memo(({ pets, centerCoords }) => (
  <Box
    sx={{
      marginBottom: { xs: 'none', md: '1rem' },
      justifyContent: 'flex-end',
    }}
  >
    <LeafletClusterMap pets={pets} centerCoords={centerCoords} />
  </Box>
));

// Separate component for the mobile filter button
const MobileFilterButton = React.memo(({ onClick }) => (
  <Box py={2} sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
    <Button variant="contained" color="primary" size="small" onClick={onClick} startIcon={<FilterListIcon />}>
      Filter
    </Button>
  </Box>
));

// Separate component for the pets grid
const PetsGrid = React.memo(({ pets, filters, pagination, onPanToLocation }) => (
  <Grid container spacing={2}>
    {pets.map((pet) => (
      <Grid item xs={12} sm={6} md={4} lg={4} key={pet.id}>
        <PetCard pet={pet} filters={filters} pagination={pagination} onPanToLocation={onPanToLocation} />
      </Grid>
    ))}
  </Grid>
));

const PetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [centerCoords, setCenterCoords] = useState(DEFAULT_CENTER_COORDS);

  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { queryParams, updateQueryParams } = useQueryParams();

  const handlePanToLocation = useCallback((lat, lng) => {
    setCenterCoords([lat, lng]);
  }, []);

  const fetchPets = useCallback(
    async (params) => {
      try {
        setLoading(true);
        setError(null);

        const queryString = new URLSearchParams(params).toString();
        const newUrl = `${window.location.pathname}?${queryString}`;
        navigate(newUrl, { replace: true });

        const response = await fetch(`${API_BASE_URL}/api/pets/?${queryString}`);
        if (!response.ok) throw new Error('Failed to fetch pets');

        const data = await response.json();
        setPets(data.results);
        setPagination((prev) => ({
          ...prev,
          totalPages: Math.ceil(data.count / ITEMS_PER_PAGE),
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [navigate],
  );

  useEffect(() => {
    fetchPets(queryParams);
  }, [queryParams, fetchPets]);

  const handlePaginationChange = useCallback(
    (_, page) => {
      updateQueryParams({ page });
    },
    [updateQueryParams],
  );

  const handleResetFilters = useCallback(() => {
    updateQueryParams({ page: 1 });
  }, [updateQueryParams]);

  const handleFilterChange = useCallback(
    (newFilters) => {
      updateQueryParams({ ...newFilters, page: 1 });
    },
    [updateQueryParams],
  );

  const renderContent = useMemo(() => {
    if (loading) {
      return (
        <Grid container spacing={2}>
          {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <PetCardSkeleton />
            </Grid>
          ))}
        </Grid>
      );
    }

    if (error) {
      return <Alert severity="error">{error}</Alert>;
    }

    return (
      <>
        <PetsGrid pets={pets} filters={queryParams} pagination={pagination} onPanToLocation={handlePanToLocation} />
        <Pagination
          color="primary"
          sx={{ mt: '2rem' }}
          page={pagination.page}
          count={pagination.totalPages}
          onChange={handlePaginationChange}
        />
      </>
    );
  }, [loading, error, pets, queryParams, pagination, handlePanToLocation, handlePaginationChange]);

  return (
    <ErrorBoundary>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {!isMobile && (
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Sidebar filters={queryParams} onFilterChange={handleFilterChange} onReset={handleResetFilters} />
            </Grid>
          )}

          <Grid item xs={12} sm={12} md={9} lg={9}>
            <MapSection pets={pets} centerCoords={centerCoords} />
            <MobileFilterButton onClick={() => setDrawerOpen(true)} />

            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box sx={{ width: 300, p: 2 }}>
                <Sidebar filters={queryParams} onFilterChange={handleFilterChange} onReset={handleResetFilters} />
              </Box>
            </Drawer>

            {renderContent}
          </Grid>
        </Grid>
      </Container>
    </ErrorBoundary>
  );
};

export default React.memo(PetsPage);
