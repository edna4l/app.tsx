// App Store readiness utilities
export const checkAppStoreReadiness = () => {
  const checks = {
    pwa: {
      manifest: !!document.querySelector('link[rel="manifest"]'),
      serviceWorker: 'serviceWorker' in navigator,
      themeColor: !!document.querySelector('meta[name="theme-color"]')
    },
    mobile: {
      viewport: !!document.querySelector('meta[name="viewport"]'),
      appleCapable: !!document.querySelector('meta[name="apple-mobile-web-app-capable"]'),
      touchIcon: !!document.querySelector('link[rel="apple-touch-icon"]')
    },
    performance: {
      https: location.protocol === 'https:',
      responsive: window.innerWidth <= 768 // Basic check
    }
  };
  
  return checks;
};

// Request notification permission
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  
  return false;
};