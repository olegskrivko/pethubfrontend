// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   Alert,
// // //   CircularProgress,
// // //   Container,
// // //   Paper,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   Typography,
// // // } from '@mui/material';
// // // import axios from 'axios';
// // // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// // // const PostersList = () => {
// // //   const [posters, setPosters] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const fetchPosters = async () => {
// // //     try {
// // //       const response = await axios.get(`${API_BASE_URL}/api/pets/my-posters/`);
// // //       setPosters(response.data);
// // //       setLoading(false);
// // //     } catch (error) {
// // //       console.error(error);
// // //       setError('Failed to load posters.');
// // //       setLoading(false);
// // //     }
// // //   };
// // //   useEffect(() => {
// // //     fetchPosters();
// // //   }, []);
// // //   return (
// // //     <Container sx={{ mt: 4 }}>
// // //       <Typography variant="h4" gutterBottom>
// // //         My Posters
// // //       </Typography>
// // //       {loading && <CircularProgress />}
// // //       {error && <Alert severity="error">{error}</Alert>}
// // //       {!loading && !error && (
// // //         <TableContainer component={Paper}>
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow>
// // //                 <TableCell>
// // //                   <strong>Name</strong>
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   <strong>Pet ID</strong>
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   <strong>Scans</strong>
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   <strong>Latitude</strong>
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   <strong>Longitude</strong>
// // //                 </TableCell>
// // //                 <TableCell>
// // //                   <strong>Created At</strong>
// // //                 </TableCell>
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {posters.map((poster) => (
// // //                 <TableRow key={poster.id}>
// // //                   <TableCell>{poster.name}</TableCell>
// // //                   <TableCell>{poster.pet}</TableCell>
// // //                   <TableCell>{poster.scans}</TableCell>
// // //                   <TableCell>
// // //                     {poster.has_location && poster.latitude != null ? poster.latitude.toFixed(5) : '-'}
// // //                   </TableCell>
// // //                   <TableCell>
// // //                     {poster.has_location && poster.longitude != null ? poster.longitude.toFixed(5) : '-'}
// // //                   </TableCell>
// // //                   <TableCell>{new Date(poster.created_at).toLocaleString()}</TableCell>
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //       )}
// // //     </Container>
// // //   );
// // // };
// // // export default PostersList;
// // import React, { useEffect, useState } from 'react';
// // import {
// //   Alert,
// //   CircularProgress,
// //   Container,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Typography,
// // } from '@mui/material';
// // import axios from 'axios';
// // import LeafletPostersMap from '../../../shared/maps/LeafletPostersMap';
// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// // const PostersList = () => {
// //   const [centerCoords, setCenterCoords] = useState([56.946285, 24.105078]);
// //   const [posters, setPosters] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const fetchUserPosters = async () => {
// //     const accessToken = localStorage.getItem('access_token');
// //     if (!accessToken) {
// //       setError('You must be logged in to view your posters.');
// //       setLoading(false);
// //       return;
// //     }
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/api/pets/my-posters/`, {
// //         headers: {
// //           Authorization: `Bearer ${accessToken}`,
// //         },
// //       });
// //       setPosters(response.data);
// //       setLoading(false);
// //     } catch (error) {
// //       console.error(error);
// //       setError('Failed to load posters.');
// //       setLoading(false);
// //     }
// //   };
// //   useEffect(() => {
// //     fetchUserPosters();
// //   }, []);
// //   return (
// //     <Container sx={{ mt: 4 }}>
// //       <Typography
// //         component="h1"
// //         align="center"
// //         sx={{
// //           fontWeight: 800,
// //           fontSize: {
// //             xs: '1.5rem',
// //             sm: '2rem',
// //             md: '2.5rem',
// //             lg: '2.5rem',
// //           },
// //           mb: 5,
// //           background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
// //           WebkitBackgroundClip: 'text',
// //           WebkitTextFillColor: 'transparent',
// //         }}
// //       >
// //         My Posters
// //       </Typography>
// //       {loading && <CircularProgress />}
// //       {error && <Alert severity="error">{error}</Alert>}
// //       {!loading && !error && (
// //         //  <Paper sx={{ mt: 3, px: 2, borderTop: '4px solid #8041a6', boxShadow: 2, position: 'relative' }}></Paper>
// //         <TableContainer
// //           component={Paper}
// //           sx={{ mt: 3, px: 2, borderTop: '4px solid #00b5ad', boxShadow: 2, position: 'relative' }}
// //         >
// //           <Table>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell>
// //                   <strong>Name</strong>
// //                 </TableCell>
// //                 <TableCell>
// //                   <strong>Pet ID</strong>
// //                 </TableCell>
// //                 <TableCell>
// //                   <strong>Scans</strong>
// //                 </TableCell>
// //                 <TableCell>
// //                   <strong>Latitude</strong>
// //                 </TableCell>
// //                 <TableCell>
// //                   <strong>Longitude</strong>
// //                 </TableCell>
// //                 <TableCell>
// //                   <strong>Created At</strong>
// //                 </TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {posters.map((poster) => (
// //                 <TableRow key={poster.id}>
// //                   <TableCell>{poster.name}</TableCell>
// //                   <TableCell>{poster.pet}</TableCell>
// //                   <TableCell>{poster.scans}</TableCell>
// //                   <TableCell>
// //                     {poster.has_location && poster.latitude != null ? poster.latitude.toFixed(5) : '-'}
// //                   </TableCell>
// //                   <TableCell>
// //                     {poster.has_location && poster.longitude != null ? poster.longitude.toFixed(5) : '-'}
// //                   </TableCell>
// //                   <TableCell>{new Date(poster.created_at).toLocaleString()}</TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       )}
// //       <LeafletPostersMap posters={posters} centerCoords={centerCoords} />
// //     </Container>
// //   );
// // };
// // export default PostersList;
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   Box,
//   CircularProgress,
//   Container,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from '@mui/material';
// import axios from 'axios';
// import LeafletPostersMap from '../../../shared/maps/LeafletPostersMap';
// import StatsCard from '../components/StatsCard';
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const PostersList = () => {
//   const [centerCoords, setCenterCoords] = useState([56.946285, 24.105078]);
//   const [posters, setPosters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // For statistics
//   const [totalPosters, setTotalPosters] = useState(0);
//   const [postersCountByPet, setPostersCountByPet] = useState({});
//   const fetchUserPosters = async () => {
//     const accessToken = localStorage.getItem('access_token');
//     if (!accessToken) {
//       setError('You must be logged in to view your posters.');
//       setLoading(false);
//       return;
//     }
//     try {
//       const response = await axios.get(`${API_BASE_URL}/api/pets/my-posters/`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       const postersData = response.data;
//       setPosters(postersData);
//       setLoading(false);
//       // Calculate statistics
//       setTotalPosters(postersData.length);
//       // Count posters per pet
//       const countByPet = postersData.reduce((acc, poster) => {
//         const petId = poster.pet;
//         acc[petId] = (acc[petId] || 0) + 1;
//         return acc;
//       }, {});
//       setPostersCountByPet(countByPet);
//     } catch (error) {
//       console.error(error);
//       setError('Failed to load posters.');
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchUserPosters();
//   }, []);
//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography
//         component="h1"
//         align="center"
//         sx={{
//           fontWeight: 800,
//           fontSize: {
//             xs: '1.5rem',
//             sm: '2rem',
//             md: '2.5rem',
//             lg: '2.5rem',
//           },
//           mb: 5,
//           background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
//           WebkitBackgroundClip: 'text',
//           WebkitTextFillColor: 'transparent',
//         }}
//       >
//         My Posters
//       </Typography>
//       {loading && <CircularProgress />}
//       {error && <Alert severity="error">{error}</Alert>}
//       {!loading && !error && (
//         <>
//           {/* Posters Table */}
//           <TableContainer
//             component={Paper}
//             sx={{ mt: 3, px: 2, borderTop: '4px solid #00b5ad', boxShadow: 2, position: 'relative' }}
//           >
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <strong>Name</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Pet ID</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Scans</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Latitude</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Longitude</strong>
//                   </TableCell>
//                   <TableCell>
//                     <strong>Created At</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {posters.map((poster) => (
//                   <TableRow key={poster.id}>
//                     <TableCell>{poster.name}</TableCell>
//                     <TableCell>{poster.pet}</TableCell>
//                     <TableCell>{poster.scans}</TableCell>
//                     <TableCell>
//                       {poster.has_location && poster.latitude != null ? poster.latitude.toFixed(5) : '-'}
//                     </TableCell>
//                     <TableCell>
//                       {poster.has_location && poster.longitude != null ? poster.longitude.toFixed(5) : '-'}
//                     </TableCell>
//                     <TableCell>{new Date(poster.created_at).toLocaleString()}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           {/* Add padding before map */}
//           <Box sx={{ mt: 6 }}>
//             <LeafletPostersMap posters={posters} centerCoords={centerCoords} />
//           </Box>
//           {/* Statistics Section */}
//           {!loading && !error && (
//             <>
//               <StatsCard totalPosters={totalPosters} postersCountByPet={postersCountByPet} />
//               {/* ...rest of your code */}
//             </>
//           )}
//         </>
//       )}
//     </Container>
//   );
// };
// export default PostersList;
import React, { useEffect, useState } from 'react';

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';

import LeafletPostersMap from '../../../shared/maps/LeafletPostersMap';
import StatsCard from '../components/StatsCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PostersList = () => {
  const [centerCoords, setCenterCoords] = useState([56.946285, 24.105078]);
  const [posters, setPosters] = useState([]);
  const [pets, setPets] = useState([]); // <-- new state for pets
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For statistics
  const [totalPosters, setTotalPosters] = useState(0);
  const [postersCountByPet, setPostersCountByPet] = useState({});

  // Fetch posters
  const fetchUserPosters = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setError('You must be logged in to view your posters.');
      setLoading(false);
      return;
    }

    try {
      const postersResponse = await axios.get(`${API_BASE_URL}/api/pets/my-posters/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const postersData = postersResponse.data;
      setPosters(postersData);

      // Calculate statistics
      setTotalPosters(postersData.length);

      // Count posters per pet
      const countByPet = postersData.reduce((acc, poster) => {
        const petId = poster.pet;
        acc[petId] = (acc[petId] || 0) + 1;
        return acc;
      }, {});
      setPostersCountByPet(countByPet);
    } catch (error) {
      console.error(error);
      setError('Failed to load posters.');
    }
  };

  // Fetch pets
  const fetchUserPets = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setError('You must be logged in to view your pets.');
      setLoading(false);
      return;
    }

    try {
      const petsResponse = await axios.get(`${API_BASE_URL}/api/accounts/user-pets/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setPets(petsResponse.data);
    } catch (error) {
      console.error(error);
      setError('Failed to load user pets.');
    }
  };

  // Combined fetch on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUserPosters(), fetchUserPets()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        component="h1"
        align="center"
        sx={{
          fontWeight: 800,
          fontSize: {
            xs: '1.5rem',
            sm: '2rem',
            md: '2.5rem',
            lg: '2.5rem',
          },
          mb: 5,
          background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        My Posters
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <>
          {/* Posters Table */}
          <TableContainer
            component={Paper}
            sx={{ mt: 3, px: 2, borderTop: '4px solid #00b5ad', boxShadow: 2, position: 'relative' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Pet ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Scans</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Latitude</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Longitude</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Created At</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posters.map((poster) => (
                  <TableRow key={poster.id}>
                    <TableCell>{poster.name}</TableCell>
                    <TableCell>{poster.pet}</TableCell>
                    <TableCell>{poster.scans}</TableCell>
                    <TableCell>
                      {poster.has_location && poster.latitude != null ? poster.latitude.toFixed(5) : '-'}
                    </TableCell>
                    <TableCell>
                      {poster.has_location && poster.longitude != null ? poster.longitude.toFixed(5) : '-'}
                    </TableCell>
                    <TableCell>{new Date(poster.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Map with posters and pets */}
          <Box sx={{ mt: 6 }}>
            {/* Pass both posters and pets as props */}
            <LeafletPostersMap posters={posters} pets={pets} centerCoords={centerCoords} />
          </Box>

          {/* Statistics */}
          <StatsCard totalPosters={totalPosters} postersCountByPet={postersCountByPet} />
        </>
      )}
    </Container>
  );
};

export default PostersList;
