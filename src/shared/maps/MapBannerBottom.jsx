// // import React from 'react';
// // import mapimg from "../pages/images/map.png"

// // const MapBanner = () => {
// //   return (
// //     <div
// //       style={{
// //         position: 'relative',
// //         width: '100%',
// //         height: '400px',
// //         backgroundImage: `url(${mapimg})`, // Replace with your image path
// //         backgroundSize: 'cover',
// //         backgroundPosition: 'center',
// //         filter: 'grayscale(100%)',
// //         overflow: 'hidden',
// //       }}
// //     >
// //       {/* Bottom fade */}
// //       <div
// //         style={{
// //           position: 'absolute',
// //           bottom: 0,
// //           width: '100%',
// //           height: '50%',
// //           background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
// //         }}
// //       />

// //       {/* Text and CTA */}
// //       <div
// //         style={{
// //           position: 'absolute',
// //           top: '50%',
// //           left: '50%',
// //           transform: 'translate(-50%, -50%)',
// //           textAlign: 'center',
// //           color: '#fff',
// //           zIndex: 2,
// //         }}
// //       >
// //         <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
// //           Explore Nearby Pet Services
// //         </h1>
// //         <button
// //           style={{
// //             padding: '0.75rem 1.5rem',
// //             fontSize: '1rem',
// //             backgroundColor: '#0EB9F0',
// //             color: '#fff',
// //             border: 'none',
// //             borderRadius: '8px',
// //             cursor: 'pointer',
// //           }}
// //         >
// //           Find on Map
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MapBanner;
// import React from 'react';
// import mapimg from '../pages/images/new-york-street-map-bw.jpg';

// const MapBanner = () => {
//   return (
//     <div style={{ position: 'relative', width: '100%', height: '600px', overflow: 'hidden' }}>

//       {/* Grayscale image */}
//       <img
//         src={mapimg}
//         alt="Map"
//         style={{
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           transform: 'scale(1.1)',
//           filter: 'grayscale(100%)',
//         }}
//       />

//       {/* White gradient fade */}
//       <div
//         style={{
//           position: 'absolute',
//           bottom: 0,
//           left: 0,
//           width: '100%',
//           height: '60%',
//           background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
//           pointerEvents: 'none',
//           zIndex: 1,
//         }}
//       />

//       {/* CTA Text */}
//       <div
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//           zIndex: 2,
//           textAlign: 'center',
//           padding: '0 20px',
//         }}
//       >
//         <h2 style={{ color: '#16477c', fontSize: '2rem', margin: 0 }}>Atrodi tuvāko patversmi</h2>
//         <button
//           style={{
//             marginTop: '1rem',
//             backgroundColor: '#0EB9F0',
//             color: '#fff',
//             border: 'none',
//             padding: '10px 20px',
//             borderRadius: '6px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           Skatīt karti
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MapBanner;
import React from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
//import illustration from '../pages/images/navigation_cuate_blue.svg'; // replace with your own SVG
import illustration from '../pages/images/online_ads_animate.svg';
//import illustration from '../pages/images/navigation_cuate.svg';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';

{/* <a href="https://storyset.com/city">City illustrations by Storyset</a> */}
{/* <a href="https://storyset.com/city">City illustrations by Storyset</a> */}
const MapBanner = () => {
  const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
     const navigate = useNavigate();
  return (
    
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        // background: 'linear-gradient(145deg, #e3f2fd, #ffffff)',
         background: 'linear-gradient( #ffffff, #e3f2fd)',
        // padding: '60px 40px',
        minHeight: '500px',
        position: 'relative',
      }}
    >
        <Container component="main" maxWidth="lg"  style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      
        // padding: '60px 40px',
        // minHeight: '500px',
        // position: 'relative',
      }} sx={{ py: 6, 
      
      // paddingLeft: "0", 
      //  paddingRight: "0 !important"
      }}> 
        {/* RIGHT SIDE - SVG IMAGE */}
      <div
        style={{
          flex: '1 1 400px',
          maxWidth: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={illustration}
          alt="Illustration"
          style={{
            width: '100%',
            maxWidth: '400px',
            height: 'auto',
          }}
        />
      </div>
      {/* LEFT SIDE */}
      {/* <div
        style={{
          flex: '1 1 400px',
          maxWidth: '600px',
          paddingLeft: '40px',
          zIndex: 2,
        }}
      > */}
      <div
  style={{
    flex: '1 1 400px',
    maxWidth: '600px',
    paddingLeft: isSmallScreen ? '0' : '40px',
    zIndex: 2,
    textAlign: isSmallScreen ? 'center' : 'right', // 🔁 Text centered on small screens
    display: 'flex',
    flexDirection: 'column',
    alignItems: isSmallScreen ? 'center' : 'flex-end', // 🔁 Button alignment
  }}
>
        {/* <h2
          style={{
            color: '#0D47A1',
            fontSize: '2.5rem',
            fontWeight: 600,
            marginBottom: '1rem',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Atrodi tuvāko patversmi
        </h2> */}
           <h2
          style={{
            textAlign: "right",
            color: '#0D47A1',
            fontSize: '2.5rem',
            fontWeight: 600,
            marginBottom: '1rem',
            // fontFamily: "'Inter', sans-serif",
                    fontFamily: "Inter', sans-serif",
                          background: "linear-gradient(60deg, #16477c 0%, #00b5ad 100%)",
              WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
          }}
        >
          Mājdzīvnieku aprūpes pakalpojumi
        </h2>
        {/* <p
          style={{
            color: '#616f7d',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            marginBottom: '2rem',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Mēs palīdzam tev ātri un ērti atrast dzīvnieku patversmes tuvākajā apkaimē. Apskati karti vai iesniedz ziņojumu par pazudušu mājdzīvnieku.
        </p> */}
         <p
          style={{
               textAlign: "right",
            color: '#616f7d',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            marginBottom: '2rem',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Atrodi uzticamus pakalpojumu sniedzējus – no suņu pastaigām līdz friziera apmeklējumam. Viss vienuviet, lai tavs mīlulis būtu vesels, kopts un laimīgs.
        </p>
        <div style={{display: "flex", justifyContent: 'right'}}>
        <button
          style={{
           
            padding: '12px 28px',
            fontSize: '1rem',
            fontWeight: 'bold',
            // backgroundColor: '#0EB9F0',
            background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)",
            color: '#fff',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            
            
          }}
           onClick={() => navigate('/services')}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#0a98c2';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#0EB9F0';
          }}
        >
          Apskatīt pakalpojumus
        </button>
        </div>
      </div>

    
      </Container>
    </div>
  );
};

export default MapBanner;
