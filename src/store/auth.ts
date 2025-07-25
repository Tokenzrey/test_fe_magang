import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useUserStore } from "./user";
import {
	removeToken,
	removeRefreshToken,
	setRefreshToken,
	setToken,
} from "@/lib/cookies";
import type { User } from "@/types/user";

type AuthState = {
	isAuthenticated: boolean;
	authLoading: boolean;
	authError: string | null;
	login: (
		accessToken: string,
		refreshToken: string,
		user: User
	) => Promise<void>;
	logout: () => void;
	setAuthError: (err: string | null) => void;
	setAuthLoading: (loading: boolean) => void;
	setIsAuthenticated: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			authLoading: false,
			authError: null,

			setAuthError: (err) => set({ authError: err }),
			setAuthLoading: (loading) => set({ authLoading: loading }),
			setIsAuthenticated: (v) => set({ isAuthenticated: v }),

			login: async (accessToken, refreshToken, user) => {
				set({ authLoading: true, authError: null });
				try {
					setToken(accessToken);
					setRefreshToken(refreshToken);
					useUserStore.getState().setUser(user);
					set({ isAuthenticated: true, authLoading: false, authError: null });
				} catch (e: any) {
					let message = "Terjadi kesalahan server.";
					if (e?.response?.data?.message) message = e.response.data.message;
					set({
						authError: message,
						authLoading: false,
						isAuthenticated: false,
					});
					removeToken();
					useUserStore.getState().clearUser();
				}
			},

			logout: () => {
				set({ isAuthenticated: false });
				set({ authLoading: false });
				removeToken();
				removeRefreshToken();
				useUserStore.getState().clearUser();
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				isAuthenticated: state.isAuthenticated,
				authError: state.authError,
			}),
		}
	)
);
