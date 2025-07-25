import axios, {
	AxiosError,
	InternalAxiosRequestConfig,
	AxiosRequestHeaders,
} from "axios";
import { getToken } from "./cookies";
import type { UninterceptedApiError } from "../types/api";

/**
 * Menentukan base URL API berdasarkan environment (Vite).
 */
export const baseURL =
	import.meta.env.MODE === "development"
		? import.meta.env.VITE_API_URL_DEV
		: import.meta.env.VITE_API_URL_PROD;

/**
 * Instance Axios untuk melakukan request ke API.
 */
export const api = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: false,
});

// Pastikan dengan eksplisit bahwa withCredentials adalah false.
api.defaults.withCredentials = false;

/**
 * Interceptor request untuk menambahkan header Authorization jika token tersedia.
 */
api.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		config.headers = (config.headers ?? {}) as AxiosRequestHeaders;
		const isBrowser = typeof window !== "undefined";
		let token: string | undefined;

		if (!isBrowser) {
			// Server-side: universal-cookie tanpa req.headers.cookie (tidak direkomendasikan di Vite, kecuali SSR Vite)
			// Bisa custom inject di SSR handler bila perlu
			token = undefined;
		} else {
			// Client-side: ambil token menggunakan helper getToken().
			token = getToken();
		}

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: unknown): Promise<never> => Promise.reject(error)
);

/**
 * Interceptor response untuk merapikan pesan error yang diterima dari API.
 */
api.interceptors.response.use(
	<T>(response: T): T => response,
	(error: AxiosError<UninterceptedApiError>): Promise<never> => {
		const message = error.response?.data?.message;

		if (message !== undefined && message !== null) {
			let refinedMessage = "";
			if (typeof message === "string") {
				refinedMessage = message;
			} else if (Array.isArray(message)) {
				refinedMessage = message[0] as string;
			} else if (typeof message === "object" && message !== null) {
				const keys = Object.keys(message);
				const firstKey = keys.length > 0 ? keys[0] : undefined;
				if (
					firstKey &&
					Array.isArray((message as Record<string, unknown>)[firstKey])
				) {
					refinedMessage = (message as Record<string, unknown[]>)[
						firstKey
					]?.[0] as string;
				} else {
					refinedMessage = JSON.stringify(message);
				}
			}
			return Promise.reject({
				...error,
				response: error.response
					? {
							...error.response,
							data: {
								...error.response.data,
								message: refinedMessage,
							},
						}
					: undefined,
			});
		}
		return Promise.reject(error);
	}
);

export default api;
