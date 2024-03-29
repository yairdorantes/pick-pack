import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // chunkSizeWarningLimit: 3 * 1024 * 1024, // Set the chunk size warning limit to 3MB

    maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // Set the maximum file size to be precached to 3MB
  },
  server: {
    https: false,
  },
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      devOptions: {
        enabled: true,
        // type: "module",
      },
      // add this to cache all the imports
      workbox: {
        globPatterns: ["**/*"],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ["**/*"],
      registerType: "autoUpdate",
      manifest: {
        short_name: "Eurocotton Fulfillment",
        name: "Eurocotton Fulfillment",
        icons: [
          {
            src: "/oms3.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/oms2.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "/oms2.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        // start_url: ".",
        start_url: "/picking",
        display: "standalone",
        theme_color: "#0041a1",
        background_color: "#0041a1",
      },
    }),
  ],
});
