
// // import React from "react";
// // import { Button, Box, Container, Typography, Grid, Card, CardContent, CardActions } from "@mui/material";
// // import { Link } from "react-router-dom"; // Import Link from react-router-dom
// // import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// // import { CheckCircle, Cancel } from "@mui/icons-material";
// // const PricingPage = () => {

// //   const cardStyle = {
// //     display: "flex",
// //     flexDirection: "column",
// //     alignItems: "center",
// //     // boxShadow: 3,
// //     boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
// //     borderRadius: "12px",
// //     padding: "5px",
// //     backgroundColor: "#ffffff",
// //     //backgroundColor: "#f4f6f8",  // Subtle background color for cards
// //     textAlign: "center",
// //     height: "100%",
// //     maxWidth: "380px",
// //     // margin: "20px",
// //     border: "1px solid #ddd",  // Soft border for structure
// //   };

// //   const cardContentStyle = {
// //     flexGrow: 1,  // This ensures the content grows and pushes the button to the bottom
// //   };

// //   const buttonStyle = {
// //     backgroundColor: "#5B9BD5",
// //     color: "#fff",
// //     borderRadius: "8px",  // Rounded button edges
// //     '&:hover': {
// //       backgroundColor: "#4a89c0",
// //     },
// //   };

// //   // const compareTableStyle = {
// //   //   marginTop: "40px",
// //   //   borderCollapse: "collapse",
// //   //   width: "100%",
// //   //   textAlign: "left",
// //   //   marginBottom: "40px",
// //   // };

// //   // const compareTableHeaderStyle = {
// //   //   backgroundColor: "#f7f7f7",
// //   // };

// //   // const compareTableCellStyle = {
// //   //   padding: "12px 15px",
// //   //   border: "1px solid #ddd",
// //   // };

// //   return (
// //           <Container component="main" maxWidth="lg" sx={{ paddingLeft: 0, paddingRight: 0 }}>
  
// //       {/* <Typography variant="h3" style={{ textAlign: "center", marginBottom: "40px" }}>
// //         Izvēlieties savu plānu
// //       </Typography> */}
// //                           <Typography variant="h4" align="center" sx={{ mb: 5, fontWeight: 800,
                                
                                       
                                               
// //                                                background: "linear-gradient(60deg, #16477c 0%, #00b5ad 100%)",
// //                                                WebkitBackgroundClip: "text",
// //                                      WebkitTextFillColor: "transparent"
// //                                     }}>Izvēlieties savu plānu</Typography>
// //      {/* Freemium Card */}
// //       <Grid container spacing={3} justifyContent="center">
   
    
// //         <Grid size={{ xs: 12, sm: 8, md: 4, lg: 4 }} display="flex" justifyContent="center">

// //           <Card style={cardStyle} sx={{ background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)', border: "1px solid #ddd !important", borderRadius: "8px"}}>
// //             <CardContent style={cardContentStyle}>
// //               <Typography variant="h4" style={{ fontWeight: "bold", color: "#16477c" }}>Freemium plāns</Typography>
// //               <Typography variant="h5" mt={1} sx={{color: "#00b5ad"}} gutterBottom>
// //                 Bezmaksas
// //               </Typography>
// //               <List style={{ textAlign: 'left'}}>
// //                 <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary"  /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Publicējiet 1 pazudušu, atrastu dzīvnieku" />
// //                 </ListItem>
// //                 <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary"  /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Pārlūkojiet pakalpojumus un meklējiet dzīvniekus" />
// //                 </ListItem>
// //                 <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary"  /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Saņemiet reāllaika paziņojumus" />
// //                 </ListItem>
// //                 <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Publicējiet 1 pakalpojumu" />
// //                 </ListItem>
// //                 <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary"  /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Piekļuve pamata nodarbībām" />
// //                 </ListItem>
               
              
             
            
// //                 <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Sludinājuma laiks līdz 30 dienām" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Ekskluzīvas atlaides dzīvnieku pakalpojumiem" />
// //                 </ListItem>
// //                 <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Plus punkts karmai" />
// //                 </ListItem>
// //                 <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Piekļuve premium nodarbībām" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Sludinājums sociālajos tīklos" />
// //                 </ListItem>
// //                 <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Individuālās konsultācijas" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Bez reklāmām" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="AI chatbots" />
// //                 </ListItem>
                
