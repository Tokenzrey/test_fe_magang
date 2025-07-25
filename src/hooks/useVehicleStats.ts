import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import type { TelemetryLogStatsResponse } from "@/types/vehicle";

/**
 * GET /telementry-logs/stats
 * Requires Authorization Bearer {access token}
 * Returns stats: total, parked, moving, maintenance
 */
export function useTelemetryLogStats(
	accessToken: string | null,
	refetchInterval?: number
) {
	return useQuery({
		queryKey: ["telementry-logs", "stats"],
		queryFn: async (): Promise<TelemetryLogStatsResponse> => {
			if (!accessToken) throw new Error("No access token provided.");
			const res = await api.get<TelemetryLogStatsResponse>(
				"/telementry-logs/stats",
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			return res.data;
		},
		enabled: !!accessToken,
		retry: false,
		refetchInterval,
	});
}
