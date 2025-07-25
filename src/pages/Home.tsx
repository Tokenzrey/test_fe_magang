import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/navbar";
import withAuth from "@/hooks/withAuth";
import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Home as HomeIcon, List, Map as MapIcon } from "lucide-react";
import { VehicleListContainer } from "@/components/page/home/vehicleListContainer";
import { VehicleMapContainer } from "@/components/page/home/vehicleMapContainer";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from "@/components/ui/breadcrumb";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

function Home() {
	const [tab, setTab] = React.useState<"list" | "map">("list");
	const [selectedVehicleId, setSelectedVehicleId] = React.useState<
		number | null
	>(null);
	const navigate = useNavigate();

	const handleDetail = (id: number) => {
		navigate({ to: `/vehicle/${id}` });
	};
	const handleVehicleClick = (vehicle: { id: number }) => {
		setSelectedVehicleId(vehicle.id);
	};

	return (
		<>
			<Navbar />
			<main className="w-full max-w-full px-2 sm:px-4 md:px-8 lg:px-12 xl:px-24 2xl:px-32 py-6 mx-auto dark:bg-slate-950">
				<Tabs value={tab} onValueChange={(v) => setTab(v as "list" | "map")}>
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6 w-full">
						<Breadcrumb className="flex items-center flex-shrink-0">
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink
										className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-medium text-base"
										asChild
									>
										<span>
											<HomeIcon className="h-5 w-5 mr-1" />
											<Typography as="span" variant="s2" weight="semibold">
												Dashboard
											</Typography>
										</span>
									</BreadcrumbLink>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
						<div className="flex-shrink-0 w-full md:w-auto overflow-x-auto">
							<TabsList
								className={cn(
									"flex w-full md:w-fit min-w-[200px] rounded-xl bg-slate-100 dark:bg-[#171e2b] p-1 gap-2"
								)}
							>
								<TabsTrigger
									value="list"
									className={cn(
										"flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-colors",
										"data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm",
										"dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900",
										"dark:text-slate-100 text-slate-700"
									)}
								>
									<List className="h-4 w-4" /> Daftar
								</TabsTrigger>
								<TabsTrigger
									value="map"
									className={cn(
										"flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-colors",
										"data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm",
										"dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900",
										"dark:text-slate-100 text-slate-700"
									)}
								>
									<MapIcon className="h-4 w-4" /> Peta
								</TabsTrigger>
							</TabsList>
						</div>
					</div>
					<TabsContent value="list">
						<VehicleListContainer onDetail={handleDetail} />
					</TabsContent>
					<TabsContent value="map">
						<VehicleMapContainer
							onVehicleClick={handleVehicleClick}
							selectedVehicleId={selectedVehicleId}
						/>
					</TabsContent>
				</Tabs>
			</main>
		</>
	);
}

const HomeWithAuth = withAuth(Home, { allowedRoles: ["USER", "ADMIN"] });

export default HomeWithAuth;
export { Home };
