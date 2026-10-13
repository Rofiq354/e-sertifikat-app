import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Pilihan A: Mengizinkan semua domain dari Ngrok (Lebih Aman)
    allowedHosts: [".ngrok-free.app"],
    base: "/e-sertifikat-app/",

    // Pilihan B: Mengizinkan host apa saja (Praktis untuk dev)
    // allowedHosts: true
  },
});
