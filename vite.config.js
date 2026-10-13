import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/e-sertifikat-app/",
  server: {
    // Pilihan A: Mengizinkan semua domain dari Ngrok (Lebih Aman)
    allowedHosts: [".ngrok-free.app"],

    // Pilihan B: Mengizinkan host apa saja (Praktis untuk dev)
    // allowedHosts: true
  },
});
