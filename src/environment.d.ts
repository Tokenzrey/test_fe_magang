// TypeScript IntelliSense for VITE_ .env variables.
// VITE_ prefixed variables are exposed to the client while non-VITE_ variables aren't
// https://vitejs.dev/guide/env-and-mode.html

/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_APP_ENVIRONMENT: string;
	readonly VITE_API_URL_DEV: string;
	readonly VITE_API_URL_PROD: string;
	readonly VITE_MAPTILER_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
