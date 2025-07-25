import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl, { Map, Marker, Popup } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { useVehicles } from "@/hooks/userVehicles";
import { useVehicle } from "@/hooks/useVehicle";
import { getToken } from "@/lib/cookies";

const MAPTILER_API_KEY =
	import.meta.env.VITE_MAPTILER_API_KEY || "get_your_own_!!";
export const MAP_CONFIG = {
	MAP_CENTER: [117.92, -2.56] as [number, number],
	MAP_ZOOM: 5,
	MIN_ZOOM: 4,
	MAX_ZOOM: 14,
	INDONESIA_EXTENT: [92.0, -11, 141.0, 9.5] as [number, number, number, number],
	STYLE_URL: `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_API_KEY}`,
};

function getDistance(
	a: { lat: number; lon: number },
	b: { lat: number; lon: number }
) {
	const toRad = (v: number) => (v * Math.PI) / 180;
	const R = 6371000;
	const dLat = toRad(b.lat - a.lat);
	const dLon = toRad(b.lon - a.lon);
	const lat1 = toRad(a.lat);
	const lat2 = toRad(b.lat);
	const aVal =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
	return R * c;
}

function getZoomOutLevel(distance: number, map: Map) {
	const { MIN_ZOOM } = MAP_CONFIG;
	const maxDistance = 2700000;
	const minDistance = 10000;
	const logMax = Math.log10(maxDistance);
	const logMin = Math.log10(minDistance);
	const logDist = Math.log10(Math.max(distance, minDistance));
	const ratio = (logDist - logMin) / (logMax - logMin);
	const zoomOut = Math.max(
		MIN_ZOOM,
		map.getZoom() - ratio * (map.getZoom() - MIN_ZOOM)
	);
	return zoomOut;
}

