/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import RubyPlugin from "vite-plugin-ruby";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), RubyPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./app/frontend", import.meta.url)),
      "@assets": fileURLToPath(new URL("./app/assets", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Remove problematic additionalData for now
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/",
        "app/frontend/test/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/vite-env.d.ts",
      ],
    },
  },
});
