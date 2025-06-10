// import React from 'react';
// import { Box, Grid, Typography, Card, CardContent } from '@mui/material';


// // const [statistics, setStatistics] = useState({
// //     lostPets: 0,
// //     foundPets: 0,
// //     reunitedPets: 0,
// //   });
  
// //   useEffect(() => {
// //     async function fetchData() {
// //       const response = await axios.get('/api/statistics');
// //       setStatistics(response.data);
// //     }
// //     fetchData();
// //   }, []);
  
// //   const data = [
// //     { label: 'Total Lost Pets', value: statistics.lostPets, color: '#FF7043' },
// //     { label: 'Total Found Pets', value: statistics.foundPets, color: '#81C784' },
// //     { label: 'Pets Reunited', value: statistics.reunitedPets, color: '#64B5F6' },
// //   ];
  

// const Statistics = () => {
//   const data = [
//     { label: 'Total Lost Pets', value: 125, color: '#FF7043' },  // Example count and color
//     { label: 'Total Found Pets', value: 75, color: '#81C784' },  // Example count and color
//     { label: 'Pets Reunited', value: 50, color: '#64B5F6' },     // Example count and color
//   ];

//   return (
//     <Box sx={{ my: 4 }}>
//       <Grid container spacing={3} justifyContent="center">
//         {data.map((item, index) => (
//           <Grid item xs={12} sm={4} key={index}>
//             <Card sx={{ textAlign: 'center', backgroundColor: item.color }}>
//               <CardContent>
//                 <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
//                   {item.value}
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: 'white' }}>
//                   {item.label}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Statistics;
// import React, { useState } from 'react';
// import CountUp from 'react-countup';
// import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
// import { useInView } from 'react-intersection-observer';

// const Statistics = () => {
//   const [startCount, setStartCount] = useState(false);

//   const { ref, inView } = useInView({
//     triggerOnce: true,  // Trigger once when the component comes into view
//     onChange: (inView) => {
//       if (inView) {
//         setStartCount(true); // Start counting when the component is in view
//       }
//     },
//   });

//   const data = [
//     // { label: 'Total Lost Pets', value: 125, color: '#FF7043' },  
//     // { label: 'Total Found Pets', value: 75, color: '#81C784' },  
//     // { label: 'Pets Reunited', value: 50, color: '#64B5F6' },     
//     { label: 'Kopējais pazudušo mājdzīvnieku skaits', value: 125, color: '#FF7043' },  
//     { label: 'Kopējais atrasto mājdzīvnieku skaits', value: 75, color: '#81C784' },  
//     { label: 'Atgrieztie mājdzīvnieki', value: 50, color: '#64B5F6' },     
//   ];

