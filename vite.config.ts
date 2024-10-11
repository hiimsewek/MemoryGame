import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      strategies: "generateSW",
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*"],
      },
      includeAssets: ["**/*"],
    }),
  ],
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      data: "/src/data",
      store: "/src/store",
      styles: "/src/styles",
      types: "/src/types",
      utils: "/src/utils",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
});
