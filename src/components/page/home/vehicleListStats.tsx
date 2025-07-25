import React from "react";
import { VehicleStatCard } from "@/components/page/home/vehicleStatCard";

type Vehicle = {
	status: string;
	speed: number;
};

/**
 * Komponen statistik daftar kendaraan, memanfaatkan VehicleStatCard (DRY & SOLID).
 */
export function VehicleListStats({
	vehicles,
	loading,
}: {
	vehicles: Vehicle[];
	loading: boolean;
}) {
	const stats = React.useMemo(
		() => ({
			total: vehicles.length,
			active: vehicles.filter((v) => v.status === "ACTIVE").length,
			maintenance: vehicles.filter((v) => v.status === "MAINTENANCE").length,
			parked: vehicles.filter((v) => v.status === "INACTIVE").length,
		}),
		[vehicles]
	);

	const statConfig = [
		{ key: "total", label: "Total Kendaraan" },
		{ key: "active", label: "Sedang Bergerak" },
		{ key: "parked", label: "Parkir" },
		{ key: "maintenance", label: "Perbaikan" },
	] as const;

	return (
		<div className="grid gap-4 min-[390px]:grid-cols-2 lg:grid-cols-4">
			{statConfig.map(({ key, label }) => (
				<VehicleStatCard
					key={key}
					label={label}
					value={stats[key]}
					loading={loading}
				/>
			))}
		</div>
	);
}
