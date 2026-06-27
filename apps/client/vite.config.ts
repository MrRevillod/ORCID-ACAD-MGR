import tailwindcss from "@tailwindcss/vite"

import { defineConfig } from "vite"
import { sveltekit } from "@sveltejs/kit/vite"

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	cacheDir: process.env.VITE_CACHE_DIR ?? "node_modules/.vite",
	server: {
		host: "0.0.0.0",
		port: 5173,
		strictPort: true,
		allowedHosts: ["localhost", "127.0.0.1"],
		hmr: {
			clientPort: 80,
		},
	},
})
