import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/My-WebSite/",
  server: {
    proxy: {
      "/riot/sea": {
        target:
          "https://cors-anywhere.herokuapp.com/https://sea.api.riotgames.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/riot\/sea/, ""),
      },
      "/riot/asia": {
        target:
          "https://cors-anywhere.herokuapp.com/https://asia.api.riotgames.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/riot\/asia/, ""),
      },
    },
  },
});
