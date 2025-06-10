import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CardMedia, CircularProgress, Container, Grid, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { Helmet } from "react-helmet-async";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

import { format, parseISO } from 'date-fns';
import { lv } from 'date-fns/locale';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const ArticleDetails = () => {

  const { slug } = useParams();  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const paragraphRefs = useRef({});

  useEffect(() => {
    const fetchArticle = async () => {  
      try {
        const response = await axios.get(`${API_BASE_URL}/api/articles/${slug}/`);
  
        setArticle(response.data);
      } catch (err) {
        console.error(err);
        setError('Neizdevās ielādēt rakstu. Lūdzu, mēģiniet vēlāk.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchArticle();
  }, [slug]);
  

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 3 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!article) return null;

  const formattedDate = article?.published_at
    ? format(parseISO(article.published_at), "d. MMMM, yyyy HH:mm", { locale: lv })
    : 'Nezināms datums';

  const scrollToParagraph = (index) => {
    if (paragraphRefs.current[index]) {
      paragraphRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Container component="main" maxWidth="lg" >
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={article.summary} />
      </Helmet>

          
    <Typography variant="h4" align="center" sx={{ mb: 5, fontWeight: 800,
       
              
                      
                      background: "linear-gradient(60deg, #16477c 0%, #00b5ad 100%)",
                      WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
           }}>{article.title}</Typography>

      <Typography
  variant="body1"
  color="textSecondary"
  paragraph
  sx={{
    textAlign: "justify"
   
  }}
>
  {article.summary}
</Typography>


      {/* Published Date */}
      <Typography variant="body2" color="textSecondary" textAlign="left" sx={{ mb: 1, fontStyle: "italic" }}>
        Publicēts: {formattedDate}
      </Typography>


      {/* Table of Contents */}
      <List>
        {article.paragraphs?.map((paragraph, index) => (
          <ListItem key={paragraph.slug || index} disablePadding>
            <ListItemButton onClick={() => scrollToParagraph(index)}>
              <ListItemIcon>
                <TipsAndUpdatesIcon color="primary" />
              </ListItemIcon>
              <Typography variant="body1" sx={{ color: 'blue', marginLeft: "-1rem" }}>
                {paragraph.title}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Article Content */}
      <Box sx={{ mt: 4 }}>
        {article.paragraphs?.map((paragraph, index) => (
          <Grid 
            container 
            spacing={3} 
            key={paragraph.slug || index} 
            mb={2} 
            ref={(el) => (paragraphRefs.current[index] = el)}
          >
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} order={{ xs: 2, md: index % 2 === 0 ? 1 : 2 }}>
              <CardMedia sx={{ height: 700 }} 
              //image={`https://res.cloudinary.com/dymne7cde/${paragraph.image}`} 
                 image={`https://picsum.photos/600/400`}
              title={paragraph.title} />
              <Typography variant="caption" color="textSecondary">
                Ilustrācija izveidota ar Mākslīgā Intelekta palīdzību
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }} order={{ xs: 1, md: index % 2 === 0 ? 2 : 1 }}>
              <Typography variant="h5" sx={{ mb: 2, color: "#16477c" }}>
                {paragraph.title}
              </Typography>
              <Typography variant="body1" color="textSecondary"   sx={{
    textAlign: "justify"
   
  }}>
                {paragraph.text}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Container>
  );
};

export default ArticleDetails;
