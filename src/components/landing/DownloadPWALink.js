import { useState, useEffect } from 'react';


export const DownloadPWALink = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener(
      'beforeinstallprompt', handleBeforeInstallPrompt
    );

    return () => {
      window.removeEventListener(
        'beforeinstallprompt', handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = (e) => {
    e.preventDefault();
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          setDeferredPrompt(null);
        });
    }
  };

  return (
    <a href='/download' onClick={handleInstallClick}>Download</a>
  );
}
