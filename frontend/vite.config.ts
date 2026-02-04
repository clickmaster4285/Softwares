import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    fs: {
      allow: [".."],
    },
    // Proxy removed. Backend requests should use VITE_BACKEND_URL in the frontend .env
    // Example: VITE_BACKEND_URL=http://localhost:5000
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@root-assets": path.resolve(__dirname, "../assets"),
    },
  },
}));
