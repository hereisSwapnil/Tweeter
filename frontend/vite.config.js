import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.217.224:8000",
        changeOrigin: true,
        pathRewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
