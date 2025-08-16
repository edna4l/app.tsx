import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.violetsandvibes.app',
  appName: 'Violets and Vibes',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: '#8B5CF6',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#ffffff',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'light',
      backgroundColor: '#8B5CF6'
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true
    }
  }
};

export default config;
