import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
    exclude: ["node_modules", "dist", ".next", ".firebase", "__tests__/e2e/**/*"],
  },
});
