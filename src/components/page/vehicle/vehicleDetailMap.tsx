import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const MAPTILER_API_KEY =
	import.meta.env.VITE_MAPTILER_API_KEY || "get_your_own_!!";
const STYLE_URL = `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_API_KEY}`;

export function VehicleDetailMap({ lat, lon }: { lat: number; lon: number }) {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<maplibregl.Map | null>(null);

	useEffect(() => {
		if (!mapContainer.current || mapRef.current) return;

		const map = new maplibregl.Map({
			container: mapContainer.current,
			style: STYLE_URL,
			center: [lon, lat],
			zoom: 14,
			interactive: false,
			attributionControl: false,
		});
		mapRef.current = map;

		const el = document.createElement("div");
		el.className = cn(
			"w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 shadow-lg border-2 border-white"
		);
		el.innerHTML =
			'<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white"><path d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>';
		new maplibregl.Marker({ element: el, anchor: "center" })
			.setLngLat([lon, lat])
			.addTo(map);

		return () => {
			map.remove();
			mapRef.current = null;
		};
	}, [lat, lon]);

	return (
		<div className="relative w-full h-56 rounded-lg overflow-hidden">
			<div ref={mapContainer} className="absolute inset-0 w-full h-full" />
			{!mapRef.current && (
				<div className="flex items-center justify-center h-full w-full">
					<Skeleton className="h-20 w-20 rounded-xl" />
				</div>
			)}
		</div>
	);
}
