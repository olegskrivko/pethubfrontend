// // import React, { useState } from 'react';
// // import {
// //   Container, Typography, Box, Card, CardContent, Grid, Button, LinearProgress
// // } from '@mui/material';
// // import axios from 'axios';

// // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // const questions = [
// //   {
// //     question: "Cik daudz vietas tev ir mājdzīvniekam?",
// //     options: [
// //       { answer: "Mazs dzīvoklis", scores: { cat: 2, dog: -1 } },
// //       { answer: "Vidēja izmēra māja", scores: { cat: 1, dog: 1 } },
// //       { answer: "Liela māja ar pagalmu", scores: { dog: 2, cat: 0 } },
// //     ],
// //   },
// //   {
// //     question: "Cik aktīvs tu esi ikdienā?",
// //     options: [
// //       { answer: "Ļoti aktīvs, patīk sports", scores: { dog: 2, cat: -1 } },
// //       { answer: "Vidēji aktīvs", scores: { dog: 1, cat: 1 } },
// //       { answer: "Ne pārāk aktīvs, patīk mierīga dzīve", scores: { cat: 2, dog: -1 } },
// //     ],
// //   },
// //   {
// //     question: "Cik daudz laika vari veltīt mājdzīvnieka aprūpei?",
// //     options: [
// //       { answer: "Ļoti daudz brīvā laika", scores: { dog: 2, cat: 1 } },
// //       { answer: "Dažreiz brīvs laiks", scores: { cat: 2, dog: 0 } },
// //       { answer: "Ļoti maz laika", scores: { none: 2, dog: -1, cat: -1 } },
// //     ],
// //   },
// //   {
// //     question: "Vai tev mājās ir bērni?",
// //     options: [
// //       { answer: "Jā, mazi bērni", scores: { dog: 2, cat: -1 } },
// //       { answer: "Jā, vecāki bērni", scores: { dog: 1, cat: 1 } },
// //       { answer: "Nav bērnu", scores: { cat: 2, dog: 0 } },
// //     ],
// //   },
// //   {
// //     question: "Cik bieži esi prom no mājām?",
// //     options: [
// //       { answer: "Reti, galvenokārt mājās", scores: { dog: 2, cat: 1 } },
// //       { answer: "Dažreiz", scores: { cat: 2, dog: 0 } },
// //       { answer: "Bieži prom vai ceļoju", scores: { none: 2, dog: -1, cat: -1 } },
// //     ],
// //   },
// //   {
// //     question: "Kāda vide tev patīk mājās?",
// //     options: [
// //       { answer: "Dzīva, trokšņaina, aktīva", scores: { dog: 2, cat: -1 } },
// //       { answer: "Līdzsvarota", scores: { dog: 1, cat: 1 } },
// //       { answer: "Klusums un miers", scores: { cat: 2, dog: 0 } },
// //     ],
// //   },
// //   {
// //     question: "Vai tev vai kādam mājiniekam ir alerģijas?",
// //     options: [
// //       { answer: "Jā, jutība pret spalvām", scores: { none: 2, cat: -1, dog: -1 } },
// //       { answer: "Nē, nav alerģiju", scores: { dog: 1, cat: 1 } },
// //     ],
// //   },
// //   {
// //     question: "Cik neatkarīgu mājdzīvnieku tu vēlies?",
// //     options: [
// //       { answer: "Ļoti neatkarīgu", scores: { cat: 2, dog: -1 } },
// //       { answer: "Līdzsvarotu", scores: { dog: 1, cat: 1 } },
// //       { answer: "Tādu, kurš prasa uzmanību", scores: { dog: 2, cat: 0 } },
// //     ],
// //   },
// //   {
// //     question: "Kāds ir tavs ikmēneša budžets mājdzīvniekam?",
// //     options: [
// //       { answer: "Zems (līdz €50)", scores: { cat: 2, dog: -1 } },
// //       { answer: "Vidējs (€50–100)", scores: { dog: 1, cat: 1 } },
// //       { answer: "Augsts (vairāk nekā €100)", scores: { dog: 2, cat: 1 } },
// //     ],
// //   },
// // ];