// Helper: Create marker HTML
function createVehicleMarker(
	status: string,
	speed: number,
	disabled: boolean,
	onClick: () => void
): HTMLDivElement {
	let pinColor =
		status === "ACTIVE" && speed > 0
			? "bg-green-500"
			: status === "ACTIVE"
				? "bg-yellow-500"
				: status === "MAINTENANCE"
					? "bg-red-500"
					: "bg-slate-400";
	if (disabled) {
		pinColor = "bg-gray-300 dark:bg-slate-700 opacity-60";
	}
	const div = document.createElement("div");
	div.className = cn(
		"w-6 h-6 rounded-full flex items-center justify-center border-2 border-white ring-2 ring-blue-600 shadow-lg cursor-pointer select-none transition-transform duration-200 origin-center",
		pinColor
	);
	div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="white"><path d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>`;
	if (!disabled) {
		div.onclick = onClick;
	}
	return div;
}

function createVehiclePopupContent(
	vehicle: { id: number; name: string; speed: number },
	vehicleDetail: any,
	onClose: () => void,
	onDetail: () => void
): HTMLDivElement {
	const popupNode = document.createElement("div");
	popupNode.className =
		"vehicle-popup p-4 rounded-lg bg-white min-w-[220px] max-w-xs relative";
	const coords = vehicleDetail
		? `<div class="text-xs text-slate-400 mb-1">Lat: ${vehicleDetail.latitude}, Lon: ${vehicleDetail.longitude}</div>`
		: "";

	const speed = vehicleDetail
		? (vehicleDetail.speed ?? vehicle.speed)
		: vehicle.speed;

	popupNode.innerHTML = `
		<button class="absolute top-2 right-2 text-slate-400 hover:text-slate-600" style="background:transparent;border:none;outline:none;cursor:pointer;" id="close-btn"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg></button>
		<div class="font-bold text-slate-900 mb-1">${vehicle.name}</div>
		${coords}
		<div class="text-sm text-slate-500 mb-1">Kecepatan: ${speed} km/h</div>
		<div class="flex justify-end gap-2 mt-2">
		  <button class="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs font-medium" id="detail-btn">Lihat Detail</button>
		</div>
	`;
	setTimeout(() => {
		popupNode.querySelector("#close-btn")?.addEventListener("click", onClose);
		popupNode.querySelector("#detail-btn")?.addEventListener("click", onDetail);
	}, 0);
	return popupNode;
}

// --- VehicleMapListItem Component ---
function VehicleMapListItem({
	vehicle,
	selected,
	onSelect,
	onVehicleClick,
	onVehicleDetailFetched,
}: {
	vehicle: {
		id: number;
		name: string;
		status: string;
		speed: number;
		updated_at: string;
	};
	selected: boolean;
	onSelect: () => void;
	onVehicleClick?: (vehicle: any) => void;
	onVehicleDetailFetched: (vehicle: any) => void;
}) {
	const accessToken = getToken() || "";
	const { data: detail, isLoading: isDetailLoading } = useVehicle(
		accessToken,
		vehicle.id,
		70000
	);

	// Notify parent when fetched detail changes (for map pin update)
	useEffect(() => {
		if (detail || isDetailLoading) {
			onVehicleDetailFetched({
				...vehicle,
				latitude: detail?.latitude,
				longitude: detail?.longitude,
				detail: detail,
				isDetailLoading,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detail, isDetailLoading]);

	return (
		<div
			data-vehicle-id={vehicle.id}
			className={cn(
				"flex items-center gap-4 px-4 py-3 border-b border-slate-100 dark:border-slate-800 cursor-pointer group hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors",
				selected ? "bg-blue-50 dark:bg-blue-900/20" : "",
				isDetailLoading ? "opacity-50 pointer-events-none" : ""
			)}
			onClick={() => {
				if (isDetailLoading) return;
				onSelect();
				onVehicleClick?.({
					...vehicle,
					latitude: detail?.latitude,
					longitude: detail?.longitude,
					detail: detail,
					isDetailLoading,
				});
			}}
			aria-disabled={isDetailLoading}
			tabIndex={isDetailLoading ? -1 : 0}
		>
			<div className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
				<Car className="h-5 w-5 text-blue-600 dark:text-blue-400" />
			</div>
			<div className="flex-1">
				<Typography
					as="div"
					className="font-semibold text-slate-800 dark:text-slate-100"
				>
					{vehicle.name}
				</Typography>
				<Typography
					as="div"
					className="text-xs text-slate-500 dark:text-slate-400"
				>
					{isDetailLoading ? (
						<Skeleton className="h-4 w-16" />
					) : (
						<>Kecepatan: {detail?.speed ?? vehicle.speed} km/h</>
					)}
				</Typography>
			</div>
		</div>
	);
}

export function VehicleMapContainer({
	onVehicleClick,
	selectedVehicleId,
	onDetail,
}: {
	onVehicleClick?: (vehicle: any) => void;
	selectedVehicleId?: number | null;
	onDetail?: (id: number) => void;
}) {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<Map | null>(null);
	const markersRef = useRef<{ [id: number]: Marker }>({});
	const popupRef = useRef<Popup | null>(null);
	const [activeVehicleId, setActiveVehicleId] = useState<number | null>(null);
	const [vehicleDetails, setVehicleDetails] = useState<
		Record<number, { detail: any; isDetailLoading: boolean; base: any }>
	>({});
	const listRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const accessToken = getToken() || "";
	const { data: vehicles = [], isLoading: isVehiclesLoading } = useVehicles(
		accessToken,
		60000
	);

	// --- Update vehicle details cache when fetched from child list item ---
	const handleVehicleDetailUpdate = useCallback(
		(vehicle: {
			id: number;
			name: string;
			status: string;
			speed: number;
			updated_at: string;
			latitude?: number;
			longitude?: number;
			detail?: any;
			isDetailLoading?: boolean;
		}) => {
			setVehicleDetails((prev) => ({
				...prev,
				[vehicle.id]: {
					detail: vehicle.detail,
					isDetailLoading: vehicle.isDetailLoading ?? false,
					base: vehicle,
				},
			}));
		},
		[]
	);

	// Compose array for mappable vehicles
	const mappableVehicles = Object.entries(vehicleDetails)
		.map(([_, v]) => ({
			...v.base,
			detail: v.detail,
			isDetailLoading: v.isDetailLoading,
			latitude: v.detail?.latitude,
			longitude: v.detail?.longitude,
		}))
		.filter(
			(v) =>
				(typeof v.latitude === "number" && typeof v.longitude === "number") ||
				v.isDetailLoading
		);

	// --- MARKERS & MAP UPDATE ---
	const addMarkers = useCallback(() => {
		if (!mapRef.current) return;
		Object.values(markersRef.current).forEach((m) => m.remove());
		markersRef.current = {};

		mappableVehicles.forEach((vehicle) => {
			if (
				typeof vehicle.latitude !== "number" ||
				typeof vehicle.longitude !== "number"
			)
				return;
			const markerElement = createVehicleMarker(
				vehicle.status,
				vehicle.detail?.speed ?? vehicle.speed,
				!!vehicle.isDetailLoading,
				() => {
					if (vehicle.isDetailLoading) return;
					setActiveVehicleId(vehicle.id);
					onVehicleClick?.(vehicle);
					if (mapRef.current) {
						mapRef.current.easeTo({
							center: [vehicle.longitude!, vehicle.latitude!],
							duration: 800,
							essential: true,
						});
					}
				}
			);
			const marker = new maplibregl.Marker({
				element: markerElement,
				anchor: "center",
			})
				.setLngLat([vehicle.longitude!, vehicle.latitude!])
				.addTo(mapRef.current!);
			markersRef.current[vehicle.id] = marker;
		});
	}, [mappableVehicles, onVehicleClick]);

	// --- Initialize map once ---
	useEffect(() => {
		if (!mapContainer.current || mapRef.current) return;
		mapRef.current = new maplibregl.Map({
			container: mapContainer.current,
			style: MAP_CONFIG.STYLE_URL,
			center: MAP_CONFIG.MAP_CENTER,
			zoom: MAP_CONFIG.MAP_ZOOM,
			minZoom: MAP_CONFIG.MIN_ZOOM,
			maxZoom: MAP_CONFIG.MAX_ZOOM,
			attributionControl: false,
		});
		mapRef.current.addControl(
			new maplibregl.NavigationControl({ showCompass: false }),
			"top-right"
		);
		return () => {
			mapRef.current?.remove();
			mapRef.current = null;
		};
	}, []);

	// --- Draw markers on map when mappableVehicles change ---
	useEffect(() => {
		addMarkers();
	}, [addMarkers]);

	// --- Auto focus/animate to selectedVehicleId with full zoom animation logic ---
	useEffect(() => {
		if (!selectedVehicleId || !mapRef.current || !mappableVehicles.length)
			return;
		const vehicle = mappableVehicles.find((v) => v.id === selectedVehicleId);
		if (
			!vehicle ||
			typeof vehicle.latitude !== "number" ||
			typeof vehicle.longitude !== "number"
		)
			return;
		const map = mapRef.current;
		const startCenter = map.getCenter();
		const startZoom = map.getZoom();
		const target = { lon: vehicle.longitude, lat: vehicle.latitude };
		const currCoords = { lat: startCenter.lat, lon: startCenter.lng };
		const dist = getDistance(currCoords, target);
		const zoomOut = getZoomOutLevel(dist, map);
		const targetZoom = Math.max(12, startZoom);

		// --- Animasi zoom: zoomOut -> pan -> zoomIn ---
		map.easeTo({
			zoom: zoomOut,
			center: startCenter,
			duration: 400,
			essential: true,
			easing: (t) => t,
		});
		const onZoomOutEnd = () => {
			map.off("moveend", onZoomOutEnd);
			map.easeTo({
				center: [vehicle.longitude as number, vehicle.latitude as number],
				zoom: zoomOut,
				duration: 600,
				essential: true,
				easing: (t) => t,
			});
			const onMoveToPinEnd = () => {
				map.off("moveend", onMoveToPinEnd);
				map.easeTo({
					center: [vehicle.longitude as number, vehicle.latitude as number],
					zoom: targetZoom,
					duration: 600,
					essential: true,
					easing: (t) => t,
				});
				setActiveVehicleId(vehicle.id);
			};
			map.on("moveend", onMoveToPinEnd);
		};
		map.on("moveend", onZoomOutEnd);

		// --- Show popup at target after anim complete ---
		setActiveVehicleId(vehicle.id);
	}, [selectedVehicleId, mappableVehicles]);

	// --- Keep list in sync (scroll into view when selectedVehicleId changes) ---
	useEffect(() => {
		if (selectedVehicleId && listRef.current) {
			const el = listRef.current.querySelector<HTMLDivElement>(
				`[data-vehicle-id="${selectedVehicleId}"]`
			);
			if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}, [selectedVehicleId]);

	// --- Show popup above pin, always up-to-date with activeVehicleId ---
	useEffect(() => {
		if (!mapRef.current) return;
		if (popupRef.current) {
			popupRef.current.remove();
			popupRef.current = null;
		}
		const vehicle = mappableVehicles.find((v) => v.id === activeVehicleId);
		if (
			vehicle &&
			typeof vehicle.latitude === "number" &&
			typeof vehicle.longitude === "number"
		) {
			const popupNode = createVehiclePopupContent(
				vehicle,
				vehicle.detail,
				() => setActiveVehicleId(null),
				() => {
					if (onDetail) {
						onDetail(vehicle.id);
					} else {
						navigate({ to: `/vehicle/${vehicle.id}` });
					}
				}
			);
			const popup = new maplibregl.Popup({
				offset: [0, -18],
				anchor: "bottom",
				closeButton: false,
				closeOnClick: false,
				className: "z-[999]",
			})
				.setDOMContent(popupNode)
				.setLngLat([vehicle.longitude as number, vehicle.latitude as number])
				.addTo(mapRef.current);
			popupRef.current = popup;
		}
		return () => {
			if (popupRef.current) {
				popupRef.current.remove();
				popupRef.current = null;
			}
		};
	}, [activeVehicleId, mappableVehicles, onDetail, navigate]);

	const mapHeight = "h-[calc(100dvh-190px)] min-h-[320px]";

	return (
		<div className="flex flex-col md:flex-row w-full gap-4">
			<div
				className={cn(
					"flex-1 rounded-xl relative border border-slate-200 dark:border-slate-800 overflow-hidden",
					mapHeight
				)}
			>
				<div
					ref={mapContainer}
					className={cn("absolute inset-0 w-full h-full")}
				/>
				{isVehiclesLoading && (
					<div className="flex items-center justify-center h-full w-full z-10 absolute top-0 left-0 bg-white/40 dark:bg-black/30">
						<Skeleton className="h-36 w-36 rounded-xl" />
					</div>
				)}
			</div>
			<div
				ref={listRef}
				className={cn(
					"md:w-[340px] w-full md:static fixed bottom-0 left-0 right-0 z-10 md:z-auto bg-white dark:bg-slate-950/95 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg md:shadow-none overflow-y-auto max-h-[calc(100dvh-190px)] min-h-[320px] transition-all",
					"md:mt-0 mt-2"
				)}
				style={{ maxHeight: "calc(100dvh - 190px)" }}
			>
				<div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center font-bold text-slate-900 dark:text-white text-lg sticky top-0 bg-white dark:bg-slate-950/95 z-10">
					Armada
				</div>
				<div>
					{isVehiclesLoading
						? Array.from({ length: 3 }).map((_, i) => (
								<div
									key={`skeleton-${i}`}
									className="flex items-center gap-4 px-4 py-3 border-b border-slate-100 dark:border-slate-800"
								>
									<Skeleton className="w-9 h-9 rounded-lg" />
									<div className="flex-1">
										<Skeleton className="h-5 w-24 mb-2" />
										<Skeleton className="h-4 w-12" />
									</div>
								</div>
							))
						: vehicles.map((v) => (
								<VehicleMapListItem
									key={v.id}
									vehicle={v}
									selected={selectedVehicleId === v.id}
									onSelect={() => setActiveVehicleId(v.id)}
									onVehicleClick={onVehicleClick}
									onVehicleDetailFetched={handleVehicleDetailUpdate}
								/>
							))}
				</div>
			</div>
		</div>
	);
}
