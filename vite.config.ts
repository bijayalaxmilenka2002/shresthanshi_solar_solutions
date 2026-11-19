import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.MONGODB_URI && !process.env.MONGODB_URI) {
    process.env.MONGODB_URI = env.MONGODB_URI;
  }
  if (env.MONGODB_DB_NAME && !process.env.MONGODB_DB_NAME) {
    process.env.MONGODB_DB_NAME = env.MONGODB_DB_NAME;
  }

  return {
    plugins: [
      react(),
      {
        name: 'api-dev-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const url = req.url || '';
            if (url.startsWith('/api/leads')) {
              try {
                const { default: handler } = await import('./api/leads');
                return handler(req, res);
              } catch (err) {
                console.error('Dev API Error (/api/leads):', err);
              }
            } else if (url.startsWith('/api/settings')) {
              try {
                const { default: handler } = await import('./api/settings');
                return handler(req, res);
              } catch (err) {
                console.error('Dev API Error (/api/settings):', err);
              }
            } else if (url.startsWith('/api/health')) {
              try {
                const { default: handler } = await import('./api/health');
                return handler(req, res);
              } catch (err) {
                console.error('Dev API Error (/api/health):', err);
              }
            }
            next();
          });
        },
      },
    ],
    server: {
      port: 5173,
      host: true,
    },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('html2canvas') || id.includes('dompurify')) {
                return 'vendor-export';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
            }
          },
        },
      },
    },
  };
});
