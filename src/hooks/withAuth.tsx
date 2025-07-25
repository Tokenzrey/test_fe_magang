import React, { useEffect, useState, PropsWithChildren } from "react";
import { useNavigate } from "@tanstack/react-router";
import api from "@/lib/api";
import {
	getToken,
	getRefreshToken,
	setToken,
	setRefreshToken,
	removeToken,
	removeRefreshToken,
} from "@/lib/cookies";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/user";
import { toast } from "sonner";
import { User } from "@/types/user";
import { WithAuthOptions } from "@/types/withAuth";

/**
 * HOC for authentication/authorization, with token refresh, logout, and redirect to /auth if not authenticated.
 * Usage: export default withAuth(MyComponent, { allowedRoles: ["ADMIN"] })
 */
export function withAuth<P extends object>(
	WrappedComponent: React.ComponentType<P>,
	options?: WithAuthOptions
) {
	const {
		allowedRoles,
		loadingComponent = <div className="text-center p-10">Memuat...</div>,
	} = options || {};

	const ComponentWithAuth = (props: PropsWithChildren<P>) => {
		const [loading, setLoading] = useState(true);
		const [authorized, setAuthorized] = useState(false);

		const setUser = useUserStore((s) => s.setUser);
		const clearUser = useUserStore((s) => s.clearUser);
		const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);
		const setAuthLoading = useAuthStore((s) => s.setAuthLoading);
		const logout = useAuthStore((s) => s.logout);

		const navigate = useNavigate();

		const checkRole = (role: string | undefined) =>
			!allowedRoles ||
			allowedRoles.length === 0 ||
			(role && allowedRoles.includes(role));

		const tryRefreshToken = async (): Promise<boolean> => {
			const accessToken = getToken();
			const refreshToken = getRefreshToken();
			if (!accessToken || !refreshToken) {
				return false;
			}
			try {
				const res = await api.post("/auth/refresh", undefined, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"x-refresh-token": refreshToken,
					},
				});
				const { success, responseObject } = res.data;
				if (success && responseObject) {
					setToken(responseObject.accessToken);
					setRefreshToken(responseObject.refreshToken);
					return true;
				}
				return false;
			} catch (error) {
				return false;
			}
		};

		useEffect(() => {
			let cancelled = false;
			const checkAuth = async () => {
				setAuthLoading(true);
				setLoading(true);

				let accessToken = getToken();

				if (!accessToken) {
					setLoading(false);
					setIsAuthenticated(false);
					setAuthorized(false);
					clearUser();
					if (!cancelled) navigate({ to: "/auth" });
					return;
				}

				// 1. Try /auth/me
				try {
					const res = await api.get("/auth/me", {
						headers: { Authorization: `Bearer ${accessToken}` },
					});
					const { success, responseObject } = res.data;

					if (success && responseObject) {
						setIsAuthenticated(true);
						setUser(responseObject as User);

						if (checkRole(responseObject.role)) {
							setAuthorized(true);
							setLoading(false);
							setAuthLoading(false);
							return;
						} else {
							setAuthorized(false);
							setLoading(false);
							setAuthLoading(false);
							toast.error("Akses ditolak: Role tidak sesuai.");
							if (!cancelled) navigate({ to: "/auth" });
							return;
						}
					}
				} catch (err: any) {
					// If 401, try refresh
					if (err?.response?.status === 401) {
						const refreshed = await tryRefreshToken();
						if (refreshed) {
							// Try /auth/me again after refresh
							accessToken = getToken();
							try {
								const res2 = await api.get("/auth/me", {
									headers: { Authorization: `Bearer ${accessToken}` },
								});
								const { success: success2, responseObject: responseObject2 } =
									res2.data;

								if (success2 && responseObject2) {
									setIsAuthenticated(true);
									setUser(responseObject2 as User);

									if (checkRole(responseObject2.role)) {
										setAuthorized(true);
										setLoading(false);
										setAuthLoading(false);
										return;
									} else {
										setAuthorized(false);
										setLoading(false);
										setAuthLoading(false);
										toast.error("Akses ditolak: Role tidak sesuai.");
										if (!cancelled) navigate({ to: "/auth" });
										return;
									}
								}
							} catch (err2) {
								// do nothing
							}
						}
					}
				}

				// If all fails (me gagal, refresh gagal, me after refresh gagal)
				setIsAuthenticated(false);
				setAuthorized(false);
				setLoading(false);
				setAuthLoading(false);
				clearUser();
				removeToken();
				removeRefreshToken();
				toast.error("Sesi login Anda telah habis. Silakan login kembali.");
				logout();
				if (!cancelled) navigate({ to: "/auth" });
			};

			checkAuth();

			return () => {
				cancelled = true;
			};
			// eslint-disable-next-line
		}, []);

		if (loading) return loadingComponent;
		if (!authorized) return null;

		return <WrappedComponent {...(props as P)} />;
	};

	return ComponentWithAuth;
}

export default withAuth;
