import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Container,
  Alert,
  Button,
  AlertTitle,
  Dialog,
  DialogContent,
  IconButton,
  Drawer, Pagination
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LeafletSheltersMap from '../../../shared/maps/LeafletSheltersMap';
import logo from '../../../assets/images/shelters/animal_shelter.png';
import Sidebar from "../components/ShelterSidebar"
import ShelterCard from '../components/ShelterCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SheltersList = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const location = useLocation();
  const navigate = useNavigate();
 const [centerCoords, setCenterCoords] = useState([56.946285, 24.105078]);
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [filters, setFilters] = useState({ category: '', search: '' });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    const popupShown = localStorage.getItem('sheltersPopupShown');

    if (!popupShown) {
      setShowPopup(true);
      localStorage.setItem('sheltersPopupShown', 'true');
    }
  }, []);

  useEffect(() => {
    const fetchShelters = async () => {
      // const accessToken = localStorage.getItem('access_token');
    
      try {
        const response = await axios.get(`${API_BASE_URL}/api/shelters/`, 
        //   {
        //   headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        // }
      );
        setShelters(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shelters:', error);
        setError('Failed to load shelters. Please try again later.');
        setLoading(false);
      }
    };

    fetchShelters();

  }, []);


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category') || ''; // One value only
    const search = queryParams.get('search') || ''; // One value only
    const page = parseInt(queryParams.get('page')) || 1;

    setFilters({ category, search });
    setPagination({page, totalPages: pagination.totalPages });

    fetchShelters({ category, search, page });
  }, [location.search]);

  const fetchShelters = async ({ category, search, page }) => {
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
      if (search) queryParams.append('search', search);
      queryParams.append('page', page);

      const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
      navigate(newUrl, { replace: true });

      const res = await fetch(`${API_BASE_URL}/api/shelters/?${queryParams}`);
      if (!res.ok) throw new Error('Failed to fetch shelters');

      const data = await res.json();
      setShelters(data.results);
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.count / 8),
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
    setFilters({ category: '', search: '' }); // Reset to empty values
    setPagination((prev) => ({ ...prev, page: 1 }));
    navigate(`${window.location.pathname}?page=1`, { replace: true });
  };

  const handleFilterChange = (newFilters) => {
    // Ensure each filter only has one value
    if (newFilters.category) {
      newFilters.category = newFilters.category;  // One value only
    }
    if (newFilters.search) {
      newFilters.search = newFilters.search;  // One value only
    }

    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));

    const queryParams = new URLSearchParams();

    // Add status filter to query params (only one value allowed)
    if (newFilters.category) queryParams.append('category', newFilters.category);
    if (newFilters.search) queryParams.append('search', newFilters.search);

    // Add the page number
    queryParams.append('page', 1);

    // Update the URL with the new query params
    navigate(`${window.location.pathname}?${queryParams.toString()}`, { replace: true });
  };


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
      <Container maxWidth="lg" >
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
                           
                                 <LeafletSheltersMap shelters={shelters} centerCoords={centerCoords} />
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
                         {[...Array(8)].map((_, index) => (
                           <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={index}>
                             <ShelterCardSkeleton />
                           </Grid>
                         ))}
                       </Grid>
                     ) : error ? (
                       <Alert severity="error">{error}</Alert>
                     ) : (
                       <>
                         <Grid container spacing={2}>
                           {shelters && shelters.length > 0 && shelters.map((shelter) => (
                             <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={shelter.id}>
                               <ShelterCard shelter={shelter}  
                               filters={filters}
                                   pagination={pagination}
                                    />
                             </Grid>
                           ))}
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
 



   {/* Pop-up alert as Dialog */}
      <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
        <DialogContent sx={{ position: 'relative', p: 4 }}>
          <IconButton
            aria-label="close"
            onClick={() => setShowPopup(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Alert severity="info">
            <AlertTitle>Piezīme patversmēm</AlertTitle>
            Ja jūs pārstāvat patversmi un vēlaties, lai tā tiktu parādīta mūsu lietotnē, lūdzu, sazinieties ar mums.
            Mēs ar prieku sadarbosimies ar jums, lai izceltu jūsu organizāciju un palīdzētu vairāk dzīvniekiem atrast savas mūžīgās mājas.
          </Alert>
        </DialogContent>
      </Dialog>
    </Grid>
       </Container>
  );
};

export default SheltersList;
// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   CircularProgress,
//   Container,
//   Alert,
//   AlertTitle,
//   Dialog,
//   DialogContent,
//   IconButton,
//   Stack,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import logo from '../../../assets/images/shelters/animal_shelter.png';
// import { Chip } from '@mui/material';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const SheltersList = () => {
//   const theme = useTheme();
//   const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

//   const [shelters, setShelters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     const popupShown = localStorage.getItem('sheltersPopupShown');
//     if (!popupShown) {
//       setShowPopup(true);
//       localStorage.setItem('sheltersPopupShown', 'true');
//     }
//   }, []);

//   useEffect(() => {
//     const fetchShelters = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/shelters/`);
//         setShelters(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching shelters:', error);
//         setError('Failed to load shelters. Please try again later.');
//         setLoading(false);
//       }
//     };
//     fetchShelters();
//   }, []);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Container component="main" maxWidth="lg">
//       {/* If you want a title */}
//       {/* <Typography variant="h4" mb={4} textAlign="center">Dzīvnieku patversmes</Typography> */}

//       <Stack spacing={2}>
//         {shelters.map((shelter) => (
//           <Card
//             key={shelter.id}
//             component={Link}
//             to={`/shelters/${shelter.id}`}
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               textDecoration: 'none',
//               color: 'inherit',
//               padding: 2,
//               borderRadius: 3,
//               boxShadow: 2,
//               '&:hover': {
//                 boxShadow: 6,
//                 backgroundColor: 'action.hover',
//               },
//             }}
//             elevation={3}
//           >
//             <CardMedia
//               component="img"
//               image={logo}
//               alt={shelter.name}
//               sx={{
//                 width: 80,
//                 height: 80,
//                 borderRadius: 2,
//                 objectFit: 'cover',
//                 marginRight: 2,
//               }}
//             />
//             <CardContent sx={{ padding: 0 }}>
//               <Typography variant="h6" fontWeight={600}>
//                 {shelter.name}
//               </Typography>
//               {shelter.city && (
//                 <Typography variant="body2" color="text.secondary">
//                   {shelter.city}, {shelter.country}
//                 </Typography>
//               )}
//               {/* {shelter.description && (
//                 <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 400 }}>
//                   {shelter.description}
//                 </Typography>
//               )} */}
//               {/* Inside your shelter map: */}
// <Stack direction="row" spacing={1} mt={1}>
//   {shelter.animal_types?.map((type) => (
//     <Chip key={type.id} label={type.name} size="small" sx={{backgroundColor: "#00b5ad", color: "#fff"}} />
//   ))}
// </Stack>
//             </CardContent>
//           </Card>
//         ))}
//       </Stack>

//       {/* Pop-up alert as Dialog */}
//       <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
//         <DialogContent sx={{ position: 'relative', p: 4 }}>
//           <IconButton
//             aria-label="close"
//             onClick={() => setShowPopup(false)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//           <Alert severity="info">
//             <AlertTitle>Piezīme patversmēm</AlertTitle>
//             Ja jūs pārstāvat patversmi un vēlaties, lai tā tiktu parādīta mūsu lietotnē, lūdzu, sazinieties ar mums.
//             Mēs ar prieku sadarbosimies ar jums, lai izceltu jūsu organizāciju un palīdzētu vairāk dzīvniekiem atrast savas mūžīgās mājas.
//           </Alert>
//         </DialogContent>
//       </Dialog>
//     </Container>
//   );
// };

// export default SheltersList;
