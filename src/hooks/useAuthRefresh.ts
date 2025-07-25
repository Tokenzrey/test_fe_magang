import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import type { RefreshApiResponse } from "@/types/auth";
import { getToken, getRefreshToken } from "@/lib/cookies";

/**
 * Hook untuk refresh token via /auth/refresh.
 * Menambahkan header Authorization dan x-refresh-token.
 */
export function useAuthRefresh() {
	// Ambil hooks dan store
	const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);
	const setAuthError = useAuthStore((s) => s.setAuthError);
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["auth", "refresh"],
		mutationFn: async () => {
			const accessToken = getToken();
			const refreshToken = getRefreshToken();

			const res = await api.post<RefreshApiResponse>(
				"/auth/refresh",
				{},
				{
					headers: {
						Authorization: accessToken ? `Bearer ${accessToken}` : "",
						"x-refresh-token": refreshToken ?? "",
					},
				}
			);
			if (!res.data.success || !res.data.data) {
				throw new Error(res.data.message || "Refresh token failed");
			}
			return res.data.data;
		},
		onSuccess: (_data) => {
			setIsAuthenticated(true);
			setAuthError(null);
			queryClient.invalidateQueries({ queryKey: ["auth", "refresh"] });
			toast.success("Session refreshed!");
		},
		onError: (error: any) => {
			setIsAuthenticated(false);
			setAuthError(error?.message || "Session expired");
			toast.error(error?.message || "Session expired. Please login again.");
		},
	});
}
