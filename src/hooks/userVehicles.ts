import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { Vehicle, VehicleListErrorResponse } from "@/types/vehicle";

/**
 * GET /vehicles?page=1&limit=72227656
 * Requires Authorization Bearer {access token}
 * Returns array of Vehicle or throws error
 */
export function useVehicles(
	accessToken: string | null,
	page = 1,
	limit = 72227656,
	refetchInterval?: number
) {
	return useQuery<Vehicle[], Error>({
		queryKey: ["vehicles", page, limit],
		queryFn: async () => {
			if (!accessToken) throw new Error("No access token provided.");
			try {
				const res = await api.get<Vehicle[] | VehicleListErrorResponse>(
					`/vehicles?page=${page}&limit=${limit}`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				if (!Array.isArray(res.data) && res.data.success === false) {
					throw new Error(res.data.message || "Failed to fetch vehicles.");
				}
				return res.data as Vehicle[];
			} catch (err: any) {
				throw new Error(
					err?.response?.data?.message ||
						err.message ||
						"Failed to fetch vehicles."
				);
			}
		},
		enabled: !!accessToken,
		retry: false,
		refetchInterval,
	});
}
