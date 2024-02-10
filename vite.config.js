import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
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
        theme_color: "#FF5733",
        background_color: "#FF5733",
      },
    }),
  ],
});
