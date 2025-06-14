import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const beforeInstallPromptHandler = (event) => {
      console.log("✅ PWA Install Prompt is available!");
      event.preventDefault();  // Prevent the default install prompt
      setDeferredPrompt(event); // Save the event to prompt later
      setShowInstallButton(true); // Show the install button
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);  // Properly clean up
    };
  }, []);

  const installApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();  // Trigger the install prompt
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
        style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000, backgroundColor: "#00b3a4" }}
        onClick={installApp}
        startIcon={<InstallMobileIcon />}
      >
      Instalēt Lietotni
      </Button>
    )
  );
};

export default InstallPWAButton;
