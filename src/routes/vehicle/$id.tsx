import { createFileRoute } from "@tanstack/react-router";
import VehicleDetailPage from "@/pages/Vehicle";

export const Route = createFileRoute("/vehicle/$id")({
	component: VehicleDetailPage,
});
