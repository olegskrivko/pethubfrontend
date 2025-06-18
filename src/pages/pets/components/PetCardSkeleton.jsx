// // components/PetCardSkeleton.jsx
// import React from 'react';
// import { Box, Skeleton } from '@mui/material';
// const PetCardSkeleton = () => {
//   return (
//     <Box>
//       <Skeleton
//         variant="rectangular"
//         // height={200}
//         sx={{
//           height: {
//             xs: 350, // phones / extra-small
//             sm: 200, // tablets
//             md: 180, // medium screens
//             lg: 200,
//           },
//           borderRadius: 1,
//         }}
//       />
//       {/* Add this section below for circle + line in a row */}
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, px: 1 }}>
//         <Skeleton variant="circular" width={40} height={40} />
//         <Skeleton height={30} width="60%" />
//       </Box>
//       {/* <Skeleton height={30} width="80%" sx={{ mt: 1 }} />
//       <Skeleton height={20} width="60%" /> */}
//     </Box>
//   );
// };
// export default PetCardSkeleton;
import React from 'react';

import { Box, Skeleton } from '@mui/material';

const PetCardSkeleton = () => {
  return (
    <Box>
      {/* Main image placeholder with consistent 4:3 aspect ratio */}
      <Box sx={{ position: 'relative', width: '100%', aspectRatio: '4 / 3' }}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: 1,
          }}
        />
      </Box>

      {/* Circle + line in one row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, px: 1 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton height={30} width="60%" />
      </Box>
    </Box>
  );
};

export default PetCardSkeleton;
