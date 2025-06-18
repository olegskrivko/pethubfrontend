import React, { useState } from 'react';

import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DescriptionIcon from '@mui/icons-material/Description';
import ForumIcon from '@mui/icons-material/Forum';
import PhoneIcon from '@mui/icons-material/Phone';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar, Box, Card, CardContent, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { Link } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';

import TabContact from './TabContact';
import TabLocationHistory from './TabLocationHistory';
import TabMessages from './TabMessages';
import TabNotes from './TabNotes';

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

function IconLabelTabs({ pet, sightings, onZoomMap }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Define the function to zoom to a location
  const handleZoomMap = (lat, lng) => {
    onZoomMap(lat, lng);
    console.log(`Zooming to: ${lat}, ${lng}`);
  };

  return (
    <Box sx={{ margin: '0rem !important', padding: '0rem !important' }}>
      <div style={{ margin: '1rem 0' }}>
        <Tabs value={value} centered onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
          <Tab icon={<ForumIcon />} label="Ziņas" sx={{ fontSize: '0.7rem' }} {...a11yProps(0)} />
          <Tab icon={<DescriptionIcon />} label="Piezīmes" sx={{ fontSize: '0.7rem' }} {...a11yProps(1)} />

          <Tab icon={<ContactPageIcon />} label="Kontakti" sx={{ fontSize: '0.7rem' }} {...a11yProps(2)} />
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        <TabMessages pet={pet} sightings={sightings} onZoomMap={handleZoomMap} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabNotes pet={pet} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabContact pet={pet} />
      </TabPanel>
    </Box>
  );
}

export default IconLabelTabs;
