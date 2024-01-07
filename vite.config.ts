import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'icon-192.png',
        'icon-512.png',
        'icon-192-maskable.png',
        'icon-512-maskable.png',
      ],
      manifest: {
        name: 'Nozzy Tunes',
        short_name: 'Nozzy Tunes',
        start_url: '/',
        theme_color: '#C1ADF6',
        display: 'minimal-ui',
        orientation: 'any',
        icons: [
          {
            src: 'favicon.ico',
            type: 'image/x-icon',
            sizes: '32x32',
          },
          { src: 'icon-192.png', type: 'image/png', sizes: '192x192' },
          { src: 'icon-512.png', type: 'image/png', sizes: '512x512' },
          {
            src: 'icon-192-maskable.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable any',
          },
          {
            src: 'icon-512-maskable.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable any',
          },
        ],
      },

      devOptions: {
        enabled: true,
      },
    }),
  ],
})
