import React, { useEffect, useState } from 'react';
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
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// You need to implement this
import LeafletServicesMap from '../../../shared/maps/LeafletServicesMap';
import ServiceCard from '../components/ServiceCard';
import ServiceCardSkeleton from '../components/ServiceCardSkeleton';
import Sidebar from '../components/ServiceSidebar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [filters, setFilters] = useState({ category: '', provider: '', search: '' });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [centerCoords, setCenterCoords] = useState([56.946285, 24.105078]);
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // const handlePanToLocation = (lat, lng) => {
  //   console.log('lat, lng', lat, lng);
  //   setCenterCoords([lat, lng]);
  // };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category') || ''; // One value only
    const provider = queryParams.get('provider') || ''; // One value only
    const search = queryParams.get('search') || ''; // One value only
    const page = parseInt(queryParams.get('page')) || 1;

    setFilters({ category, provider, search });
    setPagination({ page, totalPages: pagination.totalPages });

    fetchServices({ category, provider, search, page });
  }, [location.search]);

  const fetchServices = async ({ category, provider, search, page }) => {
    try {
      // const accessToken = localStorage.getItem('access_token');  // Retrieve the access token from localStorage
      // if (!accessToken) {
      //   setError('You must be logged in to view shelters.');
      //   setLoading(false);
      //   return;
      // }
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (category) queryParams.append('category', category); // One category only
      if (provider) queryParams.append('provider', provider); // One category only
      if (search) queryParams.append('search', search);
      queryParams.append('page', page);

      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
      navigate(newUrl, { replace: true });

      const res = await fetch(`${API_BASE_URL}/api/services/?${queryParams}`);
      if (!res.ok) throw new Error('Failed to fetch services');

      const data = await res.json();
      setServices(data.results);
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
    navigate(`${window.location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  };

  const handleResetFilters = () => {
    setFilters({ category: '', provider: '', search: '' }); // Reset to empty values
    setPagination((prev) => ({ ...prev, page: 1 }));
    navigate(`${window.location.pathname}?page=1`, { replace: true });
  };

  const handleFilterChange = (newFilters) => {
    // Ensure each filter only has one value
    if (newFilters.category) {
      newFilters.category = newFilters.category; // One value only
    }
    if (newFilters.provider) {
      newFilters.provider = newFilters.provider; // One value only
    }

    if (newFilters.search) {
      newFilters.search = newFilters.search; // One value only
    }

    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));

    const queryParams = new URLSearchParams();

    // Add status filter to query params (only one value allowed)
    if (newFilters.category) queryParams.append('category', newFilters.category);
    if (newFilters.provider) queryParams.append('provider', newFilters.provider);
    if (newFilters.search) queryParams.append('search', newFilters.search);

    // Add the page number
    queryParams.append('page', 1);

    // Update the URL with the new query params
    navigate(`${window.location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
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
            <LeafletServicesMap services={services} centerCoords={centerCoords} />
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
          <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
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
                  <ServiceCardSkeleton />
                </Grid>
              ))}
            </Grid>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Grid container spacing={2}>
              {Array.isArray(services) && services.length > 0 ? (
                services.map((service) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={service.id}>
                    <ServiceCard service={service} filters={filters} pagination={pagination} />
                  </Grid>
                ))
              ) : (
                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <Alert
                    severity="info"
                    variant="outlined"
                    sx={{
                      textAlign: 'center',
                      backgroundColor: '#f5faff',
                      borderColor: '#b6e0fe',
                      color: '#0b3d91',
                    }}
                  >
                    <Typography variant="h6">
                      Šobrīd nav pieejamu pakalpojumu, kas atbilst jūsu meklēšanas kritērijiem.
                    </Typography>
                    <Typography variant="body2">
                      Mēģiniet mainīt filtrus vai apmeklējiet mūs vēlāk – iespējams, drīzumā tiks pievienoti jauni
                      pakalpojumi.
                    </Typography>
                  </Alert>
                </Grid>
              )}
            </Grid>
          )}

          {/* Show pagination only when there are results */}
          {!error && services && services.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: '2rem' }}>
              <Pagination
                color="primary"
                page={pagination.page}
                count={pagination.totalPages}
                onChange={handlePaginationChange}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServicesList;
