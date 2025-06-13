// import React from 'react';
// import {
//   Grid,
//   Typography,
//   IconButton,
//   Box,
//   Card,
//   CardContent,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Avatar,
//   Tooltip,
// } from '@mui/material';
// import FlagIcon from '@mui/icons-material/Flag';
// import EventIcon from '@mui/icons-material/Event'; // Pet Lost
// import EditCalendarIcon from '@mui/icons-material/EditCalendar'; // Report Created
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import EventBusyIcon from '@mui/icons-material/EventBusy';
// import moment from 'moment';
// import { format } from "date-fns";
// import { lv } from 'date-fns/locale';
// import 'moment/locale/lv'; // Import Latvian locale

// const StatusHistory = ({ pet, sightings }) => {
//     // Filter sightings where both latitude and longitude are available
//     const validSightings = sightings.filter(
//       (sighting) => sighting.latitude && sighting.longitude && !isNaN(sighting.latitude) && !isNaN(sighting.longitude)
//     );

//     /////
//       const eventDate = pet.event_occurred_at
//       ? new Date(pet.event_occurred_at.replace(" ", "T"))
//       : null;
    
//     const formattedDate = eventDate
//       ? format(eventDate, "d. MMMM yyyy", { locale: lv })
//       : "Nav pieejams";
    
//     const formattedTime = eventDate
//       ? format(eventDate, "HH:mm", { locale: lv })
//       : "Nav pieejams";


//       const eventDateCreatedAt = pet.created_at
//       ? new Date(pet.created_at.replace(" ", "T"))
//       : null;
    
//     const formattedDateCreatedAt = eventDateCreatedAt
//       ? format(eventDateCreatedAt, "d. MMMM yyyy", { locale: lv })
//       : "Nav pieejams";
    
//     const formattedTimeCreatedAt = eventDateCreatedAt
//       ? format(eventDateCreatedAt, "HH:mm", { locale: lv })
//       : "Nav pieejams";

      
//   return (
//     <>
//       {pet ? (
//         <Card sx={{
//             borderRadius: 3,
//             background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
//             cursor: 'pointer',
//             transition: 'all 0.3s ease-in-out',
//             '&:hover': {
//               background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
//             },
//           }}>
//           <CardContent style={{ paddingBottom: '0.5rem', paddingTop: '0.5rem' }}>
//             <List sx={{ paddingTop: '0 !important' }}>
         
//               {/* First Item: When the pet was actually lost */}
//               {pet.event_occurred_at && (
//                 <ListItem sx={{ paddingLeft: 0 }}>
//                   <ListItemAvatar>
//                       <Avatar style={{ backgroundColor: '#555', color: '#fff' }}>
//                         <EventIcon />
//                       </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary={"Mājdzīvnieks " + `${pet.status_display.toLowerCase()} ` + `${formattedDate}`}
//                   />
//                 </ListItem>
//               )}
              
//               {/* Second Item: When the report was created */}
//               {pet.created_at && (
//                 <ListItem sx={{ paddingLeft: 0 }}>
//                   <ListItemAvatar>
                
//                       <Avatar style={{ backgroundColor: '#555', color: '#fff' }}>
//                         <EditCalendarIcon />
//                       </Avatar>
                 
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary={"Sludinājums ievietots " + `${formattedDateCreatedAt}`}
//                     // secondary={moment(pet.created_at).format('MMMM Do YYYY, h:mm a')}
//                   />
//                 </ListItem>
//               )}

            

//                  {/* Sightings History: Display only sightings with valid latitude and longitude */}
//               {validSightings.length > 0 ? (
//                 validSightings.slice().reverse().map((sighting, index) => {
//                   return (
//                     <>
//                     <ListItem  sx={{ paddingLeft: 0 }} key={index}>
//                       <ListItemAvatar>
                    
//                           <Avatar style={{ backgroundColor: '#555', color: '#fff' }}>
//                             <LocationOnIcon />
//                           </Avatar>
             
//                       </ListItemAvatar>
//                       <ListItemText
//                         primary={"Mājdzīvnieks " + `${sighting.status_display.toLowerCase()} ` + `${format(sighting.event_occurred_at, "d. MMMM yyyy", { locale: lv })}`}
//                       />
//                     </ListItem>
//                     </>
//                   )})
        
     
//               ) : (
//                 <>
//                 <Grid  size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
//                    <ListItem sx={{ paddingLeft: 0, paddingBottom: "0rem !important" }}>
//                   <ListItemAvatar>
             
//                       <Avatar style={{ backgroundColor: '#555', color: '#fff' }}>
//                         <EventBusyIcon />
//                       </Avatar>
             
