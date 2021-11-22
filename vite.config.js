import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            workbox: {
                skipWaiting: true,
                clientsClaim: true,
                offlineGoogleAnalytics: true,
            },
            includeAssets: [
                "/favicon.ico"
            ],
            manifest: {
                "name": "Dekadeka",
                "short_name": "Dekadeka",
                "start_url": "/dekadeka/",
                "background_color": "#2B9EEB",
                "theme_color": "#2B9EEB",
                "orientation": "omit",
                "display": "fullscreen",
                "icons": [
                    {
                        "src": "./icon-192x192.png",
                        "sizes": "192x192",
                        "destination": "assets"
                    },
                    {
                        "src": "./icon-512x512.png",
                        "sizes": "512x512",
                        "destination": "assets"
                    }
                ]
            }
        })
    ]
})
