import React, { useEffect, useState } from 'react';

import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import Button from '@mui/material/Button';

/**
 * PWA Install Button Component
 * Provides a button to install the Progressive Web App on supported devices
 * Only shows when the PWA install prompt is available
 */
const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    /**
     * Handles the beforeinstallprompt event
     * Saves the prompt event and shows the install button
     */
    const beforeInstallPromptHandler = (event) => {
      console.log('✅ PWA Install Prompt is available!');
      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, []);

  /**
   * Triggers the PWA installation prompt
   * Handles user choice and updates component state accordingly
   */
  const installApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted PWA install');
        } else {
          console.log('User dismissed PWA install');
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  return (
    showInstallButton && (
      <Button
        variant="contained"
        fullWidth
        style={{
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#00b3a4',
        }}
        onClick={installApp}
        startIcon={<InstallMobileIcon />}
      >
        Instalēt Lietotni
      </Button>
    )
  );
};

export default InstallPWAButton;
