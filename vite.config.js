import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/API": {
        target: "http://localhost", // The target API server
        changeOrigin: true, // Needed to change the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/API/, "/API"), // Rewrite if needed
      },
    },
  },
});
