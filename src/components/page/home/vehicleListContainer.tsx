import { useVehicles } from "@/hooks/userVehicles";
import { VehicleListStats } from "@/components/page/home/vehicleListStats";
import { VehicleListTable } from "@/components/page/home/vehicleListTable";
import { getToken } from "@/lib/cookies";

export function VehicleListContainer({
	onDetail,
}: {
	onDetail: (id: number) => void;
}) {
	const accessToken = getToken() ?? '';

	const {
		data: vehicles = [],
		isLoading,
		isError,
		error,
	} = useVehicles(accessToken, 60000);

	return (
		<div className="space-y-6">
			<VehicleListStats vehicles={vehicles} loading={isLoading} />
			<VehicleListTable
				vehicles={vehicles}
				loading={isLoading}
				error={
					isError
						? ((error as any)?.message ?? "Gagal memuat data.")
						: undefined
				}
				onDetail={onDetail}
			/>
		</div>
	);
}
