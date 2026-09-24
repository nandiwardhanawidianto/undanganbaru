import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [svgr(), react(), flowbiteReact()],
  server: {
    historyApiFallback: true, // biar route seperti /reva diarahkan ke index.html
    proxy: {
      "/cms-api": {
        target: "https://cms.royalweddinginvitiation.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\\/cms-api/, "/api"),
      },
    },
  },
});
