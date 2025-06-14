// DrawerAppBar.js
import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// React MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import PetsIcon from '@mui/icons-material/Pets';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../LanguageSelector';
import { LanguageContext } from '../../contexts/LanguageContext';
// import Logout from './Logout'; 




import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;


const navItems = {
  '/pets': 'pets',
  '/shelters': 'shelters',
  '/services': 'services',
  '/articles': 'guides',

};

function DrawerAppBar(props) {
  const { t } = useTranslation('navbar'); 


  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, logout } = useAuth(); // Get user and logout from AuthContext
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);

  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    logout();
    console.log('Logout successful');
    navigate('/login'); // Redirect to login page after logout
  };

  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center',   }}>
      <Box 
        style={{
          width: '100%',
          height: '3.5rem',
          // backgroundColor: '#5B9BD5',
          background: 'linear-gradient(to right, rgba(0,150,136,0.7), rgba(63,81,181,0.7))',
          // backgroundColor: '#03a9f4',
          // backgroundColor: '#4B5AED', cool violet
        
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
        }}
      >
       
        <Typography variant="body1"  ml={2} >
          <Link 
            to="/"
            style={{
              color: '#16477c',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              
        
            }}
          >
            <PetsIcon sx={{ marginRight: '0.4rem', color: '#16477c' }} /> PawClix
          </Link>
        </Typography>
      
      </Box>

      <Divider />
      <List>
      {/* {Object.entries(navItems).map(([path, itemName]) => (
          <ListItem  key={path} disablePadding>
            <ListItemButton sx={{ textAlign: 'left' }}>
              <Link to={path} style={{ textDecoration: 'none', width: '100%' }}>
                <ListItemText primary={itemName} />
            
              </Link>
            </ListItemButton>
          </ListItem>
        ))} */}
        {Object.entries(navItems).map(([path, key]) => (
           <ListItem  key={path} disablePadding>
            <ListItemButton sx={{ textAlign: 'left' }}>
  <Link key={path} to={path} style={{textDecoration: 'none', color: "#16477c"}}>
    <ListItemText primary={t(key)}  />
  </Link>
  </ListItemButton>
  </ListItem>
))}

      
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'left' }}>
            <Link to={user ? "/user-profile" : "/login"} style={{ textDecoration: 'none',color: "#16477c", width: '100%' }}>
              <ListItemText primary={user ? t('profile') : t('login')} />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box         sx={{ flexGrow: 1,  zIndex: "99"  }}>
      <AppBar  component="nav" position="static" 
        sx={{
          // background: '#5B9BD5' ,   
                background: 'linear-gradient(to right, rgba(0,150,136,0.7), rgba(63,81,181,0.7))',
                // background: "linear-gradient(190deg, #16477c 0%, #00b5ad 100%)",
        }}
      >
        <Container disableGutters>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
     
            <Typography variant="h6" component="div">
              <Link
                to="/"
                style={{
                  color: '#16477c',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <PetsIcon sx={{ marginRight: '0.4rem', color: '#16477c' }} />
                PawClix
              </Link>
            </Typography>
          
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {/* {Object.entries(navItems).map(([path, itemName]) => (
              <Link key={path} to={path}>
                <Button size='small' sx={{ color: '#fff', fontWeight: '400' }}>{itemName}</Button>
              </Link>
            ))} */}
          {Object.entries(navItems).map(([path, key]) => (
          //  <ListItem  key={path} >
          //   <ListItemButton sx={{ textAlign: 'left' }}>
  <Link key={path} to={path} style={{textDecoration: 'none', color: "#fff"}}>
    {/* <ListItemText primary={t(key)}  /> */}
    <Button size='small' sx={{ color: '#fff', fontWeight: '400' }}>{t(key)}</Button>
  </Link>
  // </ListItemButton>
  // </ListItem>
))}

             {/* Show Profile or Login Button */}
             <Link to={user ? "/user-profile" : "/login"}>
                <Button size='small' sx={{ color: '#fff', backgroundColor: "#16477c" }}>
                  {user ? t("profile") : t("login")}
                </Button>
              </Link>
            </Box>
            <LanguageSelector />
          </Toolbar>
        </Container>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
  
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
           
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default DrawerAppBar;