//   return (
//     <Box sx={{ my: 4 }} ref={ref}>
//           {/* Title above the counter */}
//       <Typography variant="h5" sx={{ textAlign: 'center', mb: 4 }}>
//         Pazudušo un atrasto mājdzīvnieku statistika
//       </Typography>
//       <Grid container spacing={3} justifyContent="center">
//         {data.map((item, index) => (
//           <Grid item xs={12} sm={4} key={index}>
//             <Card sx={{ textAlign: 'center', backgroundColor: item.color }}>
//               <CardContent>
//                 <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
//                   {startCount ? (
//                     <CountUp end={item.value} duration={2} />
//                   ) : (
//                     0
//                   )}
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: 'white' }}>
//                   {item.label}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Statistics;
// import React, { useEffect, useState } from 'react';
// import CountUp from 'react-countup';
// import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
// import { useInView } from 'react-intersection-observer';
// import axios from 'axios';
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const Statistics = () => {
//   const [startCount, setStartCount] = useState(false);
//   const [stats, setStats] = useState({ lost: 0, found: 0, seen: 0 });

//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     onChange: (inView) => {
//       if (inView) {
//         setStartCount(true);
//       }
//     },
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/pets/status-counts/`);
//         setStats(response.data);
//       } catch (error) {
//         console.error('Failed to fetch stats:', error);
//       }
//     };

//     fetchStats();
//   }, []);

//   const data = [
//     { label: 'Kopējais pazudušo mājdzīvnieku skaits', value: stats.lost, color: '#FF7043' },
//     { label: 'Kopējais atrasto mājdzīvnieku skaits', value: stats.found, color: '#81C784' },
//     { label: 'Redzēto mājdzīvnieku skaits', value: stats.seen, color: '#64B5F6' },
//   ];

//   return (
//     <Box sx={{ my: 4 }} ref={ref}>
//       {/* <Typography variant="h5" sx={{ textAlign: 'center', mb: 4 }}>
//         Pazudušo un atrasto mājdzīvnieku statistika
//       </Typography> */}
//             <Grid container spacing={3} sx={{ my: 4 }}>
//               <Grid item xs={12} textAlign="center">
//                 <Typography
//                   variant="h2"
//                   style={{
//                     fontSize: '1.6rem',
//                     fontWeight: '500',
//                     color: "#5B5B5B",
//                     // marginTop: '1rem',
//                   }}
//                 >
//                  Pazudušo un atrasto mājdzīvnieku statistika
//                 </Typography>
//               </Grid>
//             </Grid>
//       <Grid container spacing={3} justifyContent="center">
//         {/* {data.map((item, index) => (
//           <Grid item xs={12} sm={4} key={index}>
//             <Card sx={{ textAlign: 'center', backgroundColor: item.color }}>
//               <CardContent>
//                 <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
//                   {startCount ? <CountUp end={item.value} duration={2} /> : 0}
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: 'white' }}>
//                   {item.label}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))} */}
//         {data.map((item, index) => (
//   <Grid item xs={12} sm={4} key={index}>
//     <Card
//       sx={{
//         textAlign: 'center',
//         backgroundColor: item.color,
//         color: 'white',
//         clipPath: 'polygon(0 0, 100% 10%, 90% 100%, 10% 90%)',
//         transition: 'transform 0.3s ease-in-out',
//         '&:hover': {
//           transform: 'scale(1.05)',
//         },
//       }}
//     >
//       <CardContent>
//         <Typography variant="h4" sx={{ fontWeight: 600 }}>
//           {startCount ? <CountUp end={item.value} duration={2} /> : 0}
//         </Typography>
//         <Typography variant="body1">
//           {item.label}
//         </Typography>
//       </CardContent>
//     </Card>
//   </Grid>
// ))}

//       </Grid>
//     </Box>
//   );
// };

// export default Statistics;

// import React, { useState } from 'react';
// import CountUp from 'react-countup';
// import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
// import { useInView } from 'react-intersection-observer';

// const Statistics = () => {
//   const [startCount, setStartCount] = useState(false);

//   const { ref, inView } = useInView({
//     triggerOnce: true,  // Trigger once when the component comes into view
//     onChange: (inView) => {
//       if (inView) {
//         setStartCount(true); // Start counting when the component is in view
//       }
//     },
//   });

//   const data = [
//     { label: 'Total Lost Pets', value: 125, color: '#FF7043' },  
//     { label: 'Total Found Pets', value: 75, color: '#81C784' },  
//     { label: 'Pets Reunited', value: 50, color: '#64B5F6' },     
//   ];

//   return (
//     <Box sx={{ my: 4 }} ref={ref}>
//       <Grid container spacing={3} justifyContent="center">
//         {data.map((item, index) => (
//           <Grid item xs={12} sm={4} key={index}>
//             <Card 
//               sx={{ 
//                 textAlign: 'center', 
//                 backgroundColor: item.color,
//                 borderRadius: '50%', // Make the card circular
//                 height: 150,  // Fixed height for round shape
//                 width: 150,   // Fixed width to make it a perfect circle
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 justifyContent: 'center', 
//                 boxShadow: 3 // Optional: add a shadow for more emphasis
//               }}
//             >
//               <CardContent>
//                 <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
//                   {startCount ? (
//                     <CountUp end={item.value} duration={2} />
//                   ) : (
//                     0
//                   )}
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: 'white', fontSize: '0.8rem' }}>
//                   {item.label}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Statistics;
// import React, { useEffect, useState } from 'react';
// import CountUp from 'react-countup';
// import { Box, Grid, Typography } from '@mui/material';
// import { useInView } from 'react-intersection-observer';
// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const Statistics = () => {
//   const [startCount, setStartCount] = useState(false);
//   const [stats, setStats] = useState({ lost: 0, found: 0, seen: 0 });

//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     onChange: (inView) => {
//       if (inView) setStartCount(true);
//     },
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/pets/status-counts/`);
//         setStats(response.data);
//       } catch (error) {
//         console.error('Failed to fetch stats:', error);
//       }
//     };
//     fetchStats();
//   }, []);

