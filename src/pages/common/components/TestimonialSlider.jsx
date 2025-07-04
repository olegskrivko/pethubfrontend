// import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
// import { Box, Container, Typography } from '@mui/material';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { Autoplay, Pagination } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import dogimg from '../../../assets/images/home/banner_dog.jpg';
// const testimonials = [
//   {
//     quote: 'Personally, I am always impressed by the intuitive usability of the tool.',
//     name: 'Nadja Möller',
//     role: 'Business Process Consultant, LEONI',
//   },
//   {
//     quote: 'PawClick helped me find my dog in just 48 hours. Amazing!',
//     name: 'Anna L.',
//     role: 'Pet Owner',
//   },
//   {
//     quote: 'I recommend this service to every shelter I work with.',
//     name: 'Tom S.',
//     role: 'Volunteer Coordinator',
//   },
// ];
// export default function TestimonialSlider({ dotsPosition = 'center' }) {
//   const paginationPosition = {
//     center: {
//       display: 'flex',
//       justifyContent: 'center',
//       position: 'absolute',
//       bottom: '16px',
//       left: 0,
//       right: 0,
//       zIndex: 2,
//     },
//     left: {
//       display: 'flex',
//       justifyContent: 'flex-start',
//       position: 'absolute',
//       bottom: '16px',
//       left: '24px',
//       zIndex: 2,
//     },
//   };
//   return (
//     <Box
//       sx={{
//         position: 'relative',
//         height: { xs: 350, md: 400 },
//         backgroundImage: `url(${dogimg})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <Box
//         sx={{
//           position: 'absolute',
//           inset: 0,
//           //   background: 'linear-gradient(to right, rgba(0,150,136,0.8), rgba(63,81,181,0.8))',
//           background: 'linear-gradient(to right, rgba(0,150,136,0.7), rgba(63,81,181,0.7))',
//           zIndex: 1,
//         }}
//       />
//       <Container
//         disableGutters
//         maxWidth="lg"
//         sx={{
//           px: { xs: 1, sm: 2 },
//           height: '100%',
//           position: 'relative',
//           zIndex: 2,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'flex-start',
//           color: '#fff',
//         }}
//       >
//         <Swiper
//           modules={[Pagination, Autoplay]}
//           pagination={{ clickable: true, el: '.custom-swiper-pagination' }}
//           autoplay={{ delay: 5000 }}
//           loop
//           style={{ width: '100%' }}
//         >
//           {testimonials.map((t, i) => (
//             <SwiperSlide key={i}>
//               <Box display="flex" alignItems="center" gap={4}>
//                 <Box
//                   sx={{
//                     position: 'relative',
//                     backgroundColor: '#fff',
//                     borderRadius: '16px',
//                     width: 60,
//                     height: 60,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <FormatQuoteIcon sx={{ fontSize: 36, color: '#00897B', opacity: 0.8 }} />
//                 </Box>
//                 <Box>
//                   <Typography variant="h5" fontStyle="italic" gutterBottom>
//                     {t.quote}
//                   </Typography>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {t.name}
//                   </Typography>
//                   <Typography variant="subtitle2">{t.role}</Typography>
//                 </Box>
//               </Box>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         <Box
//           mb={1}
//           className="custom-swiper-pagination"
//           sx={{
//             ...paginationPosition[dotsPosition],
//             '& .swiper-pagination-bullet': {
//               width: 14,
//               height: 14,
//               backgroundColor: '#fff',
//               opacity: 0.7,
//               marginRight: '8px',
//             },
//             '& .swiper-pagination-bullet:last-child': {
//               marginRight: 0,
//             },
//             '& .swiper-pagination-bullet-active': {
//               opacity: 1,
//               backgroundColor: '#fff',
//             },
//           }}
//         />
//       </Container>
//     </Box>
//   );
// }
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Box, Container, Typography } from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import dogimg from '../../../assets/images/home/banner_dog.jpg';

const testimonials = [
  {
    quote: 'Personīgi mani vienmēr pārsteidz šī rīka intuitīvā lietojamība.',
    name: 'Nadja Möller',
    role: 'Biznesa procesu konsultante, LEONI',
  },
  {
    quote: 'Pateicoties Lunori, savu suni atradu 48 stundu laikā. Neticami!',
    name: 'Anna L.',
    role: 'Mājdzīvnieka saimniece',
  },
  {
    quote:
      'Lunori karte palīdzēja mums ātri pamanīt, kur tika redzēts pazudušais suns. Tā ir milzīga palīdzība patversmēm, kas meklē mājdzīvniekus.',
    name: 'Tom S.',
    role: 'Mājdzīvnieka saimnieks',
  },
];

export default function TestimonialSlider({ dotsPosition = 'center' }) {
  const paginationPosition = {
    center: {
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      bottom: '16px',
      left: 0,
      right: 0,
      zIndex: 2,
    },
    left: {
      display: 'flex',
      justifyContent: 'flex-start',
      position: 'absolute',
      bottom: '16px',
      left: '24px',
      zIndex: 2,
    },
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 350, md: 400 },
        backgroundImage: `url(${dogimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,150,136,0.7), rgba(63,81,181,0.7))',
          zIndex: 1,
        }}
      />

      <Container
        disableGutters
        maxWidth="lg"
        sx={{
          px: { xs: 1, sm: 2 },
          height: '100%',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: '#fff',
        }}
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, el: '.custom-swiper-pagination' }}
          autoplay={{ delay: 5000 }}
          loop
          style={{ width: '100%' }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <Box display="flex" alignItems="center" gap={3}>
                <Box
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FormatQuoteIcon sx={{ fontSize: 36, color: '#00897B', opacity: 0.8 }} />
                </Box>

                <Box>
                  <Typography
                    component="p"
                    sx={{
                      fontStyle: 'italic',
                      fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                      lineHeight: 1.4,
                      mb: 1,
                    }}
                  >
                    {t.quote}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      textWrap: 'wrap',
                      fontWeight: 'bold',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    {t.name}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.95rem' } }}>{t.role}</Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <Box
          mb={1}
          className="custom-swiper-pagination"
          sx={{
            ...paginationPosition[dotsPosition],
            '& .swiper-pagination-bullet': {
              width: 14,
              height: 14,
              backgroundColor: '#fff',
              opacity: 0.7,
              marginRight: '8px',
            },
            '& .swiper-pagination-bullet:last-child': {
              marginRight: 0,
            },
            '& .swiper-pagination-bullet-active': {
              opacity: 1,
              backgroundColor: '#fff',
            },
          }}
        />
      </Container>
    </Box>
  );
}
