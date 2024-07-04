import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/My-WebSite/",
  server: {
    proxy: {
      "/riot/sea": {
        target: "https://riot-api-proxy.herokuapp.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/riot\/sea/, "/riot/sea"),
      },
      "/riot/asia": {
        target: "https://riot-api-proxy.herokuapp.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/riot\/asia/, "/riot/asia"),
      },
    },
  },
});
