import React from 'react';
import { useTranslation } from 'react-i18next';

import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventIcon from '@mui/icons-material/Event';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import FlagIcon from '@mui/icons-material/Flag';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { lv } from 'date-fns/locale';

import { getStatusLabel, getFinalStatusLabel } from '../../../constants/Choices';

const StatusHistory = ({ pet, sightings }) => {
  const { t } = useTranslation('petDetails');
  
  // Filter sightings where both latitude and longitude are valid
  const validSightings = sightings.filter(
    (sighting) => sighting.latitude && sighting.longitude && !isNaN(sighting.latitude) && !isNaN(sighting.longitude),
  );

  const eventDate = pet.event_occurred_at ? new Date(pet.event_occurred_at.replace(' ', 'T')) : null;

  const formattedDate = eventDate ? format(eventDate, 'd. MMMM yyyy', { locale: lv }) : 'Nav pieejams';

  const formattedTime = eventDate ? format(eventDate, 'HH:mm', { locale: lv }) : 'Nav pieejams';

  const eventDateCreatedAt = pet.created_at ? new Date(pet.created_at.replace(' ', 'T')) : null;

  const formattedDateCreatedAt = eventDateCreatedAt
    ? format(eventDateCreatedAt, 'd. MMMM yyyy', { locale: lv })
    : 'Nav pieejams';

  const formattedTimeCreatedAt = eventDateCreatedAt
    ? format(eventDateCreatedAt, 'HH:mm', { locale: lv })
    : 'Nav pieejams';

  return (
    <>
      {pet ? (
        <Card
          sx={{
            borderRadius: 3,
            background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
            },
          }}
        >
          <CardContent style={{ paddingBottom: '0.5rem', paddingTop: '0.5rem' }}>
            <List sx={{ paddingTop: '0 !important' }}>
              {/* Initial event date */}
              {pet.event_occurred_at && (
                <ListItem sx={{ paddingLeft: 0 }}>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: '#555', color: '#fff' }}>
                      <EventIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={'Mājdzīvnieks ' + `${getStatusLabel(pet.status, t).toLowerCase()} ` + `${formattedDate}`}
                  />
                </ListItem>
              )}

              {/* Created at date */}
              {pet.created_at && (
                <ListItem sx={{ paddingLeft: 0 }}>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: '#555', color: '#fff' }}>
                      <EditCalendarIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={'Sludinājums ievietots ' + `${formattedDateCreatedAt}`} />
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
                        <Avatar style={{ backgroundColor: '#555', color: '#fff' }}>
                          <LocationOnIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          'Mājdzīvnieks ' +
                          `${getStatusLabel(sighting.status, t).toLowerCase()} ` +
                          `${format(sighting.event_occurred_at, 'd. MMMM yyyy', {
                            locale: lv,
                          })}`
                        }
                      />
                    </ListItem>
                  ))
              ) : (
                <ListItem sx={{ paddingLeft: 0 }}>
                  <ListItemAvatar>
                    <Avatar style={{ backgroundColor: '#555', color: '#fff' }}>
                      <EventBusyIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Nav pieejami novērojumi." />
                </ListItem>
              )}

              {/* Always show final status */}
              <ListItem sx={{ paddingLeft: 0 }}>
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: '#555', color: '#fff' }}>
                    <FlagIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`Galīgais statuss: ${getFinalStatusLabel(pet.final_status, t)}`} />
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
