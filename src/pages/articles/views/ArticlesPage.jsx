import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ArticlesList = () => {
  const theme = useTheme();
  const [showPopup, setShowPopup] = useState(false);
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const colors = ['2474A3', '21ABCD', '31758D', '006980', '476997', '666699', '88AFD2', '8AB9F1'];

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const fontColor = 'white';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const popupShown = localStorage.getItem('articlesPopupShown');

    if (!popupShown) {
      setShowPopup(true);
      localStorage.setItem('articlesPopupShown', 'true');
    }
  }, []);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/articles/`);

        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Neizdevās ielādēt rakstus. Lūdzu, mēģiniet vēlāk.');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" disableGutters>
      <Typography
        component="h1"
        align="center"
        sx={{
          fontWeight: 800,
          fontSize: {
            xs: '1.5rem',
            sm: '2rem',
            md: '2.5rem',
            lg: '2.5rem',
          },
          mb: 5,
          background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Padomi
      </Typography>
      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid key={article.id} size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
            <Card>
              <Link
                to={`/articles/${article.slug}`}
                color="inherit"
                underline="none"
                style={{ textDecoration: 'none' }}
              >
                {article.paragraphs && article.paragraphs.length > 0 && (
                  <CardMedia
                    component="img"
                    //image={`https://res.cloudinary.com/dymne7cde/${article.paragraphs[0].image}`} // Updated image URL
                    image={`https://picsum.photos/600/400`}
                    alt={article.title}
                  />
                )}
                <CardContent sx={{ paddingBottom: '1rem !important' }}>
                  <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'justify' }}>
                    {article.title?.length > 30 ? `${article.title.slice(0, 30)}...` : article.title}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
        <DialogContent sx={{ position: 'relative', p: 4 }}>
          <IconButton
            aria-label="close"
            onClick={() => setShowPopup(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Alert severity="info">
            <AlertTitle>Piezīme</AlertTitle>
            Ja jums ir kādi ieteikumi vai atsauksmes par šiem rakstiem, droši sazinieties ar mums!
          </Alert>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ArticlesList;
