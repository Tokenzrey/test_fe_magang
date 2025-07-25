import { User } from "./user";

export type LoginApiResponse = {
	success: boolean;
	message: string;
	responseObject: {
		accessToken: string;
		refreshToken: string;
		expiresAt: string;
		user?: User;
	} | null;
	statusCode: number;
};

export type RegisterApiResponse = {
	success: boolean;
	message: string;
	responseObject: null;
	statusCode: number;
};

export type MeApiResponse = {
	success: boolean;
	message?: string;
	data?: User;
};

export type RefreshApiResponse = {
	success: boolean;
	message?: string;
	data?: {
		accessToken: string;
		refreshToken: string;
		expiresAt: string;
	};
};
