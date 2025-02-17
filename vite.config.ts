import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/rock-paper-scissors-lizard-Spock/", // Corrige o caminho no GitHub Pages
});
