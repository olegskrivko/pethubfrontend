
// export default HolidayCard;
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const translations = {
  "Independence Day": "Latvijas Neatkarības diena",
  "Christmas Day": "Ziemassvētki",
  "Good Friday": "Lielā Piektdiena",
  "Easter Sunday": "Lieldienas",
  "May Day": "Darba svētki",
  "Lielā Sestdiena": "Lielā Sestdiena ir diena pirms Lieldienām."
  // add more as needed
};

const HolidayCard = () => {
  const [holiday, setHoliday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHoliday = async () => {
      try {
        const today = new Date();
        const isoDate = today.toISOString().split('T')[0];

        const response = await axios.get('https://calendarific.com/api/v2/holidays', {
          params: {
            api_key: 'g6wUAz4FN12e3UbwWPb2g2dKJBgX1Phr',
            country: 'LV',
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate(),
          },
        });

        const holidays = response.data.response.holidays;
        const todayHoliday = holidays.find((h) => h.date.iso === isoDate);

        setHoliday(todayHoliday);
      } catch (err) {
        setError('Neizdevās ielādēt svētku dienas datus.');
      } finally {
        setLoading(false);
      }
    };

    fetchHoliday();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!holiday) return <Alert severity="info">Šodien nav valsts svētku.</Alert>;

  const date = new Date().toLocaleDateString('lv-LV', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const translatedName = translations[holiday.name] || holiday.name;

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 3, backgroundColor: '#fff3e0' }}>
      <CardContent>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 'bold', color: 'orange', mb: 1 }}
        >
          📅 {date}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', color: 'red', mb: 1 }}
        >
          {translatedName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {holiday.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HolidayCard;
