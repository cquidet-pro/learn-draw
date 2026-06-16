import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base must match the GitHub Pages repo path so assets resolve correctly:
// https://cquidet-pro.github.io/learn-draw/
export default defineConfig({
  plugins: [react()],
  base: "/learn-draw/",
});
