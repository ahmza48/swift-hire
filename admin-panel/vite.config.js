import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * The admin panel is a Vite/React SPA that ships INTO the Next.js host.
 *
 * - `base: '/admin/'` — every hashed asset URL is prefixed so it resolves
 *   under the mounted subpath on the agency site.
 * - `build.outDir: '../public/admin'` — the build output lands in the
 *   Next.js project's public folder. Next serves the SPA at /admin/*, and
 *   a rewrite in next.config.ts sends any deep link (client-side route)
 *   back to /admin/index.html for the router.
 * - Dev proxy points at Next on :3000 so /api/admin/* works while running
 *   `pnpm dev:admin` alongside `pnpm dev`.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/admin/',
  build: {
    outDir: '../public/admin',
    emptyOutDir: true,
  },
  server: {
    port: 5174,
    proxy: {
      '/api/admin': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