// //               </List>
// //             </CardContent>
// //             <CardActions style={{ width: "100%", padding: "1rem" }}>
// //               <Button variant="outlined" fullWidth sx={{
// //                     mt: 2,
// //                     py: 1,
// //                     background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)",
// //                     color: "white",
// //                   }}>
// //                 Bez maksas
// //               </Button>
// //             </CardActions>
// //           </Card>
// //         </Grid>

// //         {/* Plus Card */}

// //   <Grid size={{ xs: 12, sm: 8, md: 4, lg: 4 }} display="flex" justifyContent="center">
// //   <Card style={cardStyle} sx={{background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)', border: "1px solid #ddd !important", borderRadius: "8px"}}>
// //             <CardContent style={cardContentStyle} >
// //               <Typography variant="h4" style={{ fontWeight: "bold", color: "#16477c" }}>Plus plāns</Typography>
// //               <Typography variant="h5" mt={1} sx={{color: "#00b5ad"}} gutterBottom>
// //                 5€ / mēnesī
// //               </Typography>
// //               <List style={{ textAlign: 'left' }}>
// //               <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Prioritārie dzīvnieku sludinājumi (parādās augšā)" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Paplašināts sludinājumu laiks 90 dienas" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Publicējiet līdz 5 pazudušiem, atrastiem dzīvniekiem" />
// //                 </ListItem>
// //                 <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Saņemiet reāllaika paziņojumus" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Ekskluzīvas atlaides dzīvnieku pakalpojumiem" />
// //                 </ListItem>
// //                 <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Publicējiet līdz 3 pakalpojumiem" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Plus punkts karmai" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Piekļuve premium nodarbībām" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Sludinājums sociālajos tīklos" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Individuālās konsultācijas" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Bez reklāmām" />
// //                 </ListItem>

// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="AI chatbots" />
// //                 </ListItem>
// //               </List>
// //             </CardContent>
// //             <CardActions style={{ width: "100%", padding: "1rem" }}>
// //               {/* <Link to="/checkout" style={{ width: "100%" }}>
// //                 <Button variant="contained" style={buttonStyle} fullWidth>
// //                   Plus
// //                 </Button>
// //               </Link> */}
// //               <Link to="/checkout?plan=plus" style={{ width: "100%" }}>
// //   {/* <Button variant="contained" style={buttonStyle} fullWidth >
// //     Plus
// //   </Button> */}
// //        <Button variant="outlined" fullWidth sx={{
// //                     mt: 2,
// //                     py: 1,
// //                     background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)",
// //                     color: "white",
// //                   }}>
// //                 Plus
// //               </Button>
// // </Link>

// //             </CardActions>
// //           </Card>
// //   </Grid>

// //   <Grid size={{ xs: 12, sm: 8, md: 4, lg: 4 }} display="flex" justifyContent="center">
// //   <Card style={cardStyle} sx={{background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)', border: "1px solid #ddd !important", borderRadius: "8px"}}>
// //             <CardContent style={cardContentStyle}>
// //               <Typography variant="h4" style={{ fontWeight: "bold", color: "#16477c" }}>Premium plāns</Typography>
// //               <Typography variant="h5" mt={1} sx={{color: "#00b5ad"}} gutterBottom>
// //                 12€ / mēnesī
// //               </Typography>
// //               <List style={{ textAlign: 'left' }}>
// //               <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Prioritārie dzīvnieku sludinājumi (parādās augšā)" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Paplašināts sludinājumu laiks 90 dienas" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Publicējiet līdz 5 pazudušiem, atrastiem dzīvniekiem" />
// //                 </ListItem>
// //                 <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Saņemiet reāllaika paziņojumus" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Ekskluzīvas atlaides dzīvnieku pakalpojumiem" />
// //                 </ListItem>
// //                 <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Publicējiet līdz 5 pakalpojumiem" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Plus punkts karmai" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Piekļuve premium nodarbībām" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Sludinājums sociālajos tīklos" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Individuālās konsultācijas" />
// //                 </ListItem>
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Bez reklāmām" />
// //                 </ListItem>
             
