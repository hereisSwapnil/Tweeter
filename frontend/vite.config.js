import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const { VITE_API_URL } = loadEnv("", process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: VITE_API_URL,
        changeOrigin: true,
        pathRewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
