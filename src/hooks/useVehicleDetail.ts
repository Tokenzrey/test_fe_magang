import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type {
	TelemetryLogVehicleRecord,
	TelemetryLogVehicleAllSuccessResponse,
	VehicleListErrorResponse,
} from "@/types/vehicle";

/**
 * GET /telementry-logs/:vehicleId/vehicles/all
 * Requires Authorization Bearer {access token}
 * Returns array of telemetry logs for the vehicle
 */
export function useTelemetryLogVehicleAll(
	vehicleId: number | string | null,
	accessToken: string | null,
	refetchInterval?: number
) {
	return useQuery<TelemetryLogVehicleRecord[], Error>({
		queryKey: ["telementry-logs", vehicleId, "all"],
		queryFn: async () => {
			if (!vehicleId) throw new Error("No vehicle id provided.");
			if (!accessToken) throw new Error("No access token provided.");
			const res = await api.get<
				TelemetryLogVehicleAllSuccessResponse | VehicleListErrorResponse
			>(`/telementry-logs/${vehicleId}/vehicles/all`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (!res.data.success) {
				throw new Error(res.data.message || "Failed to fetch telemetry logs.");
			}
			return res.data.responseObject;
		},
		enabled: !!vehicleId && !!accessToken,
		retry: false,
		refetchInterval,
	});
}
