import React, { useState } from 'react';

import AddCommentIcon from '@mui/icons-material/AddComment';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DescriptionIcon from '@mui/icons-material/Description';
import ExploreIcon from '@mui/icons-material/Explore';
import ForumIcon from '@mui/icons-material/Forum';
import GroupsIcon from '@mui/icons-material/Groups';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar, Box, Card, CardContent, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { Link } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';

import TabLocationHistory from '../../pets/components/TabLocationHistory';
import TabNotes from '../../pets/components/TabNotes';
import TabSendMessage from '../../pets/components/TabSendMessage';
import TabMessages from './TabMessages';
import TabReviews from './TabReviews';
import TabSocials from './TabSocials';

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

function ServiceIconLabelTabs({ service, onZoomMap }) {
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
          <Tab icon={<MapsHomeWorkIcon />} label="Vietas" sx={{ fontSize: '0.7rem' }} {...a11yProps(0)} />
          <Tab icon={<ShareIcon />} label="Sociālie Tīkli" sx={{ fontSize: '0.7rem' }} {...a11yProps(1)} />
          <Tab icon={<ReviewsIcon />} label="Atsauksmes" sx={{ fontSize: '0.7rem' }} {...a11yProps(2)} />
          {/* <Tab icon={<RateReviewIcon />} label="Rakstīt" sx={{ fontSize: '0.7rem' }} {...a11yProps(3)} /> */}
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        {/* <TabMessages pet={pet} sightings={sightings} onZoomMap={handleZoomMap} /> */}
        <TabMessages service={service} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabSocials service={service} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabReviews service={service} />
      </TabPanel>
      {/* <TabPanel value={value} index={3}>

      </TabPanel> */}
    </Box>
  );
}

export default ServiceIconLabelTabs;