//   const data = [
//     {
//       label: 'Kopējais pazudušo mājdzīvnieku skaits',
//       value: stats.lost,
//       color: '#FF7043',
//       blobPath:
//         'M40.2,-62.5C52.3,-54.1,63.6,-43.3,70.7,-30.3C77.9,-17.4,80.9,-2.3,77.8,11.9C74.7,26,65.5,39.3,53.8,50.5C42,61.6,27.7,70.6,12.3,73.2C-3.1,75.9,-19.6,72.2,-33.3,64.4C-46.9,56.6,-57.7,44.6,-64.1,30.8C-70.5,16.9,-72.5,1.3,-69.4,-13.6C-66.4,-28.4,-58.3,-42.4,-46.5,-52.9C-34.7,-63.4,-19.4,-70.4,-3.2,-66.8C13,-63.1,26.1,-48.9,40.2,-62.5Z',
//     },
//     {
//       label: 'Kopējais atrasto mājdzīvnieku skaits',
//       value: stats.found,
//       color: '#81C784',
//       blobPath:
//         'M58.1,-50.7C69.2,-34.3,69.5,-10.5,64.1,12.5C58.6,35.4,47.4,57.4,29.9,65.6C12.5,73.9,-11.2,68.4,-30.3,56.9C-49.4,45.3,-63.9,27.8,-67.5,7.3C-71.1,-13.1,-63.9,-36.7,-47.9,-52.2C-31.9,-67.6,-7.1,-74.9,14.3,-74C35.7,-73.2,53.1,-64.3,58.1,-50.7Z',
//     },
//     {
//       label: 'Redzēto mājdzīvnieku skaits',
//       value: stats.seen,
//       color: '#64B5F6',
//       blobPath:
//         'M45.7,-60.4C58.4,-49.3,67.8,-33.4,69.5,-17.3C71.3,-1.2,65.4,15.2,56.8,28.8C48.2,42.4,36.8,53.2,23.5,58.2C10.3,63.1,-5,62.1,-20.6,58.6C-36.1,55,-52,49,-60.8,37.2C-69.5,25.5,-71,8,-64.5,-7.1C-58,-22.2,-43.4,-34.9,-29.8,-46C-16.1,-57,-3.6,-66.6,11.3,-71.5C26.3,-76.5,52.9,-66.9,45.7,-60.4Z',
//     },
//   ];

//   return (
//     <Box sx={{ my: 6 }} ref={ref}>
//       <Grid container spacing={3} sx={{ my: 4 }}>
//         <Grid item xs={12} textAlign="center">
//           <Typography variant="h2" sx={{ fontSize: '1.6rem', fontWeight: 500, color: '#5B5B5B' }}>
//             Pazudušo un atrasto mājdzīvnieku statistika
//           </Typography>
//         </Grid>
//       </Grid>

//       <Grid container spacing={4} justifyContent="center">
//         {data.map((item, index) => (
//           <Grid item xs={12} sm={4} key={index}>
//             <Box
//               sx={{
//                 position: 'relative',
//                 width: '100%',
//                 paddingTop: '100%',
//               }}
//             >
//               <svg
//                 viewBox="0 0 200 200"
//                 xmlns="http://www.w3.org/2000/svg"
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   width: '100%',
//                   height: '100%',
//                 }}
//               >
//                 <path
//                   fill={item.color}
//                   d={item.blobPath}
//                   transform="translate(100 100)"
//                 />
//               </svg>
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   width: '100%',
//                   height: '100%',
//                   zIndex: 1,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   color: 'white',
//                   textAlign: 'center',
//                   px: 2,
//                 }}
//               >
//                 <Typography variant="h4" sx={{ fontWeight: 600 }}>
//                   {startCount ? <CountUp end={item.value} duration={2} /> : 0}
//                 </Typography>
//                 <Typography variant="body1">{item.label}</Typography>
//               </Box>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Statistics;
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { Box, Grid, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Statistics = () => {
  const [startCount, setStartCount] = useState(false);
  const [stats, setStats] = useState({ lost: 0, found: 0, seen: 0 });

  const { ref, inView } = useInView({
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        setStartCount(true);
      }
    },
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/pets/status-counts/`);
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  const data = [
    { label: 'Kopējais pazudušo mājdzīvnieku skaits', value: stats.lost, color: '#5B9BD5' },
    { label: 'Kopējais atrasto mājdzīvnieku skaits', value: stats.found, color: '#5B9BD5' },
    { label: 'Redzēto mājdzīvnieku skaits', value: stats.seen, color: '#5B9BD5' },
  ];

  return (
    <Box sx={{ my: 4 }} ref={ref}>
      {/* Title above the counter */}
      <Grid container spacing={3} sx={{ my: 4 }}>
        <Grid item xs={12} textAlign="center">
          <Typography
            variant="h2"
            style={{
              fontSize: '1.6rem',
              fontWeight: '500',
              color: "#5B5B5B",
            }}
          >
            Pazudušo un atrasto mājdzīvnieku pārskats
          </Typography>
        </Grid>
      </Grid>

      {/* Display circles with the data */}
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {data.map((item, index) => (
          <Grid item xs={12} sm={4} key={index} display="flex" justifyContent="center">
            <Box
              sx={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                backgroundColor: item.color,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '1rem',
                margin: 'auto',  // Ensures even spacing between circles
              }}
            >
              <div>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                  {startCount ? <CountUp end={item.value} duration={2} /> : 0}
                </Typography>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  {item.label}
                </Typography>
              </div>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Statistics;
