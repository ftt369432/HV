import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env': env,
      __FIREBASE_CONFIG__: {
        apiKey: JSON.stringify(env.VITE_FIREBASE_API_KEY),
        authDomain: JSON.stringify(env.VITE_FIREBASE_AUTH_DOMAIN),
        projectId: JSON.stringify(env.VITE_FIREBASE_PROJECT_ID),
        storageBucket: JSON.stringify(env.VITE_FIREBASE_STORAGE_BUCKET),
        messagingSenderId: JSON.stringify(env.VITE_FIREBASE_MESSAGING_SENDER_ID),
        appId: JSON.stringify(env.VITE_FIREBASE_APP_ID),
      }
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      port: 3000
    }
  };
});