//                   </ListItemAvatar>
          
//                          <Typography color="textSecondary">
               
//               <Box display="flex" alignItems="center" gap={2}>
//                 Nav pieejami novērojumi.
//               </Box>
//             </Typography>
//                 </ListItem>
//                 </Grid>
//                        <Grid  size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
//                    <ListItem sx={{ paddingLeft: 0, paddingBottom: "0rem !important" }}>
//                   <ListItemAvatar>
             
//                       <Avatar style={{ backgroundColor: '#555', color: '#fff' }}>
//                         <FlagIcon />
//                       </Avatar>
             
//                   </ListItemAvatar>
          
//                          <Typography color="textSecondary">
                       
//               <Box display="flex" alignItems="center" gap={2}>
//                 {pet.final_status_display}
//               </Box>
//             </Typography>
//                 </ListItem>
//                 </Grid>
//                 </>
//               )}

//             </List>
//           </CardContent>
//         </Card>
//       ) : (
//         <>
//         <Grid  size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          
//           <Typography variant="body2" color="textSecondary">
//             Nav pieejama statusa vēsture.
//           </Typography>
//         </Grid>
//         </>
//       )}
//     </>
//   );
// };

// export default StatusHistory;
import React from "react";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import FlagIcon from "@mui/icons-material/Flag";
import { format } from "date-fns";
import { lv } from "date-fns/locale";

const StatusHistory = ({ pet, sightings }) => {
  // Filter sightings where both latitude and longitude are valid
  const validSightings = sightings.filter(
    (sighting) =>
      sighting.latitude &&
      sighting.longitude &&
      !isNaN(sighting.latitude) &&
      !isNaN(sighting.longitude)
  );

  const eventDate = pet.event_occurred_at
    ? new Date(pet.event_occurred_at.replace(" ", "T"))
    : null;

  const formattedDate = eventDate
    ? format(eventDate, "d. MMMM yyyy", { locale: lv })
    : "Nav pieejams";

  const formattedTime = eventDate
    ? format(eventDate, "HH:mm", { locale: lv })
    : "Nav pieejams";

  const eventDateCreatedAt = pet.created_at
    ? new Date(pet.created_at.replace(" ", "T"))
    : null;

  const formattedDateCreatedAt = eventDateCreatedAt
    ? format(eventDateCreatedAt, "d. MMMM yyyy", { locale: lv })
    : "Nav pieejams";

  const formattedTimeCreatedAt = eventDateCreatedAt
    ? format(eventDateCreatedAt, "HH:mm", { locale: lv })
    : "Nav pieejams";

  return (
    <>
      {pet ? (
        <Card
          sx={{
            borderRadius: 3,
            background: "linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: "linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)",
            },
          }}
        >
          <CardContent style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}>
            <List sx={{ paddingTop: "0 !important" }}>
              {/* Initial event date */}
              {pet.event_occurred_at && (
                <ListItem sx={{ paddingLeft: 0 }}>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#555", color: "#fff" }}>
                      <EventIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      "Mājdzīvnieks " +
                      `${pet.status_display.toLowerCase()} ` +
                      `${formattedDate}`
                    }
                  />
                </ListItem>
              )}

              {/* Created at date */}
              {pet.created_at && (
                <ListItem sx={{ paddingLeft: 0 }}>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#555", color: "#fff" }}>
                      <EditCalendarIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Sludinājums ievietots " + `${formattedDateCreatedAt}`}
                  />
                </ListItem>
              )}

              {/* Sightings */}
              {validSightings.length > 0 ? (
                validSightings
                  .slice()
                  .reverse()
                  .map((sighting, index) => (
                    <ListItem sx={{ paddingLeft: 0 }} key={index}>
                      <ListItemAvatar>
                        <Avatar style={{ backgroundColor: "#555", color: "#fff" }}>
                          <LocationOnIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          "Mājdzīvnieks " +
                          `${sighting.status_display.toLowerCase()} ` +
                          `${format(sighting.event_occurred_at, "d. MMMM yyyy", {
                            locale: lv,
                          })}`
                        }
                      />
                    </ListItem>
                  ))
              ) : (
                <ListItem sx={{ paddingLeft: 0 }}>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: "#555", color: "#fff" }}>
                      <EventBusyIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Nav pieejami novērojumi." />
                </ListItem>
              )}

              {/* Always show final status */}
              <ListItem sx={{ paddingLeft: 0 }}>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#555", color: "#fff" }}>
                    <FlagIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Galīgais statuss: ${pet.final_status_display}`}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      ) : (
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Typography variant="body2" color="textSecondary">
            Nav pieejama statusa vēsture.
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default StatusHistory;
