import React, { useEffect, useState } from 'react';

import { AccessTime, Email, Euro, LocationOn, Phone } from '@mui/icons-material';
import { Facebook, Instagram, Language, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MapIcon from '@mui/icons-material/Map';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import axios from 'axios';
import moment from 'moment';

const TabNotes = ({ service }) => {
  return (
    <Card
      elevation={3}
      sx={{ background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)', borderRadius: 3, p: { xs: 2, md: 3 } }}
    >
      <Stack spacing={2}>
        {/* Display contact info and social media */}
        {/* Similar logic for phone, email, website, and social media */}

        {/* Phone */}
        {service.phone_number && service.phone_code && (
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              style={{
                backgroundColor: '#555',
                color: '#4FCE5D',
                pointerEvents: 'none',
              }}
            >
              <WhatsAppIcon />
            </IconButton>{' '}
            <MuiLink href={`tel:${service.phone_code}${service.phone_number}`} underline="hover" color="inherit">
              {service.phone_code} {service.phone_number}
            </MuiLink>
          </Box>
        )}
        {/* Email */}
        {service.email && (
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              style={{
                backgroundColor: '#555',
                color: '#FFDE21',
                pointerEvents: 'none',
              }}
            >
              <Email />
            </IconButton>{' '}
            <MuiLink href={`mailto:${service.email}`} underline="hover" color="inherit">
              {service.email}
            </MuiLink>
          </Box>
        )}

        {/* Website */}

        {service.website && (
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              style={{
                backgroundColor: '#555',
                color: '#90D5FF',
                pointerEvents: 'none',
              }}
            >
              <Language />
            </IconButton>{' '}
            <MuiLink href={service.website} target="_blank" rel="noopener" underline="hover" color="inherit">
              {service.website.replace(/^https?:\/\//, '')}
            </MuiLink>
          </Box>
        )}

        {/* Socials */}
        {Array.isArray(service.social_media) && service.social_media.length > 0 && (
          <>
            {service.social_media.map((social, idx) => {
              const iconMap = {
                Facebook: <Facebook color="primary" />,
                Instagram: <Instagram sx={{ color: '#E4405F' }} />,
                Twitter: <Twitter sx={{ color: '#1DA1F2' }} />,
                LinkedIn: <LinkedIn sx={{ color: '#0077B5' }} />,
                YouTube: <YouTube sx={{ color: '#FF0000' }} />,
              };

              const icon = iconMap[social.platform] || null;

              return (
                <Typography key={idx} variant="body1" sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
                  <IconButton
                    style={{
                      backgroundColor: '#555',
                      color: '#90D5FF',
                      pointerEvents: 'none',
                    }}
                  >
                    {icon}
                  </IconButton>

                  <MuiLink href={social.profile_url} target="_blank" rel="noopener" underline="hover" color="inherit">
                    {social.profile_url.replace(/^https?:\/\//, '')}
                  </MuiLink>
                </Typography>
              );
            })}
          </>
        )}
      </Stack>
    </Card>
  );
};

export default TabNotes;