// //                 <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
// //                   <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="AI chatbots" />
// //                 </ListItem>
// //               </List>
// //             </CardContent>
// //             <CardActions style={{ width: "100%", padding: "1rem" }}>
// //               {/* <Link to="/checkout" style={{ width: "100%" }}>
// //                 <Button variant="contained" style={buttonStyle} fullWidth>
// //                   Premium
// //                 </Button>
// //               </Link> */}
// //               <Link to="/checkout?plan=premium" style={{ width: "100%" }}>
// //   {/* <Button variant="contained" style={buttonStyle} fullWidth>
// //     Premium
// //   </Button> */}
// //    <Button variant="outlined" fullWidth sx={{
// //                     mt: 2,
// //                     py: 1,
// //                     background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)",
// //                     color: "white",
// //                   }}>
// //                 Premium
// //               </Button>
// // </Link>
// //             </CardActions>
// //           </Card>
// //   </Grid>



// //       </Grid>


// //     </Container>
// //   );
// // };

// // export default PricingPage;
// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Box,
//   Chip,
//   CircularProgress,
// } from "@mui/material";
// import { CheckCircle } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// const plans = [
//   {
//     name: "Freemium plāns",
//     price: "Bezmaksas",
//     id: "freemium",
//     color: "#d0f0f5",
//     features: [
//       { text: "Publicējiet 1 pazudušu, atrastu dzīvnieku" },
//       { text: "Pārlūkojiet pakalpojumus un meklējiet dzīvniekus" },
//       { text: "Saņemiet reāllaika paziņojumus" },
//       { text: "Publicējiet 1 pakalpojumu" },
//       { text: "Piekļuve pamata nodarbībām" },
//       { text: "Sludinājuma laiks līdz 30 dienām", extra: true },
//       { text: "Ekskluzīvas atlaides dzīvnieku pakalpojumiem", extra: true },
//       { text: "Plus punkts karmai", extra: true },
//       { text: "Piekļuve premium nodarbībām", extra: true },
//       { text: "Sludinājums sociālajos tīklos", extra: true },
//       { text: "Individuālās konsultācijas", extra: true },
//       { text: "Bez reklāmām", extra: true },
//       { text: "AI chatbots", extra: true },
//     ],
//   },
//   {
//     name: "Plus plāns",
//     price: "5€ / mēnesī",
//     id: "plus",
//     color: "#e8f6f9",
//     features: [
//       { text: "Prioritārie dzīvnieku sludinājumi (parādās augšā)" },
//       { text: "Paplašināts sludinājumu laiks 90 dienas" },
//       { text: "Publicējiet līdz 5 pazudušiem, atrastiem dzīvniekiem" },
//       { text: "Saņemiet reāllaika paziņojumus" },
//       { text: "Ekskluzīvas atlaides dzīvnieku pakalpojumiem" },
//       { text: "Publicējiet līdz 3 pakalpojumiem" },
//       { text: "Plus punkts karmai" },
//       { text: "Piekļuve premium nodarbībām" },
//       { text: "Sludinājums sociālajos tīklos" },
//       { text: "Individuālās konsultācijas", extra: true },
//       { text: "Bez reklāmām", extra: true },
//       { text: "AI chatbots", extra: true },
//     ],
//   },
//   {
//     name: "Premium plāns",
//     price: "12€ / mēnesī",
//     id: "premium",
//     color: "#e8f6f9",
//     features: [
//       { text: "Prioritārie dzīvnieku sludinājumi (parādās augšā)" },
//       { text: "Paplašināts sludinājumu laiks 90 dienas" },
//       { text: "Publicējiet līdz 5 pazudušiem, atrastiem dzīvniekiem" },
//       { text: "Saņemiet reāllaika paziņojumus" },
//       { text: "Ekskluzīvas atlaides dzīvnieku pakalpojumiem" },
//       { text: "Publicējiet līdz 5 pakalpojumiem" },
//       { text: "Plus punkts karmai" },
//       { text: "Piekļuve premium nodarbībām" },
//       { text: "Sludinājums sociālajos tīklos" },
//       { text: "Individuālās konsultācijas" },
//       { text: "Bez reklāmām" },
//       { text: "AI chatbots" },
//     ],
//   },
// ];

