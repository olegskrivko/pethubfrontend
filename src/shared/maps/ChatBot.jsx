import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Box, Button, Chip, CircularProgress, Paper, TextField, Typography } from '@mui/material';

import catAvatar from '../pages/images/avatars/avatars/Animation-1747321325950.gif';
import dogAvatar from '../pages/images/avatars/avatars/Animation-1747321325950.gif';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ChatBot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [petType] = useState(Math.random() > 0.5 ? 'dog' : 'cat');
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false); // NEW

  const avatar = petType === 'dog' ? dogAvatar : catAvatar;

  const predefinedQuestions = [
    'Kā pareizi izvēlēties mājdzīvnieku?',
    'Ko darīt, ja esmu pazaudējis savu mājdzīvnieku?',
    'Kā pareizi rūpēties par mājdzīvnieku?',
  ];

  const handleChipClick = (question) => {
    if (loading) return;
    setNotLoggedIn(false); // reset
    setMessages((prev) => [...prev, { text: question, isUser: true }]);
    sendMessageToBackend(question);
  };

  const handleMessageSend = async () => {
    if (inputText.trim() && !loading) {
      setNotLoggedIn(false); // reset
      setMessages((prev) => [...prev, { text: inputText, isUser: true }]);
      const messageToSend = inputText;
      setInputText('');
      await sendMessageToBackend(messageToSend);
    }
  };

  const sendMessageToBackend = async (message) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setNotLoggedIn(true);
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/chatbot/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (data.type === 'pet_results') {
        setMessages((prev) => [
          ...prev,
          { pets: data.pets, isUser: false, type: 'pet_results' }
        ]);
      } else if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            text: data.reply,
            isUser: false,
          },
        ]);
      }
      // No fallback message for unrecognized response
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Atvainojiet, radās kļūda saziņā ar serveri.',
          isUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => setChatOpen(!chatOpen);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-3px); }
        75% { transform: translateX(3px); }
      }
    `;
    document.head.appendChild(style);

    const timer = setTimeout(() => {
      setShowSpeechBubble(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      {!chatOpen && showSpeechBubble && (
        <Typography
          variant="caption"
          style={{
            position: 'fixed',
            bottom: 90,
            right: 90,
            backgroundColor: '#fff',
            padding: '4px 10px',
            borderRadius: '10px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            fontSize: '12px',
            zIndex: 9999,
          }}
        >
          Sveiki!
        </Typography>
      )}

      {!chatOpen && (
        <Button
          onClick={toggleChat}
          style={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderRadius: '50%',
            width: '70px',
            height: '70px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            animation: 'shake 0.5s ease-in-out 1s 3',
            zIndex: 9999,
          }}
        >
          <Avatar src={avatar} alt="Pet Avatar" style={{ width: '60px', height: '60px' }} />
        </Button>
      )}

      {chatOpen && (
        <Box
          style={{
            position: 'fixed',
            bottom: isFullscreen ? 0 : 16,
            right: isFullscreen ? 0 : 16,
            width: isFullscreen ? '100vw' : '300px',
            height: isFullscreen ? '100vh' : '400px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
            borderRadius: isFullscreen ? 0 : '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 9999,
            transition: 'all 0.3s ease',
          }}
        >
          <Box
            style={{
              backgroundColor: '#0EB9F0',
              color: '#fff',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTopLeftRadius: isFullscreen ? 0 : '12px',
              borderTopRightRadius: isFullscreen ? 0 : '12px',
              background: 'linear-gradient(to right, rgba(0,150,136,0.7), rgba(63,81,181,0.7))',
            }}
          >
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={avatar} alt="Pet Avatar" />
              <Typography marginLeft={1} variant="h6">
                AI ChatBot
              </Typography>
            </Box>
            <Box>
              <Button onClick={() => setIsFullscreen((prev) => !prev)} style={{ color: '#fff' }}>
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </Button>
              <Button onClick={toggleChat} style={{ color: '#fff' }}>
                <CloseIcon />
              </Button>
            </Box>
          </Box>

          <Box
            style={{
              padding: '10px',
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                }}
              >
                {!message.isUser && (
                  <Avatar style={{ width: 30, height: 30, marginRight: 10 }} src={avatar} alt="Pet Avatar" />
                )}
                {message.type === 'pet_results' ? (
                  <Box>
                    {message.pets.length === 0 ? (
                      <Paper style={{ maxWidth: '70%', padding: '10px', borderRadius: '12px', backgroundColor: '#f1f1f1', color: '#000' }}>
                        Nekas netika atrasts.
                      </Paper>
                    ) : (
                      message.pets.map((pet, i) => (
                        <Paper key={i} style={{ margin: 8, padding: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                          <img src={pet.image} alt={pet.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, marginRight: 12 }} />
                          <Box>
                            <Typography variant="subtitle2">{pet.name}</Typography>
                            <Typography variant="body2">{pet.status_display} {pet.species_display}</Typography>
                            <a href={pet.url} target="_blank" rel="noopener noreferrer">Apskatīt</a>
                          </Box>
                        </Paper>
                      ))
                    )}
                  </Box>
                ) : (
                  <Paper
                    style={{
                      maxWidth: '70%',
                      padding: '10px',
                      borderRadius: '12px',
                      backgroundColor: message.isUser ? '#0EB9F0' : '#f1f1f1',
                      color: message.isUser ? '#fff' : '#000',
                    }}
                  >
                    {message.text}
                  </Paper>
                )}
              </Box>
            ))}

            <Box
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '10px',
                flexWrap: 'wrap',
              }}
            >
              {predefinedQuestions.map((question, index) => (
                <Chip
                  key={index}
                  label={question}
                  onClick={() => handleChipClick(question)}
                  color="primary"
                  style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
                  disabled={loading}
                />
              ))}
            </Box>
          </Box>

          {/* Show warning if not logged in */}
          {notLoggedIn && (
            <Typography
              variant="caption"
              color="error"
              style={{
                padding: '0 10px 6px',
                fontSize: '12px',
              }}
            >
              Lai izmantotu čatbotu, nepieciešama autorizācija.
            </Typography>
          )}

          <Box
            style={{
              display: 'flex',
              padding: '10px',
              backgroundColor: '#f7f7f7',
              borderBottomLeftRadius: isFullscreen ? 0 : '12px',
              borderBottomRightRadius: isFullscreen ? 0 : '12px',
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ieraksti savu ziņu..."
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !loading) {
                  e.preventDefault();
                  handleMessageSend();
                }
              }}
            />
            <Button
              onClick={handleMessageSend}
              color="primary"
              disabled={loading || inputText.trim() === ''}
              style={{ marginLeft: '10px', minWidth: '64px' }}
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatBot;
