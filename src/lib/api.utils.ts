import { AxiosError } from "axios";
import type { UninterceptedApiError } from "../types/api";

/**
 * Normalize API error messages into a single string.
 */
export function transformApiError(
	error: AxiosError<UninterceptedApiError>
): AxiosError<UninterceptedApiError> {
	const response = error.response;
	if (response?.data && response.data.message) {
		let refined = "";
		const { message } = response.data;

		if (typeof message === "string") {
			refined = message;
		} else if (Array.isArray(message)) {
			refined = message[0] as string;
		} else if (typeof message === "object" && message !== null) {
			const keys = Object.keys(message);
			if (keys.length > 0 && typeof keys[0] !== "undefined") {
				const key = keys[0];
				const val = (message as Record<string, unknown>)[key];
				refined = Array.isArray(val) ? (val[0] as string) : JSON.stringify(val);
			} else {
				refined = JSON.stringify(message);
			}
		}

		response.data = { ...response.data, message: refined };
	}
	return error;
}
