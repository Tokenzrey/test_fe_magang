import Navbar from "@/components/layout/navbar";
import { useParams, useNavigate } from "@tanstack/react-router";
import { VehicleDetailContainer } from "@/components/page/vehicle/vehicleDetailContainer";
import Typography from "@/components/ui/typography";
import { Home as HomeIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VehicleDetailPage() {
	const params = useParams({ strict: false }) as { id: string };
	const navigate = useNavigate();

	const vehicleId = Number(params.id);

	return (
		<>
			<Navbar />
			<main
				className={cn(
					"w-full max-w-full px-2 sm:px-4 md:px-8 lg:px-12 xl:px-24 2xl:px-32 py-6 mx-auto dark:bg-slate-950"
				)}
			>
				<nav className="flex items-center gap-2 mb-6 text-[18px] font-semibold">
					<span
						className={cn(
							"flex items-center gap-2 cursor-pointer select-none transition-colors",
							"text-slate-500 hover:text-slate-700",
							"dark:text-[#99a3ba] dark:hover:text-white"
						)}
						onClick={() => navigate({ to: "/" })}
					>
						<HomeIcon className="h-5 w-5 mr-1" strokeWidth={1.8} />
						<Typography
							as="span"
							variant="s2"
							weight="semibold"
							className={cn(
								"text-slate-500 group-hover:text-slate-700",
								"dark:text-[#99a3ba] dark:group-hover:text-white"
							)}
						>
							Dashboard
						</Typography>
					</span>
					<ChevronRight
						className={cn("h-5 w-5", "text-slate-400 dark:text-[#7a859f]")}
					/>
					<Typography
						as="span"
						variant="s2"
						weight="bold"
						className={cn("text-slate-900", "dark:text-white")}
						style={{
							fontWeight: 700,
						}}
					>
						Detail Kendaraan
					</Typography>
				</nav>
				<VehicleDetailContainer vehicleId={vehicleId} />
			</main>
		</>
	);
}
