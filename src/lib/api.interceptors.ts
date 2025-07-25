import type {
	AxiosInstance,
	AxiosRequestHeaders,
	InternalAxiosRequestConfig,
	AxiosError,
} from "axios";
import type { UninterceptedApiError } from "../types/api";
import Cookies from "universal-cookie";
import { transformApiError } from "./api.utils";
import { getToken } from "./cookies";

/**
 * Terapkan interceptors untuk instance axios.
 * Tidak ada dukungan Next.js, hanya SSR-compatible jika diimplementasikan secara manual.
 * ctx?: { cookies?: string } bisa digunakan pada SSR handler custom.
 */
export function applyInterceptors(
	instance: AxiosInstance,
	ctx?: { cookies?: string }
): void {
	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			config.headers = (config.headers ?? {}) as AxiosRequestHeaders;
			let token: string | undefined;

			if (typeof window === "undefined") {
				// SSR: ctx.cookies harus diberikan jika ingin support SSR
				if (ctx?.cookies) {
					const cookies = new Cookies(ctx.cookies);
					token = cookies.get("@test_be_magang");
				}
			} else {
				token = getToken();
			}

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(err: unknown) => Promise.reject(err)
	);

	instance.interceptors.response.use(
		(response) => response,
		(error: AxiosError<UninterceptedApiError>) => {
			// Integrasi Sentry atau logger lain bisa di sini jika dibutuhkan
			// Sentry.captureException(error);
			return Promise.reject(transformApiError(error));
		}
	);
}
