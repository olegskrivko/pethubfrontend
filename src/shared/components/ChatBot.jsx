import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, Box, Button, Chip, CircularProgress, Paper, TextField, Typography } from '@mui/material';
import Lottie from 'lottie-react';

import AIRobot from '../../assets/Animation-1749072232400.json';
import { LanguageContext } from '../../contexts/LanguageContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ChatBot = () => {
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const { t } = useTranslation('chatbot');

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false); // NEW
  const avatar = AIRobot;

  const predefinedQuestions = [t('q1'), t('q2'), t('q3')];
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

      // const data = await response.json();
      // setMessages((prev) => [
      //   ...prev,
      //   {
      //     text: data.response || 'Atvainojiet, nesapratu jautājumu.',
      //     isUser: false,
      //   },
      // ]);
      const data = await response.json();

      // Always add the text response
      const newMessages = [
        {
          text: data.reply || 'Atvainojiet, nesapratu jautājumu.',
          isUser: false,
        },
      ];

      // If pets exist, add a pet list message
      if (data.pets && Array.isArray(data.pets)) {
        newMessages.push({
          isUser: false,
          pets: data.pets,
        });
      }

      setMessages((prev) => [...prev, ...newMessages]);
    } catch (error) {
      console.error('Error:', error);
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
            bottom: 100,
            right: 110,
            backgroundColor: '#fff',
            padding: '4px 10px',
            borderRadius: '10px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            fontSize: '12px',
            zIndex: 9999,
          }}
        >
          {t('hello')}
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
          <Box sx={{ width: 180, height: 180, marginRight: '30px' }}>
            <Lottie animationData={avatar} loop autoplay style={{ width: '90px', height: '90px' }} />
          </Box>
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
              <Box style={{ width: '50px', height: '50px' }}>
                <Lottie animationData={avatar} loop autoplay />
              </Box>
              <Typography marginLeft={1} variant="body1">
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
                  <Box style={{ width: '60px', height: '60px', marginRight: 10 }}>
                    <Lottie animationData={avatar} loop autoplay />
                  </Box>
                )}
                {/* <Paper
                  style={{
                    maxWidth: '70%',
                    padding: '10px',
                    borderRadius: '12px',
                    backgroundColor: message.isUser ? '#0EB9F0' : '#f1f1f1',
                    color: message.isUser ? '#fff' : '#000',
                  }}
                >
                  {message.text}
                </Paper> */}
                <Paper
                  style={{
                    maxWidth: '70%',
                    padding: '10px',
                    borderRadius: '12px',
                    backgroundColor: message.isUser ? '#0EB9F0' : '#f1f1f1',
                    color: message.isUser ? '#fff' : '#000',
                  }}
                >
                  {message.text && <Typography>{message.text}</Typography>}

                  {message.pets && Array.isArray(message.pets) && (
                    <Box mt={1}>
                      {message.pets.map((pet, i) => (
                        // <Box key={i} mb={1} p={1} style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
                        //   <Typography variant="subtitle2">{pet.name || 'Nezināms vārds'}</Typography>
                        //   <Typography variant="body2">{`${pet.species || ''}, ${pet.age || ''}, ${pet.size || ''}`}</Typography>
                        //   {pet.image && (
                        //     <img
                        //       src={pet.image}
                        //       alt={pet.name || 'Pet'}
                        //       style={{ width: '100%', borderRadius: '6px', marginTop: '6px' }}
                        //     />
                        //   )}
                        // </Box>
                        <a
                          href={pet.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <Box
                            key={i}
                            mb={1}
                            p={1}
                            style={{ border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer' }}
                          >
                            <Typography variant="subtitle2">{pet.name || 'Nezināms vārds'}</Typography>
                            <Typography variant="body2">{`${pet.status_display || ''} ${pet.species_display || ''}`}</Typography>
                            {pet.image && (
                              <img
                                src={pet.image}
                                alt={pet.name || 'Pet'}
                                style={{ width: '100%', borderRadius: '6px', marginTop: '6px' }}
                              />
                            )}
                          </Box>
                        </a>
                      ))}
                    </Box>
                  )}
                </Paper>
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
                  // color="primary"
                  style={{
                    cursor: loading ? 'not-allowed' : 'pointer',
                    background: '#e3f2fd',
                  }}
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
