import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";

export type VehicleStatus = "ACTIVE" | "PARKED" | "INACTIVE" | "MAINTENANCE";

/**
 * Badge status kendaraan, refactored: typography, cn, full dark mode.
 */
export function VehicleStatusBadge({
	status,
	speed,
}: {
	status: VehicleStatus | string;
	speed: number;
}) {
	let label: string = status;
	let colorClass =
		"inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border transition-colors";

	if (status === "ACTIVE" && speed > 0) {
		label = "BERGERAK";
		colorClass = cn(
			colorClass,
			"bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800/60"
		);
	} else if (status === "ACTIVE" && speed === 0) {
		label = "PARKIR";
		colorClass = cn(
			colorClass,
			"bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/60"
		);
	} else if (status === "INACTIVE") {
		label = "INACTIVE";
		colorClass = cn(
			colorClass,
			"bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700"
		);
	} else if (status === "MAINTENANCE") {
		label = "PERBAIKAN";
		colorClass = cn(
			colorClass,
			"bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800/60"
		);
	}

	return (
		<span className={colorClass}>
			<Typography as="span" variant="s4" weight="semibold">
				{label}
			</Typography>
		</span>
	);
}
