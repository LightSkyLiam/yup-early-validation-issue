import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/yup-early-validation-issue/",
  plugins: [react()],
});
