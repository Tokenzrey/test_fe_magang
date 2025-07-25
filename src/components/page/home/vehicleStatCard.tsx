import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

type VehicleStatCardProps = {
	label: string;
	value: number | string;
	loading?: boolean;
	className?: string;
};

/**
 * Card komponen statistik kendaraan, styling sesuai referensi gambar dark mode.
 */
export function VehicleStatCard({
	label,
	value,
	loading,
	className,
}: VehicleStatCardProps) {
	return (
		<Card
			className={cn(
				"rounded-xl border border-[#e8edf3] bg-white py-4 gap-3",
				"dark:bg-[#0e1421] dark:border-[#232c41]",
				className
			)}
		>
			<CardHeader
				className={cn(
					"border-b border-[#e8edf3] pt-0 !pb-2 bg-white",
					"dark:bg-[#0e1421] dark:border-[#232c41]"
				)}
			>	
				<CardTitle>
					<Typography
						as="span"
						variant="s2"
						weight="semibold"
						className={cn("text-lg text-slate-900", "dark:text-white")}
					>
						{label}
					</Typography>
				</CardTitle>
			</CardHeader>
			<CardContent
				className={cn("flex items-start bg-white", "dark:bg-[#0e1421]")}
			>
				<Typography
					as="span"
					variant="i1"
					weight="bold"
					className={cn(
						"text-3xl md:text-4xl text-slate-900 leading-none",
						"dark:text-white"
					)}
				>
					{loading ? <Skeleton className="h-8 w-12" /> : value}
				</Typography>
			</CardContent>
		</Card>
	);
}
