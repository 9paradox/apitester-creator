import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: () => {
          return `apitester-creator/[name]-[hash][extname]`;
        },
        chunkFileNames: "apitester-creator/[name]-[hash].js",
        entryFileNames: "apitester-creator/[name]-[hash].js",
      },
    },
  },
});
