import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Split out the heaviest libraries into their own files
            if (id.includes("lucide-react")) return "vendor-icons";
            if (id.includes("framer-motion")) return "vendor-animations";
            if (id.includes("dom-to-image-more")) return "vendor-utils";
            if (id.includes("react")) return "vendor-react-core";
            
            // Everything else goes into a general vendor chunk
            return "vendor";
          }
        },
      },
    },
    // Since we are splitting chunks, you can lower this limit back to 500
    chunkSizeWarningLimit: 600, 
  },
});
