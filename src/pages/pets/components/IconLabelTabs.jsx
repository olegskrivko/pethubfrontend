import React, { useState } from 'react';
import { Tabs, Tab, Box,IconButton, Typography, Avatar, Card, CardContent, Grid,  } from '@mui/material';
import PropTypes from 'prop-types';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneIcon from '@mui/icons-material/Phone';
import moment from 'moment';
import TabLocationHistory from './TabLocationHistory';
import TabMessages from './TabMessages';
import TabNotes from './TabNotes';
import TabContact from './TabContact';
import { Link } from '@mui/material';

import DescriptionIcon from '@mui/icons-material/Description';
import ForumIcon from '@mui/icons-material/Forum';
const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const TabPanel = ({ children, value, index, ...other }) => {
  const { id, 'aria-controls': ariaControls } = a11yProps(index);

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={id}
      aria-labelledby={`simple-tab-${index}`}
      aria-controls={ariaControls}
      {...other}
    >
      {value === index && <Box sx={{ padding: '1rem 0' }}>{children}</Box>}
    </Box>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// const TabPanel = ({ children, value, index }) => (
//   <Box role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
//     {value === index && <Box sx={{ padding: '1rem 0' }}>{children}</Box>}
//   </Box>
// );

function IconLabelTabs({pet,sightings, onZoomMap}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Define the function to zoom to a location
  const handleZoomMap = (lat, lng) => {
    // if (!lat || !lng) {
    //   console.warn("Invalid coordinates");
    //   return;
    // }
    onZoomMap(lat, lng)
    console.log(`Zooming to: ${lat}, ${lng}`);
  };
  

  return (
    <Box sx={{ margin: '0rem !important', padding: "0rem !important" }}>
      {/* <Tabs value={value} centered onChange={handleChange} variant="fullWidth">
        <Tab icon={<MessageIcon />} label="Messages" />
        <Tab icon={<AirlineStopsIcon />} label="History" />
        <Tab icon={<NotesIcon />} label="Notes" />
        <Tab icon={<ContactPageIcon />} label="Contact" />
      </Tabs> */}

      <div style={{ margin: '1rem 0' }}>
        <Tabs
          value={value}
          centered
          onChange={handleChange}
          variant="fullWidth"
          aria-label="basic tabs example"
        >
          <Tab
            icon={<ForumIcon />}
            label="Ziņas"
            sx={{ fontSize: '0.7rem' }}
        
            {...a11yProps(0)}
          />
          <Tab
            icon={<AirlineStopsIcon />}
            label="Vēsture"
            sx={{ fontSize: '0.7rem' }}
            {...a11yProps(1)}
          />
          <Tab
            icon={<DescriptionIcon />}
            label="Piezīmes"
            sx={{ fontSize: '0.7rem' }}
            {...a11yProps(2)}
          />

          <Tab
            icon={<ContactPageIcon />}
            label="Kontakti"
            sx={{ fontSize: '0.7rem' }}
            {...a11yProps(3)}
          />
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        <TabMessages pet={pet} sightings={sightings} onZoomMap={handleZoomMap}   />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabLocationHistory pet={pet} sightings={sightings} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabNotes pet={pet} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TabContact pet={pet} />
      </TabPanel>
    </Box>
  );
}

export default IconLabelTabs;
