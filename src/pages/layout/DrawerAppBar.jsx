// DrawerAppBar.js
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import PetsIcon from '@mui/icons-material/Pets';
// React MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// import logoImg from '../../assets/logo.svg';
//import logoImg from '../../assets/logo1.svg';
//import logoImg from '../../assets/logo2.svg';
//import logoImg from '../../assets/logo3.svg';
import logoImg from '../../assets/logo4.svg';
import { COMPANY_NAME } from '../../constants/config';
// import Logout from './Logout';

import { useAuth } from '../../contexts/AuthContext';
import { LanguageContext } from '../../contexts/LanguageContext';
// import LanguageSelector from '../LanguageSelector';
import LanguageSelectorTrigger from '../LanguageSelectorTrigger';

const drawerWidth = 240;

const navItems = {
  '/pets': 'pets',
  // '/shelters': 'shelters',
  // '/services': 'services',
  '/articles': 'guides',
};

function DrawerAppBar(props) {
  const { t } = useTranslation('navbar');

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);

  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    logout();
    console.log('Logout successful');
    navigate('/login');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box
        style={{
          width: '100%',
          height: '3.5rem',
          // backgroundColor: '#5B9BD5', for icons good
          // background: 'linear-gradient(to right, rgba(0,150,136,0.7), rgba(63,81,181,0.7))',
          background: 'linear-gradient(190deg, #16477c 0%, #00b5ad 100%)',
          // backgroundColor: '#03a9f4',
          // backgroundColor: '#4B5AED', cool violet

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
        }}
      >
        <Typography variant="body1" ml={2}>
          <Link
            to="/"
            style={{
              color: '#F5F3CE',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'Manrope, sans-serif', // 👈 Apply Manrope here
              fontWeight: 600, // Optional: Adjust weight
              letterSpacing: '0.5px', // Optional: Polish typography
            }}
          >
            {' '}
            <img
              src={logoImg}
              alt="Logo"
              style={{
                height: 28,
                marginRight: '0.5rem',
              }}
            />
            {/* <DarkModeIcon sx={{ marginRight: '0.4rem', color: '#F5F3CE' }} /> */}
            {COMPANY_NAME}
          </Link>
        </Typography>
      </Box>

      <Divider />
      <List>
        {Object.entries(navItems).map(([path, key]) => (
          <ListItem key={path} disablePadding>
            <ListItemButton sx={{ textAlign: 'left' }}>
              <Link
                key={path}
                to={path}
                style={{
                  textDecoration: 'none',
                  color: '#16477c',
                }}
              >
                <ListItemText primary={t(key)} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'left' }}>
            <Link
              to={user ? '/user-profile' : '/login'}
              style={{
                textDecoration: 'none',
                color: '#16477c',
                width: '100%',
              }}
            >
              <ListItemText primary={user ? t('profile') : t('login')} />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, zIndex: '99' }}>
      <AppBar
        component="nav"
        position="static"
        sx={{
          // background: '#5B9BD5' ,
          // background: 'linear-gradient(to right, rgba(0,150,136,0.7), rgba(63,81,181,0.7))',
          background: 'linear-gradient(190deg, #16477c 0%, #00b5ad 100%)',
        }}
      >
        <Container maxWidth="lg" disableGutters>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: { xs: 2, sm: 3 },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              size="small"
              sx={{ mr: 2, display: { sm: 'none' }, color: '#EAEAEA' }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" component="div">
              <Link
                to="/"
                style={{
                  color: '#B2FF59',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: 'Manrope, sans-serif', // 👈 Apply Manrope here
                  fontWeight: 600, // Optional: Adjust weight
                  letterSpacing: '0.5px', // Optional: Polish typography
                }}
              >
            
                <DarkModeIcon sx={{ marginRight: '0.4rem', color: '#B2FF59' }} />
                {COMPANY_NAME}
              </Link>
            </Typography> */}
            {/* Purpose	Color	Hex	Notes
Soft moonlight	#EAEAEA	Light gray white	Soft, minimal, modern moonlight
Silver Moon	#D6D6D6	Muted silver	Subtle and elegant
Lunar Glow	#F5F3CE	Pale warm yellow	Feels magical and soft
Cold Moon	#C1D3FF	Pale bluish white	Evokes a moon in a cold sky
Highlight Moon	#F0EAD6	Off-white ivory	Luxurious, soft light */}
            {/* 🌙 Lunar Glow	#F5F3CE	Pale, warm ivory yellow (you already used this — nice for soft magic)
✨ Starlight Tint	#FAFAD2	Light golden shimmer, more glowing than F5F3CE
🌟 Moongleam	#F0F8D9	A very soft, mint-tinted pale yellow — barely green, mostly glowing
💫 Halo Gold	#FFFACD	Slightly richer cream-yellow, still very gentle and not bold */}

            <Typography variant="h6" component="div">
              <Link
                to="/"
                style={{
                  color: '#FFFACD',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                }}
              >
                <img
                  src={logoImg}
                  alt="Logo"
                  style={{
                    height: 28,
                    marginRight: '0.5rem',
                  }}
                />
                {COMPANY_NAME}
              </Link>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {Object.entries(navItems).map(([path, key]) => (
                <Link
                  key={path}
                  to={path}
                  style={{
                    textDecoration: 'none',
                    color: '#EAEAEA',
                  }}
                >
                  <Button size="small" sx={{ color: '#EAEAEA', fontWeight: '400' }}>
                    {t(key)}
                  </Button>
                </Link>
              ))}

              {/* Show Profile or Login Button */}
              <Link to={user ? '/user-profile' : '/login'}>
                <Button size="small" sx={{ color: '#EAEAEA' }}>
                  {user ? t('profile') : t('login')}
                </Button>
              </Link>
            </Box>
            {/* <LanguageSelector /> */}
            <LanguageSelectorTrigger />
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
