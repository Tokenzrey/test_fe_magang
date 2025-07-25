import { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { Gauge, Fuel, BarChart2, Clock, MapPin } from "lucide-react";
import { VehicleDetailMap } from "./vehicleDetailMap";
import { VehicleDetailChart } from "./vehicleDetailChart";
import { cn } from "@/lib/utils";
import { useVehicle } from "@/hooks/useVehicle";
import { useTelemetryLogVehicleAll } from "@/hooks/useVehicleDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { getToken } from "@/lib/cookies";

export function VehicleDetailContainer({ vehicleId }: { vehicleId: number }) {
	const accessToken = getToken() || "";

	// Fetch latest telemetri detail
	const {
		data: vehicle,
		isLoading: isVehicleLoading,
		isError: isVehicleError,
	} = useVehicle(accessToken, vehicleId, 70000);

	// Fetch telemetry logs for chart
	const {
		data: telemetryLogs,
		isLoading: isLogsLoading,
		isError: isLogsError,
	} = useTelemetryLogVehicleAll(vehicleId, accessToken);

	// Transform logs to chart history format if available
	const history = useMemo(() => {
		if (!telemetryLogs) return [];
		return telemetryLogs.map((log) => ({
			time: new Date(log.timestamp).toLocaleTimeString("id-ID", {
				hour: "2-digit",
				minute: "2-digit",
			}),
			speed: log.data.speed ?? 0,
			fuel_level: log.data.fuel_level ?? 0,
			odometer: log.data.odometer ?? 0,
		}));
	}, [telemetryLogs]);

	// Loading skeleton for all cards
	if (isVehicleLoading) {
		return (
			<div className="space-y-6">
				<div className="grid gap-6 lg:grid-cols-2">
					<Card
						className={cn(
							"rounded-xl border-[#e8edf3] bg-white gap-0",
							"dark:bg-[#171e2b] dark:border-[#232c41]"
						)}
					>
						<CardHeader
							className={cn(
								"rounded-t-2xl px-6 pt-0 border-b-2 border-[#e8edf3] bg-white",
								"dark:border-[#232c41] dark:bg-[#171e2b] !pb-5"
							)}
						>
							<CardTitle>
								<Skeleton className="h-6 w-40 mb-2" />
							</CardTitle>
						</CardHeader>
						<CardContent
							className={cn(
								"px-6 pb-6 pt-5 bg-white rounded-b-2xl h-full flex justify-center items-center",
								"dark:bg-[#171e2b]"
							)}
						>
							<div className="grid grid-cols-2 grid-rows-2 gap-8 w-full mx-auto">
								{Array.from({ length: 4 }).map((_, i) => (
									<div
										key={i}
										className="flex flex-col items-center justify-center gap-2"
									>
										<Skeleton className="h-8 w-8 mb-2" />
										<Skeleton className="h-4 w-20 mb-1" />
										<Skeleton className="h-5 w-16" />
									</div>
								))}
							</div>
						</CardContent>
					</Card>
					<Card
						className={cn(
							"rounded-xl border-[#e8edf3] bg-white gap-0",
							"dark:bg-[#171e2b] dark:border-[#232c41]"
						)}
					>
						<CardHeader
							className={cn(
								"rounded-t-2xl px-6 pt-0 border-b-2 border-[#e8edf3] bg-white",
								"dark:border-[#232c41] dark:bg-[#171e2b] !pb-5"
							)}
						>
							<CardTitle>
								<Skeleton className="h-6 w-40 mb-2" />
							</CardTitle>
						</CardHeader>
						<CardContent
							className={cn(
								"px-6 pb-0 pt-5 bg-white rounded-b-2xl h-full flex justify-center items-center",
								"dark:bg-[#171e2b]"
							)}
						>
							<Skeleton className="w-full h-56 rounded-b-lg" />
						</CardContent>
					</Card>
				</div>
				<Card
					className={cn(
						"rounded-xl border-[#e8edf3] bg-white gap-0",
						"dark:bg-[#171e2b] dark:border-[#232c41]"
					)}
				>
					<CardHeader
						className={cn(
							"rounded-t-2xl px-6 pt-0 border-b-2 border-[#e8edf3] bg-white",
							"dark:border-[#232c41] dark:bg-[#171e2b] !pb-5"
						)}
					>
						<CardTitle>
							<Skeleton className="h-6 w-40 mb-2" />
						</CardTitle>
					</CardHeader>
					<CardContent className="h-96 px-6 pb-6 pt-5">
						<Skeleton className="w-full h-full rounded-lg" />
					</CardContent>
				</Card>
			</div>
		);
	}

	if (isVehicleError || !vehicle) {
		return (
			<Card className="p-12 flex items-center justify-center">
				<Typography
					as="span"
					variant="h2"
					className="text-red-500 dark:text-red-400"
				>
					Kendaraan tidak ditemukan.
				</Typography>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			<div className="grid gap-6 lg:grid-cols-2">
				<Card
					className={cn(
						"rounded-xl border-[#e8edf3] bg-white text-slate-900 gap-0",
						"dark:bg-[#171e2b] dark:border-[#232c41] dark:text-white"
					)}
				>
					<CardHeader
						className={cn(
							"rounded-t-2xl px-6 pt-0 border-b-2 border-[#e8edf3] bg-white",
							"dark:border-[#232c41] dark:bg-[#171e2b] !pb-5"
						)}
					>
						<CardTitle>
							<Typography
								as="span"
								weight="bold"
								variant="h2"
								className={cn("text-xl text-slate-900", "dark:text-white")}
							>
								Detail Telemetri
							</Typography>
						</CardTitle>
					</CardHeader>
					<CardContent
						className={cn(
							"px-6 pb-6 pt-5 bg-white rounded-b-2xl h-full flex justify-center items-center",
							"dark:bg-[#171e2b]"
						)}
					>
						<div className="grid grid-cols-2 grid-rows-2 gap-8 w-full mx-auto">
							<div className="flex flex-col items-center justify-center gap-2">
								<Gauge className="h-8 w-8 text-blue-500 mb-2" />
								<Typography
									as="div"
									variant="s4"
									className="text-slate-500 dark:text-[#b3bcd9]"
								>
									Kecepatan
								</Typography>
								<Typography
									as="div"
									variant="i1"
									weight="bold"
									className="text-xl md:text-2xl text-slate-900 dark:text-white"
								>
									{vehicle.speed} km/h
								</Typography>
							</div>
							<div className="flex flex-col items-center justify-center gap-2">
								<BarChart2 className="h-8 w-8 text-purple-500 mb-2" />
								<Typography
									as="div"
									variant="s4"
									className="text-slate-500 dark:text-[#b3bcd9]"
								>
									Odometer
								</Typography>
								<Typography
									as="div"
									variant="i1"
									weight="bold"
									className="text-xl md:text-2xl text-slate-900 dark:text-white"
								>
									{new Intl.NumberFormat("id-ID").format(vehicle.odometer ?? 0)}{" "}
									km
								</Typography>
							</div>
							<div className="flex flex-col items-center justify-center gap-2">
								<Fuel className="h-8 w-8 text-green-500 mb-2" />
								<Typography
									as="div"
									variant="s4"
									className="text-slate-500 dark:text-[#b3bcd9]"
								>
									BBM
								</Typography>
								<Typography
									as="div"
									variant="i1"
									weight="bold"
									className="text-xl md:text-2xl text-slate-900 dark:text-white"
								>
									{vehicle.fuel_level ?? 0}%
								</Typography>
							</div>
							<div className="flex flex-col items-center justify-center gap-2">
								<Clock className="h-8 w-8 text-yellow-500 mb-2" />
								<Typography
									as="div"
									variant="s4"
									className="text-slate-500 dark:text-[#b3bcd9]"
								>
									Waktu
								</Typography>
								<Typography
									as="div"
									variant="i1"
									weight="bold"
									className="text-xl md:text-2xl text-slate-900 dark:text-white"
								>
									{vehicle.timestamp
										? new Date(vehicle.timestamp).toLocaleTimeString("id-ID")
										: "-"}
								</Typography>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card
					className={cn(
						"rounded-xl border-[#e8edf3] bg-white text-slate-900 gap-0",
						"dark:bg-[#171e2b] dark:border-[#232c41] dark:text-white"
					)}
				>
					<CardHeader
						className={cn(
							"rounded-t-2xl px-6 pt-0 border-b-2 border-[#e8edf3] bg-white",
							"dark:border-[#232c41] dark:bg-[#171e2b] !pb-5"
						)}
					>
						<CardTitle>
							<Typography
								as="span"
								weight="bold"
								variant="h2"
								className={cn("text-xl text-slate-900", "dark:text-white")}
							>
								Lokasi
							</Typography>
						</CardTitle>
					</CardHeader>
					<CardContent
						className={cn(
							"px-6 pb-0 pt-5 bg-white rounded-b-2xl h-full flex justify-center items-center",
							"dark:bg-[#171e2b]"
						)}
					>
						<div className="w-full h-56 rounded-b-lg relative overflow-hidden">
							{typeof vehicle.latitude === "number" &&
							typeof vehicle.longitude === "number" ? (
								<VehicleDetailMap
									lat={vehicle.latitude}
									lon={vehicle.longitude}
								/>
							) : (
								<Skeleton className="w-full h-full rounded-b-lg" />
							)}
							<div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/80 dark:bg-slate-900/70 px-3 py-1 rounded-lg shadow-sm">
								<MapPin className="h-5 w-5 text-slate-400" />
								<Typography as="span" variant="c0" className="text-slate-500">
									Lat:{" "}
									{typeof vehicle.latitude === "number"
										? vehicle.latitude
										: "-"}
									, Lon:{" "}
									{typeof vehicle.longitude === "number"
										? vehicle.longitude
										: "-"}
								</Typography>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			<Card
				className={cn(
					"rounded-xl border-[#e8edf3] bg-white text-slate-900 gap-0",
					"dark:bg-[#171e2b] dark:border-[#232c41] dark:text-white"
				)}
			>
				<CardHeader
					className={cn(
						"rounded-t-2xl px-6 pt-0 border-b-2 border-[#e8edf3] bg-white",
						"dark:border-[#232c41] dark:bg-[#171e2b] !pb-5"
					)}
				>
					<CardTitle>
						<Typography
							as="span"
							weight="bold"
							variant="h2"
							className={cn("text-xl text-slate-900", "dark:text-white")}
						>
							Grafik Telemetri (24 Jam Terakhir)
						</Typography>
					</CardTitle>
				</CardHeader>
				<CardContent className="h-96 px-6 pb-6 pt-5">
					{isLogsLoading ? (
						<Skeleton className="w-full h-full rounded-lg" />
					) : !history.length || isLogsError ? (
						<Typography
							as="span"
							variant="h2"
							className="text-red-500 dark:text-red-400"
						>
							Data tidak tersedia.
						</Typography>
					) : (
						<VehicleDetailChart history={history} />
					)}
				</CardContent>
			</Card>
		</div>
	);
}
