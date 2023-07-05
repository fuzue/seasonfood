import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ue.fuz.seasonalfood',
  appName: 'Seasonal Food',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
