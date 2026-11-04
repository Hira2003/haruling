import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages serves this project from /haruling/, not the domain root.
  base: "/haruling/",
  plugins: [react()],
});