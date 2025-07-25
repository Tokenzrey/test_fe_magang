import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/user";
import { getToken } from "@/lib/cookies";
import type { User } from "@/types/user";
import type { MeApiResponse } from "@/types/auth";

/**
 * Hook untuk mendapatkan user saat ini dari /auth/me.
 * Menambahkan header Authorization jika token tersedia.
 */
export function useAuthMe(options?: { enabled?: boolean }) {
	const setUser = useUserStore((s) => s.setUser);
	const clearUser = useUserStore((s) => s.clearUser);
	const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);

	const query = useQuery<User>({
		queryKey: ["auth", "me"],
		queryFn: async () => {
			const token = getToken();
			const res = await api.get<MeApiResponse>("/auth/me", {
				headers: token ? { Authorization: `Bearer ${token}` } : undefined,
			});
			if (!res.data.success || !res.data.data) {
				throw new Error(res.data.message || "Unauthorized");
			}
			return res.data.data;
		},
		retry: false,
		...(options && typeof options === "object" ? options : {}),
	});

	useEffect(() => {
		if (query.isSuccess && query.data) {
			setUser(query.data);
			setIsAuthenticated(true);
		} else if (query.isError) {
			clearUser();
			setIsAuthenticated(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query.isSuccess, query.isError, query.data]);

	return query;
}
