import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	server: {
		proxy: {
			"/app": {
				target: "http://localhost:3000",
				changeOrigin: true,
				secure: false, // If your backend uses HTTP, not HTTPS
			},
		},
	},
	plugins: [react()],
});
