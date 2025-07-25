import { createFileRoute } from "@tanstack/react-router";
import VehicleCrudPage from "@/pages/crud";

export const Route = createFileRoute("/crud")({
	component: VehicleCrudPage,
});
