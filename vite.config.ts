import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Get API URL from environment, strip /api/v1 since proxy adds /api
  const apiUrl = env.VITE_API_BASE_URL?.replace('/api/v1', '') ?? 'http://localhost:8000';

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: mode === 'production',
        },
      },
    },
  };
});
