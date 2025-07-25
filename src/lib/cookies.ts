import Cookies from "universal-cookie";

const cookies = new Cookies();

/**
 * Mengambil token dari cookie.
 *
 * @returns {string | undefined} Token jika ada, atau undefined jika tidak ditemukan.
 */
export const getToken = (): string | undefined => {
	const token = cookies.get("@test_be_magang");
	return typeof token === "string" ? token : undefined;
};

/**
 * Menyimpan access token ke dalam cookie.
 *
 * Opsi cookie telah disesuaikan untuk environment production.
 *
 * @param {string} token - Token yang akan disimpan.
 */
export const setToken = (token: string): void => {
	cookies.set("@test_be_magang", token, {
		path: "/",
		maxAge: 60 * 60 * 24 * 7,
		secure: import.meta.env.MODE === "production",
		// sameSite: 'lax',
	});
};

/**
 * Menghapus access token dari cookie.
 */
export const removeToken = (): void => {
	cookies.remove("@test_be_magang", { path: "/" });
};

/**
 * Menyimpan refresh token ke dalam cookie.
 *
 * @param {string} token - Refresh token yang akan disimpan.
 */
export const setRefreshToken = (token: string): void => {
	cookies.set("@test_be_magang_refresh", token, {
		path: "/",
		maxAge: 60 * 60 * 24 * 30, // Refresh token biasanya lebih lama, misal 30 hari
		secure: import.meta.env.MODE === "production",
		// sameSite: 'lax',
	});
};

/**
 * Mengambil refresh token dari cookie.
 *
 * @returns {string | undefined} Refresh token jika ada, atau undefined jika tidak ditemukan.
 */
export const getRefreshToken = (): string | undefined => {
	const token = cookies.get("@test_be_magang_refresh");
	return typeof token === "string" ? token : undefined;
};

/**
 * Menghapus refresh token dari cookie.
 */
export const removeRefreshToken = (): void => {
	cookies.remove("@test_be_magang_refresh", { path: "/" });
};
