import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import InstallPWAButton from '../../InstallPWAButton';
import { APP_NAME } from '../../constants/config';
import { LanguageContext } from '../../contexts/LanguageContext';

const Footer = () => {
  const YEAR = new Date().getFullYear();

  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const { t } = useTranslation('footer');
  const appLinks = [
    { path: '/', label: { lv: 'Galvenā', en: 'Home', ru: 'Главная' } },
    { path: '/about', label: { lv: 'Par mums', en: 'About us', ru: 'О нас' } },
    {
      path: '/pets',
      label: {
        lv: 'Meklēt mājdzīvniekus',
        en: 'Find a pet',
        ru: 'Найти питомца',
      },
    },
    // {
    //   path: '/services',
    //   label: { lv: 'Pakalpojumi', en: 'Services', ru: 'Услуги' },
    // },
  ];

  const exploreLinks = [
    // {
    //   path: '/shelters',
    //   label: {
    //     lv: 'Dzīvnieku patversmes',
    //     en: 'Animal shelters',
    //     ru: 'Приюты для животных',
    //   },
    // },
    {
      path: '/articles',
      label: {
        lv: 'Mājdzīvnieku aprūpes padomi',
        en: 'Pet care tips',
        ru: 'Советы по уходу за питомцами',
      },
    },
    {
      path: '/virtual-pet-training-classes',
      label: {
        lv: 'Suņu skola',
        en: 'Dog school',
        ru: 'Школа для собак',
      },
    },
  ];

  const policyLinks = [
    {
      path: '/policies',
      label: {
        lv: 'Politikas un vadlīnijas',
        en: 'Policies and guidelines',
        ru: 'Политика и рекомендации',
      },
    },
    {
      path: '/pet-matching-quiz',
      label: {
        lv: 'Kādu mājdzīvnieku izvēlēties?',
        en: 'Which pet should I choose?',
        ru: 'Какого питомца выбрать?',
      },
    },

    {
      path: '/pricing',
      label: {
        lv: 'Maksāšanas plāns',
        en: 'Pricing plan',
        ru: 'Платёжный план',
      },
    },
  ];

  const infoLinks = [
    {
      path: '/contact',
      label: { lv: 'Kontakti', en: 'Contact', ru: 'Контакты' },
    },
    {
      path: '/support',
      label: { lv: 'Atbalsts', en: 'Support', ru: 'Поддержка' },
    },
    {
      path: '/frequently-asked-questions',
      label: {
        lv: 'Biežāk uzdotie jautājumi',
        en: 'Frequently asked questions',
        ru: 'Часто задаваемые вопросы',
      },
    },
  ];

  return (
    <React.Fragment>
      <Box
        component="footer"
        sx={{
          padding: '20px 0',
          textAlign: 'center',
          marginTop: 'auto',
          // paddingBottom: '2rem',
          width: '100%',
          margin: 0,

          // background: '#5B9BD5 !important',
          // background: 'linear-gradient(to right, rgba(0,150,136,0.7), rgba(63,81,181,0.7))',
          background: 'linear-gradient(190deg, #16477c 0%, #00b5ad 100%)',
        }}
      >
        <Container
          component="main"
          sx={{
            flexGrow: 1,
            paddingTop: '2rem',
            paddingBottom: '2rem',
            width: '100%',
            overflowX: 'hidden',
            py: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
            px: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 3, md: 3, lg: 3 }} textAlign="left">
              <Typography variant="h6" color="#DAFF84" style={{ fontWeight: '500' }}>
                {t('getStarted')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {appLinks.map((link) => (
                  <Typography
                    key={link.path}
                    variant="body1"
                    style={{
                      fontWeight: '400',
                      color: '#EAEAEA',
                      pointerEvents: 'auto',
                    }}
                  >
                    <Link key={link.path} to={link.path} style={{ color: '#EAEAEA', textDecoration: 'none' }}>
                      {link.label[selectedLanguage] || link.label.en}
                    </Link>
                  </Typography>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 3, md: 3, lg: 3 }} textAlign="left">
              <Typography variant="h6" color="#DAFF84" style={{ fontWeight: '500' }}>
                {t('resources')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {exploreLinks.map((link) => (
                  <Typography
                    key={link.path}
                    variant="body1"
                    style={{
                      fontWeight: '400',
                      color: '#EAEAEA',
                      pointerEvents: 'auto',
                    }}
                  >
                    <Link key={link.path} to={link.path} style={{ color: '#EAEAEA', textDecoration: 'none' }}>
                      {link.label[selectedLanguage] || link.label.en}
                    </Link>
                  </Typography>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 3, md: 3, lg: 3 }} textAlign="left">
              <Typography variant="h6" color="#DAFF84" style={{ fontWeight: '500' }}>
                {t('learnMore')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {policyLinks.map((link) => (
                  <Typography
                    key={link.path}
                    variant="body1"
                    style={{
                      fontWeight: '400',
                      color: '#EAEAEA',
                      pointerEvents: 'auto',
                    }}
                  >
                    <Link key={link.path} to={link.path} style={{ color: '#EAEAEA', textDecoration: 'none' }}>
                      {link.label[selectedLanguage] || link.label.en}
                    </Link>
                  </Typography>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 3, md: 3, lg: 3 }} textAlign="left">
              <Typography variant="h6" color="#DAFF84" style={{ fontWeight: '500' }}>
                {t('info')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {infoLinks.map((link) => (
                  <Typography
                    key={link.path}
                    variant="body1"
                    style={{
                      fontWeight: '400',
                      color: '#EAEAEA',
                      pointerEvents: 'auto',
                    }}
                  >
                    <Link key={link.path} to={link.path} style={{ color: '#EAEAEA', textDecoration: 'none' }}>
                      {link.label[selectedLanguage] || link.label.en}
                    </Link>
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Container>
          <Grid container>
            {/* SUPPORT */}
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} textAlign="center">
              <Typography gutterBottom variant="body2" sx={{ color: '#fff' }}>
                {t('supportMessage')} -{' '}
                <Link
                  to="/support"
                  style={{
                    color: '#DAFF84',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                  }}
                >
                  {t('support')}
                </Link>
              </Typography>
            </Grid>

            {/* COPYRIGHT */}
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} textAlign="center">
              <Typography gutterBottom variant="body2" color="#fff">
                &copy; {YEAR} {APP_NAME}. {t('copyright')}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Install PWA Button Section */}
      <InstallPWAButton />
    </React.Fragment>
  );
};

export default Footer;
