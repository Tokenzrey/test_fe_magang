import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
	VehicleStatusBadge,
	type VehicleStatus,
} from "@/components/page/home/vehicleStatusBadge";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

/**
 * List Table for Vehicle Dashboard,
 * Light mode = white, black text, soft border, colored status badge.
 * Dark mode = dark blue bg, white text, dark border, solid badge.
 * Table head is always dark in both modes for contrast (see image).
 */
export function VehicleListTable({
	vehicles = [],
	loading,
	error,
	onDetail = () => {},
}: {
	vehicles?: {
		id: number;
		name: string;
		status: VehicleStatus | string;
		speed: number;
	}[];
	loading?: boolean;
	error?: string | null;
	onDetail?: (id: number) => void;
}) {
	return (
		<Card
			className={cn(
				"rounded-2xl border bg-white shadow-sm gap-0",
				"dark:bg-[#0e1421] dark:border-[#232c41]"
			)}
		>
			<CardHeader
				className={cn(
					"pb-3 border-b bg-white",
					"dark:bg-[#0e1421] dark:border-[#232c41]"
				)}
			>
				<CardTitle>
					<Typography
						as="span"
						variant="h2"
						weight="bold"
						className={cn("text-xl text-slate-900", "dark:text-white")}
					>
						Daftar Kendaraan
					</Typography>
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				<div className="overflow-x-auto">
					<table
						className={cn("w-full text-base", "bg-white dark:bg-[#171e2b]")}
					>
						<thead>
							<tr className={cn("bg-[#f7f9fb]", "dark:bg-[#151c29]")}>
								<th
									className={cn(
										"text-left font-semibold p-5 min-w-[160px]",
										"text-slate-900 dark:text-white"
									)}
								>
									<Typography as="span" variant="s2" weight="semibold">
										Nama
									</Typography>
								</th>
								<th
									className={cn(
										"text-left font-semibold p-5 min-w-[120px]",
										"text-slate-900 dark:text-white"
									)}
								>
									<Typography as="span" variant="s2" weight="semibold">
										Status
									</Typography>
								</th>
								<th
									className={cn(
										"text-left font-semibold p-5 min-w-[120px]",
										"text-slate-900 dark:text-white"
									)}
								>
									<Typography as="span" variant="s2" weight="semibold">
										Kecepatan
									</Typography>
								</th>
								<th
									className={cn(
										"text-right font-semibold p-5 min-w-[100px]",
										"text-slate-900 dark:text-white"
									)}
								>
									<Typography as="span" variant="s2" weight="semibold">
										Aksi
									</Typography>
								</th>
							</tr>
						</thead>
						<tbody>
							{loading ? (
								Array.from({ length: 3 }).map((_, i) => (
									<tr
										key={i}
										className={cn(
											"border-b last:border-b-0",
											"bg-white dark:bg-[#0e1421]"
										)}
									>
										<td className="p-5">
											<Skeleton className="h-6 w-32" />
										</td>
										<td className="p-5">
											<Skeleton className="h-6 w-20" />
										</td>
										<td className="p-5">
											<Skeleton className="h-6 w-16" />
										</td>
										<td className="p-5 flex justify-end">
											<Skeleton className="h-8 w-20" />
										</td>
									</tr>
								))
							) : error ? (
								<tr>
									<td colSpan={4} className="text-center p-8">
										<Typography
											as="span"
											variant="h2"
											weight="bold"
											className="text-red-500 dark:text-red-400"
										>
											{error}
										</Typography>
									</td>
								</tr>
							) : (
								vehicles.map((v) => (
									<tr
										key={v.id}
										className={cn(
											"border-b last:border-b-0",
											"bg-white dark:bg-[#0e1421]"
										)}
									>
										<td
											className={cn(
												"p-5 font-medium text-slate-900",
												"dark:text-white"
											)}
										>
											<Typography
												as="span"
												variant="b1"
												className="font-semibold"
											>
												{v.name}
											</Typography>
										</td>
										<td className="p-5">
											<VehicleStatusBadge
												status={v.status as VehicleStatus}
												speed={v.speed}
											/>
										</td>
										<td className={cn("p-5 text-slate-900", "dark:text-white")}>
											<Typography as="span" variant="b1">
												{v.speed} km/h
											</Typography>
										</td>
										<td className="p-5 flex justify-end">
											<Button
												variant="secondary"
												size="lg"
												className={cn(
													"rounded-lg !bg-[#2264e9] hover:!bg-[#1d56cc] text-white text-base px-6 py-2 font-semibold shadow-none border-0 cursor-pointer"
												)}
												onClick={() => onDetail(v.id)}
											>
												<Typography as="span" variant="s2" weight="semibold">
													Detail
												</Typography>
											</Button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	);
}
