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
            const split = id.toString().split("node_modules/");
            const pathAfterNodeModules = split[split.length - 1];
            const packageName = pathAfterNodeModules.split("/")[0].startsWith("@")
              ? pathAfterNodeModules.split("/")[0] + "/" + pathAfterNodeModules.split("/")[1]
              : pathAfterNodeModules.split("/")[0];
            return packageName;
          }
        },
      },
    },
    chunkSizeWarningLimit: 800, // ✅ Temporary fix to suppress warnings
  },
});
