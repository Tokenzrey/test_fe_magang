import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type {
	VehicleDetailSuccessResponse,
	VehicleListErrorResponse,
} from "@/types/vehicle";

/**
 * GET /vehicles/{id}
 * Requires Authorization Bearer {access token}
 * Returns vehicle detail (telematics data)
 */
export function useVehicle(
	accessToken: string | null,
	vehicleId: number | string | null,
	refetchInterval?: number
) {
	return useQuery<VehicleDetailSuccessResponse, Error>({
		queryKey: ["vehicle-detail", vehicleId],
		queryFn: async () => {
			if (!accessToken) throw new Error("No access token provided.");
			if (!vehicleId) throw new Error("No vehicle id provided.");
			const res = await api.get<
				VehicleDetailSuccessResponse | VehicleListErrorResponse
			>(`/vehicles/${vehicleId}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if ("success" in res.data && res.data.success === false) {
				throw new Error(res.data.message || "Failed to fetch vehicle detail.");
			}
			return res.data as VehicleDetailSuccessResponse;
		},
		enabled: !!accessToken && !!vehicleId,
		retry: false,
		refetchInterval,
	});
}
