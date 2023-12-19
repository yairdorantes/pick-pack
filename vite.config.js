import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
        short_name: "Pick&Pack",
        name: "Pick&Pack",
        icons: [
          {
            src: "vite.svg",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "vite.svg",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "vite.svg",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#FF5733",
        background_color: "#FF5733",
      },
    }),
  ],
});
