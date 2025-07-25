import React from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/user";
import { toast } from "sonner";
import type { User } from "@/types/user";
import type { LoginApiResponse, RegisterApiResponse } from "@/types/auth";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export function useLogin() {
	const setUser = useUserStore((s) => s.setUser);
	const clearUser = useUserStore((s) => s.clearUser);
	const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);
	const setAuthError = useAuthStore((s) => s.setAuthError);
	const setAuthLoading = useAuthStore((s) => s.setAuthLoading);
	const loginMutationLogin = useAuthStore((s) => s.login);

	return useMutation({
		mutationFn: async ({
			email,
			password,
		}: {
			email: string;
			password: string;
		}) => {
			setAuthLoading(true);
			const res = await api.post<LoginApiResponse>("/auth/login", {
				email,
				password,
			});
			return res.data;
		},
		onSuccess: (data) => {
			setAuthLoading(false);

			if (!data.success || !data.responseObject) {
				const msg = data.message || "Login gagal.";
				setIsAuthenticated(false);
				clearUser();
				setAuthError(msg);
				toast.error(msg, {
					icon: React.createElement(AlertTriangle, {
						className: "text-red-600",
					}),
					className:
						"bg-red-50 text-red-800 border-red-200 dark:bg-red-900/70 dark:text-red-200",
					duration: 4000,
				});
				return;
			}

			const user = (data.responseObject.user ?? { email: "" }) as User;
			setUser(user);
			setIsAuthenticated(true);
			setAuthError(null);
			loginMutationLogin(
				data.responseObject.accessToken,
				data.responseObject.refreshToken,
				user
			);
			toast.success(data.message || "Login berhasil!", {
				icon: React.createElement(CheckCircle, { className: "text-green-600" }),
				className:
					"bg-green-50 text-green-800 border-green-200 dark:bg-green-900/80 dark:text-green-200",
				duration: 3500,
			});
		},
		onError: (error: any) => {
			const msg =
				error?.response?.data?.message || error?.message || "Login gagal.";
			setIsAuthenticated(false);
			clearUser();
			setAuthError(msg);
			setAuthLoading(false);
			toast.error(msg, {
				icon: React.createElement(AlertTriangle, { className: "text-red-600" }),
				className:
					"bg-red-50 text-red-800 border-red-200 dark:bg-red-900/70 dark:text-red-200",
				duration: 4000,
			});
		},
	});
}

export function useRegister() {
	const setAuthLoading = useAuthStore((s) => s.setAuthLoading);

	return useMutation({
		mutationFn: async ({
			email,
			password,
		}: {
			email: string;
			password: string;
		}) => {
			setAuthLoading(true);
			const res = await api.post<RegisterApiResponse>("/auth/register", {
				email,
				password,
			});
			return res.data;
		},
		onSuccess: (data) => {
			setAuthLoading(false);
			if (!data.success) {
				toast.error(data.message || "Registrasi gagal.", {
					icon: React.createElement(XCircle, { className: "text-red-600" }),
					className:
						"bg-red-50 text-red-800 border-red-200 dark:bg-red-900/70 dark:text-red-200",
					duration: 4000,
				});
			} else {
				toast.success(data.message || "Registrasi berhasil!", {
					icon: React.createElement(CheckCircle, {
						className: "text-green-600",
					}),
					className:
						"bg-green-50 text-green-800 border-green-200 dark:bg-green-900/80 dark:text-green-200",
					duration: 3500,
				});
			}
		},
		onError: (error: any) => {
			const msg =
				error?.response?.data?.message || error?.message || "Registrasi gagal.";
			setAuthLoading(false);
			toast.error(msg, {
				icon: React.createElement(AlertTriangle, { className: "text-red-600" }),
				className:
					"bg-red-50 text-red-800 border-red-200 dark:bg-red-900/70 dark:text-red-200",
				duration: 4000,
			});
		},
	});
}