// const PricingPage = () => {
//   const [currentPlan, setCurrentPlan] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [subscriptionError, setSubscriptionError] = useState(null);
// const fetchSubscriptionStatus = async () => {
//   try {
//     setLoading(true);
//     setSubscriptionError(null);
//     const accessToken = localStorage.getItem("access_token");
//     const response = await fetch(`${API_BASE_URL}/api/payment/subscription/status/`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const data = await response.json();
//     console.log("Subscription status response:", data);

//     // ✅ Use correct key
//     setCurrentPlan(data.subscription_type);
//   } catch (error) {
//     setSubscriptionError("Neizdevās iegūt abonementa statusu.");
//     console.error("Error fetching subscription status:", error);
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//     fetchSubscriptionStatus();
//   }, []);

//   if (loading) {
//     return (
//       <Box textAlign="center" mt={10}>
//         <CircularProgress />
//         <Typography mt={2}>Ielādē plānus...</Typography>
//       </Box>
//     );
//   }

//   if (subscriptionError) {
//     return (
//       <Box textAlign="center" mt={10}>
//         <Typography color="error">{subscriptionError}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ px: 0 }}>
//       <Typography
//         variant="h4"
//         align="center"
//         sx={{
//           mb: 5,
//           fontWeight: 800,
//           background: "linear-gradient(60deg, #16477c 0%, #00b5ad 100%)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//       >
//         Izvēlieties savu plānu
//       </Typography>

//       <Grid container spacing={3} justifyContent="center">
//         {plans.map((plan) => {
//           const isActive = plan.id === currentPlan;

//           return (
//             <Grid size={{ xs: 12, sm: 8, md: 4, lg: 4 }} key={plan.id} display="flex" justifyContent="center">
//               <Box position="relative" width="100%" maxWidth="380px">
//                 {isActive && (
//                   <Chip
//                     label="Aktīvais plāns"
//                     color="success"
//                     sx={{
//                       position: "absolute",
//                       top: 10,
//                       left: 10,
//                       zIndex: 10,
//                       fontWeight: "bold",
//                     }}
//                   />
//                 )}
//                 <Card
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     borderRadius: "12px",
//                     border: "1px solid #ddd",
//                     textAlign: "center",
//                     height: "100%",
//                     background: `linear-gradient(90deg, ${plan.color} 0%, #f1faff 100%)`,
//                   }}
//                 >
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography variant="h4" sx={{ fontWeight: "bold", color: "#16477c" }}>
//                       {plan.name}
//                     </Typography>
//                     <Typography variant="h5" mt={1} sx={{ color: "#00b5ad" }} gutterBottom>
//                       {plan.price}
//                     </Typography>
//                     <List sx={{ textAlign: "left" }}>
//                       {plan.features.map((feat, idx) => (
//                         <ListItem key={idx}>
//                           <ListItemIcon>
//                             <CheckCircle sx={{ color: feat.extra ? "#FF746C" : "#1976d2" }} />
//                           </ListItemIcon>
//                           <ListItemText primary={feat.text} />
//                         </ListItem>
//                       ))}
//                     </List>
//                   </CardContent>
//                   <CardActions sx={{ width: "100%", px: 2, pb: 2 }}>
//                     {isActive ? (
//                       <Button variant="contained" fullWidth disabled>
//                         Aktīvs
//                       </Button>
//                     ) : (
//                       <Link to={`/checkout?plan=${plan.id}`} style={{ width: "100%", textDecoration: "none" }}>
//                         <Button
//                           variant="outlined"
//                           fullWidth
//                           sx={{
//                             mt: 1,
//                             py: 1,
//                             background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)",
//                             color: "white",
//                           }}
//                         >
//                           Izvēlēties
//                         </Button>
//                       </Link>
//                     )}
//                   </CardActions>
//                   <Typography variant="caption" sx={{ mb: 2, color: "#888" }}>
//                     Pārvaldīt vai atcelt plānu savā profilā
//                   </Typography>
//                 </Card>
//               </Box>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Container>
//   );
// };