// // const PetQuiz = () => {
// //   const [currentQuestion, setCurrentQuestion] = useState(0);
// //   const [selectedAnswers, setSelectedAnswers] = useState([]);
// //   const [aiRecommendation, setAiRecommendation] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const handleAnswer = (selectedOption) => {
// //     setSelectedAnswers([...selectedAnswers, selectedOption.answer]);
// //     if (currentQuestion < questions.length - 1) {
// //       setCurrentQuestion(currentQuestion + 1);
// //     } else {
// //       sendAnswersToAPI();
// //     }
// //   };

// //   const sendAnswersToAPI = async () => {
// //     // const token = localStorage.getItem('token');
// //     const accessToken = localStorage.getItem('access_token');
// //    // console.log('Token:', token); // Debug log

// //     if (!accessToken) {
// //       setError("Please log in to get pet recommendations");
// //       return;
// //     }

// //     setIsLoading(true);
// //     setError(null);

// //     try {
// //       const response = await axios.post(
// //         `${API_BASE_URL}/api/chatbot/pet-recommendation/`,
// //         { answers: selectedAnswers },
// //         {
// //           headers: {
// //             'Authorization': `Bearer ${accessToken}`,
// //             'Content-Type': 'application/json'
// //           }
// //         }
// //       );
// //       setAiRecommendation(response.data.details);
// //     } catch (error) {
// //       console.error("Error details:", error.response?.data);
// //       if (error.response?.status === 401) {
// //         setError("Your session has expired. Please log in again.");
// //       } else {
// //         setError("Failed to get recommendation. Please try again.");
// //       }
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const resetQuiz = () => {
// //     setSelectedAnswers([]);
// //     setCurrentQuestion(0);
// //     setAiRecommendation(null);
// //     setError(null);
// //   };

// //   if (isLoading) {
// //     return (
// //       <Container component="main" maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
// //         <Typography variant="h6">Getting your pet recommendation...</Typography>
// //       </Container>
// //     );
// //   }

// //   return (
// //     <Container component="main" maxWidth="lg">
// //       <Typography variant="h4" align="center" sx={{ mb: 5, fontWeight: 800 }}>
// //         Dzīvnieka izvēles tests
// //       </Typography>
      
// //       {error && (
// //         <Box sx={{ mb: 2, p: 2, bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 1 }}>
// //           {error}
// //         </Box>
// //       )}
      
// //       {!aiRecommendation ? (
// //         <Box>
// //           <LinearProgress 
// //             variant="determinate" 
// //             value={(currentQuestion / questions.length) * 100} 
// //             sx={{ mb: 4 }} 
// //           />
// //           <Typography variant="h4" align="center" sx={{ mt: 8, mb: 4 }}>
// //             {questions[currentQuestion].question}
// //           </Typography>
// //           <Grid container spacing={2} justifyContent="center">
// //             {questions[currentQuestion].options.map((option, index) => (
// //               <Grid item key={index} xs={12} sm={6} md={4}>
// //                 <Card 
// //                   onClick={() => handleAnswer(option)}
// //                   onKeyPress={(e) => e.key === 'Enter' && handleAnswer(option)}
// //                   role="button"
// //                   tabIndex={0}
// //                   sx={{ 
// //                     cursor: 'pointer', 
// //                     height: 140, 
// //                     display: 'flex', 
// //                     alignItems: 'center', 
// //                     justifyContent: 'center',
// //                     '&:hover': { boxShadow: 6 },
// //                     '&:focus': { outline: 'none', boxShadow: 6 }
// //                   }}
// //                 >
// //                   <CardContent>
// //                     <Typography variant="h5" align="center">
// //                       {option.answer}
// //                     </Typography>
// //                   </CardContent>
// //                 </Card>
// //               </Grid>
// //             ))}
// //           </Grid>
// //         </Box>
// //       ) : (
// //         <Box textAlign="center">
// //           <Typography variant="h4" gutterBottom>
// //             AI Ieteikums
// //           </Typography>
// //           <Typography variant="body1">
// //             {aiRecommendation}
// //           </Typography>
// //           <Button 
// //             onClick={resetQuiz} 
// //             variant="contained" 
// //             sx={{ mt: 4 }}
// //           >
// //             Mēģināt no jauna
// //           </Button>
// //         </Box>
// //       )}
// //     </Container>
// //   );
// // };

// // export default PetQuiz;
// import React, { useState } from 'react';
// import {
//   Container, Typography, Box, Card, CardContent, Grid, Button, LinearProgress,
//   Paper, Divider
// } from '@mui/material';
// import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const questions = [
//   {
//     question: "Cik daudz vietas tev ir mājdzīvniekam?",
//     options: [
//       { answer: "Mazs dzīvoklis", scores: { cat: 2, dog: -1 } },
//       { answer: "Vidēja izmēra māja", scores: { cat: 1, dog: 1 } },
//       { answer: "Liela māja ar pagalmu", scores: { dog: 2, cat: 0 } },
//     ],
//   },
//   {
//     question: "Cik aktīvs tu esi ikdienā?",
//     options: [
//       { answer: "Ļoti aktīvs, patīk sports", scores: { dog: 2, cat: -1 } },
//       { answer: "Vidēji aktīvs", scores: { dog: 1, cat: 1 } },
//       { answer: "Ne pārāk aktīvs, patīk mierīga dzīve", scores: { cat: 2, dog: -1 } },
//     ],
//   },
//   {
//     question: "Cik daudz laika vari veltīt mājdzīvnieka aprūpei?",
//     options: [
//       { answer: "Ļoti daudz brīvā laika", scores: { dog: 2, cat: 1 } },
//       { answer: "Dažreiz brīvs laiks", scores: { cat: 2, dog: 0 } },
//       { answer: "Ļoti maz laika", scores: { none: 2, dog: -1, cat: -1 } },
//     ],
//   },
//   {
//     question: "Vai tev mājās ir bērni?",
//     options: [
//       { answer: "Jā, mazi bērni", scores: { dog: 2, cat: -1 } },
//       { answer: "Jā, vecāki bērni", scores: { dog: 1, cat: 1 } },
//       { answer: "Nav bērnu", scores: { cat: 2, dog: 0 } },
//     ],
//   },
//   {
//     question: "Cik bieži esi prom no mājām?",
//     options: [
//       { answer: "Reti, galvenokārt mājās", scores: { dog: 2, cat: 1 } },
//       { answer: "Dažreiz", scores: { cat: 2, dog: 0 } },
//       { answer: "Bieži prom vai ceļoju", scores: { none: 2, dog: -1, cat: -1 } },
//     ],
//   },
//   {
//     question: "Kāda vide tev patīk mājās?",
//     options: [
//       { answer: "Dzīva, trokšņaina, aktīva", scores: { dog: 2, cat: -1 } },
//       { answer: "Līdzsvarota", scores: { dog: 1, cat: 1 } },
//       { answer: "Klusums un miers", scores: { cat: 2, dog: 0 } },
//     ],
//   },
//   {
//     question: "Vai tev vai kādam mājiniekam ir alerģijas?",
//     options: [
//       { answer: "Jā, jutība pret spalvām", scores: { none: 2, cat: -1, dog: -1 } },
//       { answer: "Nē, nav alerģiju", scores: { dog: 1, cat: 1 } },
//     ],
//   },
//   {
//     question: "Cik neatkarīgu mājdzīvnieku tu vēlies?",
//     options: [
//       { answer: "Ļoti neatkarīgu", scores: { cat: 2, dog: -1 } },
//       { answer: "Līdzsvarotu", scores: { dog: 1, cat: 1 } },
//       { answer: "Tādu, kurš prasa uzmanību", scores: { dog: 2, cat: 0 } },
//     ],
//   },
//   {
//     question: "Kāds ir tavs ikmēneša budžets mājdzīvniekam?",
//     options: [
//       { answer: "Zems (līdz €50)", scores: { cat: 2, dog: -1 } },
//       { answer: "Vidējs (€50–100)", scores: { dog: 1, cat: 1 } },
//       { answer: "Augsts (vairāk nekā €100)", scores: { dog: 2, cat: 1 } },
//     ],
//   },
// ];
// const PetQuiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [aiRecommendation, setAiRecommendation] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleAnswer = (selectedOption) => {
//     console.log('Selected answer:', selectedOption.answer);
//     setSelectedAnswers([...selectedAnswers, selectedOption.answer]);
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       console.log('All questions answered, sending to API...');
//       console.log('Final answers:', selectedAnswers);
//       sendAnswersToAPI();
//     }
//   };

//   const formatRecommendation = (data) => {
//     if (!data || !data.pet) return null;
    
//     const { pet } = data;
//     return {
//       type: pet.type,
//       description: pet.description,
//       characteristics: {
//         size: pet.characteristics.size,
//         energyLevel: pet.characteristics['energy level'],
//         socialBehavior: pet.characteristics['social behavior']
//       },
//       likes: pet.likes.general,
//       dislikes: pet.dislikes.general,
//       whyThisPet: pet.whyThisPet
//     };
//   };

//   const sendAnswersToAPI = async () => {
//     console.log('Starting API call...');
//     const token = localStorage.getItem('access_token');
//     console.log('Token:', token);

//     if (!token) {
//       console.log('No token found');
//       setError("Please log in to get pet recommendations");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       console.log('Making API request to:', `${API_BASE_URL}/api/chatbot/pet-recommendation/`);
//       console.log('Request payload:', { answers: selectedAnswers });
      
//       const response = await axios.post(
//         `${API_BASE_URL}/api/chatbot/pet-recommendation/`,
//         { answers: selectedAnswers },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );
      
//       console.log('=== Debug Frontend Response ===');
//       console.log('Full response:', response);
//       console.log('Response data:', response.data);
//       console.log('Response data type:', typeof response.data);
//       console.log('Response data keys:', Object.keys(response.data));
//       console.log('Pet data:', response.data.pet);
//       console.log('=============================');

//       if (!response.data || !response.data.pet) {
//         console.error('Invalid response format:', response.data);
//         setError("Received invalid response from server");
//         return;
//       }

//       setAiRecommendation(response.data.pet);
//       console.log('AI recommendation set to state:', response.data.pet);
//     } catch (error) {
//       console.error("=== Debug Error ===");
//       console.error("Error object:", error);
//       console.error("Error response:", error.response);
//       console.error("Error message:", error.message);
//       console.error("Error details:", error.response?.data);
//       console.error("===================");
      
//       if (error.response?.status === 401) {
//         setError("Your session has expired. Please log in again.");
//       } else {
//         setError("Failed to get recommendation. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetQuiz = () => {
//     setSelectedAnswers([]);
//     setCurrentQuestion(0);
//     setAiRecommendation(null);
//     setError(null);
//   };

//   if (isLoading) {
//     return (
//       <Container component="main" maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
//         <Typography variant="h6">Getting your pet recommendation...</Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container component="main" maxWidth="lg">
//       <Typography variant="h4" align="center" sx={{ mb: 5, fontWeight: 800 }}>
//         Dzīvnieka izvēles tests
//       </Typography>
      
//       {error && (
//         <Box sx={{ mb: 2, p: 2, bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 1 }}>
//           {error}
//         </Box>
//       )}
      
//       {!aiRecommendation ? (
//         <Box>
//           <LinearProgress 
//             variant="determinate" 
//             value={(currentQuestion / questions.length) * 100} 
//             sx={{ mb: 4 }} 
//           />
//           <Typography variant="h4" align="center" sx={{ mt: 8, mb: 4 }}>
//             {questions[currentQuestion].question}
//           </Typography>
//           <Grid container spacing={2} justifyContent="center">
//             {questions[currentQuestion].options.map((option, index) => (
//               <Grid item key={index} xs={12} sm={6} md={4}>
//                 <Card 
//                   onClick={() => handleAnswer(option)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleAnswer(option)}
//                   role="button"
//                   tabIndex={0}
//                   sx={{ 
//                     cursor: 'pointer', 
//                     height: 140, 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     justifyContent: 'center',
//                     '&:hover': { boxShadow: 6 },
//                     '&:focus': { outline: 'none', boxShadow: 6 }
//                   }}
//                 >
//                   <CardContent>
//                     <Typography variant="h5" align="center">
//                       {option.answer}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       ) : (
//         <Box>
//           <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
//             <Typography variant="h4" gutterBottom align="center" sx={{ color: 'primary.main' }}>
//               {aiRecommendation.type.charAt(0).toUpperCase() + aiRecommendation.type.slice(1)}
//             </Typography>
            
//             <Typography variant="body1" paragraph sx={{ mt: 3 }}>
//               {aiRecommendation.description}
//             </Typography>

//             <Divider sx={{ my: 3 }} />

//             <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
//               Characteristics
//             </Typography>
//             <Grid container spacing={2} sx={{ mb: 3 }}>
//               <Grid item xs={12} md={4}>
//                 <Typography variant="subtitle1" color="text.secondary">Size</Typography>
//                 <Typography variant="body1">{aiRecommendation.characteristics.size}</Typography>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Typography variant="subtitle1" color="text.secondary">Energy Level</Typography>
//                 <Typography variant="body1">{aiRecommendation.characteristics.energyLevel}</Typography>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Typography variant="subtitle1" color="text.secondary">Social Behavior</Typography>
//                 <Typography variant="body1">{aiRecommendation.characteristics.socialBehavior}</Typography>
//               </Grid>
//             </Grid>

//             <Divider sx={{ my: 3 }} />

//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
//                   Likes
//                 </Typography>
//                 <Typography variant="body1">{aiRecommendation.likes}</Typography>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
//                   Dislikes
//                 </Typography>
//                 <Typography variant="body1">{aiRecommendation.dislikes}</Typography>
//               </Grid>
//             </Grid>

//             <Divider sx={{ my: 3 }} />

//             <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
//               Why This Pet?
//             </Typography>
//             <Typography variant="body1" paragraph>
//               {aiRecommendation.whyThisPet}
//             </Typography>

//             <Box sx={{ mt: 4, textAlign: 'center' }}>
//               <Button 
//                 onClick={resetQuiz} 
//                 variant="contained" 
//                 size="large"
//                 sx={{ 
//                   px: 4,
//                   background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)"
//                 }}
//               >
//                 Try Again
//               </Button>
//             </Box>
//           </Paper>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default PetQuiz; 

import React, { useState } from 'react';
import {
  Container, Typography, Box, Card, CardContent, Grid, Button, LinearProgress,
  Paper, Divider
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets'; // You can change this to any icon you like

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const questions = [
  {
    question: "Cik daudz vietas tev ir mājdzīvniekam?",
    options: [
      { answer: "Mazs dzīvoklis", scores: { cat: 2, dog: -1 } },
      { answer: "Vidēja izmēra māja", scores: { cat: 1, dog: 1 } },
      { answer: "Liela māja ar pagalmu", scores: { dog: 2, cat: 0 } },
    ],
  },
  {
    question: "Cik aktīvs tu esi ikdienā?",
    options: [
      { answer: "Ļoti aktīvs, patīk sports", scores: { dog: 2, cat: -1 } },
      { answer: "Vidēji aktīvs", scores: { dog: 1, cat: 1 } },
      { answer: "Ne pārāk aktīvs, patīk mierīga dzīve", scores: { cat: 2, dog: -1 } },
    ],
  },
  {
    question: "Cik daudz laika vari veltīt mājdzīvnieka aprūpei?",
    options: [
      { answer: "Ļoti daudz brīvā laika", scores: { dog: 2, cat: 1 } },
      { answer: "Dažreiz brīvs laiks", scores: { cat: 2, dog: 0 } },
      { answer: "Ļoti maz laika", scores: { none: 2, dog: -1, cat: -1 } },
    ],
  },
  {
    question: "Vai tev mājās ir bērni?",
    options: [
      { answer: "Jā, mazi bērni", scores: { dog: 2, cat: -1 } },
      { answer: "Jā, vecāki bērni", scores: { dog: 1, cat: 1 } },
      { answer: "Nav bērnu", scores: { cat: 2, dog: 0 } },
    ],
  },
  {
    question: "Cik bieži esi prom no mājām?",
    options: [
      { answer: "Reti, galvenokārt mājās", scores: { dog: 2, cat: 1 } },
      { answer: "Dažreiz", scores: { cat: 2, dog: 0 } },
      { answer: "Bieži prom vai ceļoju", scores: { none: 2, dog: -1, cat: -1 } },
    ],
  },
  {
    question: "Kāda vide tev patīk mājās?",
    options: [
      { answer: "Dzīva, trokšņaina, aktīva", scores: { dog: 2, cat: -1 } },
      { answer: "Līdzsvarota", scores: { dog: 1, cat: 1 } },
      { answer: "Klusums un miers", scores: { cat: 2, dog: 0 } },
    ],
  },
  {
    question: "Vai tev vai kādam mājiniekam ir alerģijas?",
    options: [
      { answer: "Jā, jutība pret spalvām", scores: { none: 2, cat: -1, dog: -1 } },
      { answer: "Nē, nav alerģiju", scores: { dog: 1, cat: 1 } },
    ],
  },
  {
    question: "Cik neatkarīgu mājdzīvnieku tu vēlies?",
    options: [
      { answer: "Ļoti neatkarīgu", scores: { cat: 2, dog: -1 } },
      { answer: "Līdzsvarotu", scores: { dog: 1, cat: 1 } },
      { answer: "Tādu, kurš prasa uzmanību", scores: { dog: 2, cat: 0 } },
    ],
  },
  {
    question: "Kāds ir tavs ikmēneša budžets mājdzīvniekam?",
    options: [
      { answer: "Zems (līdz €50)", scores: { cat: 2, dog: -1 } },
      { answer: "Vidējs (€50–100)", scores: { dog: 1, cat: 1 } },
      { answer: "Augsts (vairāk nekā €100)", scores: { dog: 2, cat: 1 } },
    ],
  },
];
const PetQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnswer = (selectedOption) => {
    console.log('Selected answer:', selectedOption.answer);
    setSelectedAnswers([...selectedAnswers, selectedOption.answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log('All questions answered, sending to API...');
      console.log('Final answers:', selectedAnswers);
      sendAnswersToAPI();
    }
  };

  const formatRecommendation = (data) => {
    if (!data || !data.pet) return null;
    
    const { pet } = data;
    return {
      type: pet.type,
      description: pet.description,
      characteristics: {
        size: pet.characteristics.size,
        energyLevel: pet.characteristics['energy level'],
        socialBehavior: pet.characteristics['social behavior']
      },
      likes: pet.likes.general,
      dislikes: pet.dislikes.general,
      whyThisPet: pet.whyThisPet
    };
  };

  const sendAnswersToAPI = async () => {
    console.log('Starting API call...');
    const token = localStorage.getItem('access_token');
    console.log('Token:', token);

    if (!token) {
      console.log('No token found');
      setError("Please log in to get pet recommendations");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Making API request to:', `${API_BASE_URL}/api/chatbot/pet-recommendation/`);
      console.log('Request payload:', { answers: selectedAnswers });
      
      const response = await axios.post(
        `${API_BASE_URL}/api/chatbot/pet-recommendation/`,
        { answers: selectedAnswers },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('=== Debug Frontend Response ===');
      console.log('Full response:', response);
      console.log('Response data:', response.data);
      console.log('Response data type:', typeof response.data);
      console.log('Response data keys:', Object.keys(response.data));
      console.log('Pet data:', response.data.pet);
      console.log('=============================');

      if (!response.data || !response.data.pet) {
        console.error('Invalid response format:', response.data);
        setError("Received invalid response from server");
        return;
      }

      setAiRecommendation(response.data.pet);
      console.log('AI recommendation set to state:', response.data.pet);
    } catch (error) {
      console.error("=== Debug Error ===");
      console.error("Error object:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      console.error("Error details:", error.response?.data);
      console.error("===================");
      
      if (error.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError("Failed to get recommendation. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setAiRecommendation(null);
    setError(null);
  };

  if (isLoading) {
    return (
      <Container component="main" maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6">Getting your pet recommendation...</Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="lg">
      {/* <Typography variant="h4" align="center" sx={{ mb: 5, fontWeight: 800 }}>
        Dzīvnieka izvēles tests
      </Typography> */}
              <Typography variant="h4" align="center" sx={{ mb: 5, fontWeight: 800,
             
                    
                            
                            background: "linear-gradient(60deg, #16477c 0%, #00b5ad 100%)",
                            WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                 }}>Dzīvnieka izvēles tests ar AI</Typography>
      {error && (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 1 }}>
          {error}
        </Box>
      )}
      
      {!aiRecommendation ? (
        <Box>
          <LinearProgress 
            variant="determinate" 
            value={(currentQuestion / questions.length) * 100} 
            sx={{ mb: 4 }} 
          />
          <Typography variant="h5" align="center" sx={{ mt: 8, mb: 4, fontWeight: 500, color: "#16477c", }}>
            {questions[currentQuestion].question}
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {questions[currentQuestion].options.map((option, index) => (
              // <Grid item key={index} xs={12} sm={6} md={4}>
              //   <Card 
              //     onClick={() => handleAnswer(option)}
              //     onKeyPress={(e) => e.key === 'Enter' && handleAnswer(option)}
              //     role="button"
              //     tabIndex={0}
              //     sx={{ 
              //       cursor: 'pointer', 
              //       height: 140, 
              //       display: 'flex', 
              //       alignItems: 'center', 
              //       justifyContent: 'center',
              //       '&:hover': { boxShadow: 6 },
              //       '&:focus': { outline: 'none', boxShadow: 6 }
              //     }}
              //   >
              //     <CardContent>
              //       <Typography variant="h5" align="center">
              //         {option.answer}
              //       </Typography>
              //     </CardContent>
              //   </Card>
              // </Grid>
              <Grid size={{ xs:12, sm:12, md:12, lg:12}} key={index}>
        <Card
          onClick={() => handleAnswer(option)}
          onKeyPress={(e) => e.key === 'Enter' && handleAnswer(option)}
          role="button"
          tabIndex={0}
          sx={{
            // p: 2,
            
            borderRadius: 3,
            background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            boxShadow: '0px 3px 10px rgba(0,0,0,0.06)',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: '0px 6px 20px rgba(0,0,0,0.1)',
              transform: 'scale(1.01)',
              background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
            },
            // '&:focus': {
            //   outline: '2px solid #00b5ad',
            // },
          }}
        >
          <CardContent>
            {/* <Typography variant="body1" color="primary" sx={{ fontWeight: 600, textAlign: 'left' }}>
              {option.answer}
            </Typography> */}
            <CardContent>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <PetsIcon color="primary" sx={{ mr: 1 }} />
    <Typography
      variant="body1"
      color="primary"
      sx={{ fontWeight: 600, textAlign: 'left' }}
    >
      {option.answer}
    </Typography>
  </Box>
</CardContent>
          </CardContent>
        </Card>
      </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box>
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ color: 'primary.main' }}>
              {aiRecommendation.type.charAt(0).toUpperCase() + aiRecommendation.type.slice(1)}
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ mt: 3 }}>
              {aiRecommendation.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Characteristics
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" color="text.secondary">Size</Typography>
                <Typography variant="body1">{aiRecommendation.characteristics.size}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" color="text.secondary">Energy Level</Typography>
                <Typography variant="body1">{aiRecommendation.characteristics.energyLevel}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1" color="text.secondary">Social Behavior</Typography>
                <Typography variant="body1">{aiRecommendation.characteristics.socialBehavior}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Likes
                </Typography>
                <Typography variant="body1">{aiRecommendation.likes.general}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                  Dislikes
                </Typography>
                <Typography variant="body1">{aiRecommendation.dislikes.general}</Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              Why This Pet?
            </Typography>
            <Typography variant="body1" paragraph>
              {aiRecommendation.whyThisPet}
            </Typography>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button 
                onClick={resetQuiz} 
                variant="contained" 
                size="large"
                sx={{ 
                  px: 4,
                  background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)"
                }}
              >
                Try Again
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default PetQuiz; 