// export default PricingPage;
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import TestVisaCard from "../components/TestVisaCard";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const plans = [
  // ... your plans unchanged ...
  {
    name: "Freemium plāns",
    price: "Bezmaksas",
    id: "freemium",
    color: "#d0f0f5",
    features: [
      { text: "Publicējiet 1 pazudušu, atrastu dzīvnieku" },
      { text: "Pārlūkojiet pakalpojumus un meklējiet dzīvniekus" },
      { text: "Saņemiet reāllaika paziņojumus" },
      { text: "Publicējiet 1 pakalpojumu" },
      { text: "Piekļuve pamata nodarbībām" },
      { text: "Sludinājuma laiks līdz 30 dienām", extra: true },
      { text: "Ekskluzīvas atlaides dzīvnieku pakalpojumiem", extra: true },
      { text: "Plus punkts karmai", extra: true },
      { text: "Piekļuve premium nodarbībām", extra: true },
      { text: "Sludinājums sociālajos tīklos", extra: true },
      { text: "Individuālās konsultācijas", extra: true },
      { text: "Bez reklāmām", extra: true },
      { text: "AI chatbots", extra: true },
    ],
  },
  {
    name: "Plus plāns",
    price: "5€ / mēnesī",
    id: "plus",
    color: "#e8f6f9",
    features: [
      { text: "Prioritārie dzīvnieku sludinājumi (parādās augšā)" },
      { text: "Paplašināts sludinājumu laiks 90 dienas" },
      { text: "Publicējiet līdz 5 pazudušiem, atrastiem dzīvniekiem" },
      { text: "Saņemiet reāllaika paziņojumus" },
      { text: "Ekskluzīvas atlaides dzīvnieku pakalpojumiem" },
      { text: "Publicējiet līdz 3 pakalpojumiem" },
      { text: "Plus punkts karmai" },
      { text: "Piekļuve premium nodarbībām" },
      { text: "Sludinājums sociālajos tīklos" },
      { text: "Individuālās konsultācijas", extra: true },
      { text: "Bez reklāmām", extra: true },
      { text: "AI chatbots", extra: true },
    ],
  },
  {
    name: "Premium plāns",
    price: "12€ / mēnesī",
    id: "premium",
    color: "#e8f6f9",
    features: [
      { text: "Prioritārie dzīvnieku sludinājumi (parādās augšā)" },
      { text: "Paplašināts sludinājumu laiks 90 dienas" },
      { text: "Publicējiet līdz 5 pazudušiem, atrastiem dzīvniekiem" },
      { text: "Saņemiet reāllaika paziņojumus" },
      { text: "Ekskluzīvas atlaides dzīvnieku pakalpojumiem" },
      { text: "Publicējiet līdz 5 pakalpojumiem" },
      { text: "Plus punkts karmai" },
      { text: "Piekļuve premium nodarbībām" },
      { text: "Sludinājums sociālajos tīklos" },
      { text: "Individuālās konsultācijas" },
      { text: "Bez reklāmām" },
      { text: "AI chatbots" },
    ],
  },
];

const isSubscriptionActive = (endDate) => {
  if (!endDate) return false;
  return new Date() < new Date(endDate);
};

const PricingPage = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionError, setSubscriptionError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchSubscriptionStatus = async () => {
    try {
      setLoading(true);
      setSubscriptionError(null);
      const accessToken = localStorage.getItem("access_token");
      const response = await fetch(`${API_BASE_URL}/api/payment/subscription/status/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log("Subscription status response:", data);
      setSubscription(data);
    } catch (error) {
      setSubscriptionError("Neizdevās iegūt abonementa statusu.");
      console.error("Error fetching subscription status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
        {/* <Typography mt={2}>Ielādē plānus...</Typography> */}
      </Box>
    );
  }

  if (subscriptionError) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography color="error">{subscriptionError}</Typography>
      </Box>
    );
  }

  const hasActiveSubscription = subscription && isSubscriptionActive(subscription.subscription_end);
  const currentPlanId = subscription?.subscription_type;

  // Handler when user clicks disabled button
  const handleDisabledClick = (e) => {
    e.preventDefault();
    setDialogOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 5,
          fontWeight: 800,
          background: "linear-gradient(60deg, #16477c 0%, #00b5ad 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Izvēlieties savu plānu 
      </Typography>

      {/* {hasActiveSubscription && (
        <Box mb={3} textAlign="center" color="error.main" fontWeight="bold">
          Jums jau ir aktīvs <u>{currentPlanId}</u> plāns līdz{" "}
          {new Date(subscription.subscription_end).toLocaleDateString()}. Jaunus plānus varēs iegādāties tikai pēc šī perioda beigām.
        </Box>
      )} */}

      <Grid container spacing={3} justifyContent="center">
        {plans.map((plan) => {
          const isActive = plan.id === currentPlanId && hasActiveSubscription;

          return (
            <Grid
              size={{ xs: 12, sm: 8, md: 4, lg: 4 }}
              key={plan.id}
              display="flex"
              justifyContent="center"
            >
              <Box position="relative" width="100%" maxWidth="380px">
                {/* {isActive && (
                  <Chip
                    label="Aktīvais plāns"
                    color="success"
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      zIndex: 10,
                      fontWeight: "bold",
                    }}
                  />
                )} */}
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: "12px",
                    border: "1px solid #ddd",
                    textAlign: "center",
                    height: "100%",
                    background: isActive ? 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)' : 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                    //background: isActive ? `linear-gradient(90deg, ${plan.color} 0%, #f1faff 100%)` : "white",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#16477c" }}>
                      {plan.name}
                    </Typography>
                    <Typography variant="h5" mt={1} sx={{ color: "#00b5ad" }} gutterBottom>
                      {plan.price}
                    </Typography>
                    <List sx={{ textAlign: "left" }}>
                      {plan.features.map((feat, idx) => (
                        <ListItem key={idx}>
                          <ListItemIcon>
                            <CheckCircle sx={{ color: feat.extra ? "#FF746C" : "#1976d2" }} />
                          </ListItemIcon>
                          <ListItemText primary={feat.text} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                  <CardActions sx={{ width: "100%", px: 2, pb: 2 }}>
                    {isActive ? (
                      <Button variant="contained" fullWidth disabled>
                        Aktīvs
                      </Button>
                    ) : hasActiveSubscription ? (
                      <Button
                        variant="outlined"
                        fullWidth
                        disabled={false} // Not disabled visually, but will block clicks to show dialog
                        onClick={handleDisabledClick}
                        sx={{
                          mt: 1,
                          py: 1,
                          background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        Izvēlēties
                      </Button>
                    ) : (
                      <Link to={`/checkout?plan=${plan.id}`} style={{ width: "100%", textDecoration: "none" }}>
                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{
                            mt: 1,
                            py: 1,
                            background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)",
                            color: "white",
                          }}
                        >
                          Izvēlēties
                        </Button>
                      </Link>
                    )}
                  </CardActions>
                </Card>
              </Box>
            </Grid>
          );
        })}
      </Grid>

  <Grid container spacing={3} justifyContent="center">
     
            <Grid
              size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
           
              display="flex"
              justifyContent="center"
            >
                    {/* Single message below all cards */}
      <Typography variant="body2" align="center" sx={{ mt: 4, color: "#555" }}>
        Lai pārvaldītu vai atceltu plānu, dodieties uz profilu.
      </Typography>
              </Grid></Grid>


      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Nevar iegādāties jaunu plānu</DialogTitle>
        <DialogContent>
              {hasActiveSubscription && (
        <Box mb={3} textAlign="center" color="error.main" fontWeight="bold">
          Jums jau ir aktīvs <u>{currentPlanId}</u> plāns līdz{" "}
          {new Date(subscription.subscription_end).toLocaleDateString()}. Jaunus plānus varēs iegādāties tikai pēc šī perioda beigām.
        </Box>
      )}
          {/* Jums jau ir aktīvs abonements. Jaunu plānu varēs iegādāties tikai pēc esošā abonementa perioda beigām. */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} autoFocus>
            Labi
          </Button>
        </DialogActions>
      </Dialog>

        <TestVisaCard />
    </Container>
  );
};

export default PricingPage;
