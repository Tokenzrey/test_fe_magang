import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

import { HistoryPoint } from "@/types/vehicle";

/**
 * Normalize a value for charting to [0, 1] based on min & max from array.
 */
function normalize(value: number, min: number, max: number): number {
	if (max === min) return 0.5; // avoid divide by zero
	return (value - min) / (max - min);
}

/**
 * Custom tooltip so we can show real/raw data on hover, even if chart is normalized.
 */
function CustomTooltip({
	active,
	label,
	payload,
}: {
	active?: boolean;
	label?: string;
	payload?: any[];
}) {
	if (!active || !payload || payload.length === 0) return null;

	const speedPayload = payload.find((p) => p.dataKey === "speed_norm");
	const bbmPayload = payload.find((p) => p.dataKey === "fuel_level_norm");
	const odoPayload = payload.find((p) => p.dataKey === "odometer_norm");

	return (
		<div
			style={{
				background: "rgba(20, 20, 30, 0.95)",
				border: "none",
				borderRadius: 8,
				color: "white",
				padding: 12,
				minWidth: 180,
			}}
		>
			<div style={{ color: "#93c5fd", fontWeight: 600, marginBottom: 4 }}>
				{label}
			</div>
			{speedPayload && (
				<div>
					<span
						style={{
							display: "inline-block",
							width: 10,
							height: 10,
							background: "#3b82f6",
							borderRadius: 2,
							marginRight: 6,
						}}
					/>
					Kecepatan: <b>{speedPayload.payload?.speed?.toFixed(2) ?? "-"}</b>{" "}
					km/h
				</div>
			)}
			{bbmPayload && (
				<div>
					<span
						style={{
							display: "inline-block",
							width: 10,
							height: 10,
							background: "#10b981",
							borderRadius: 2,
							marginRight: 6,
						}}
					/>
					BBM: <b>{bbmPayload.payload?.fuel_level?.toFixed(2) ?? "-"}</b> %
				</div>
			)}
			{odoPayload && (
				<div>
					<span
						style={{
							display: "inline-block",
							width: 10,
							height: 10,
							background: "#a78bfa",
							borderRadius: 2,
							marginRight: 6,
						}}
					/>
					Odometer:{" "}
					<b>{odoPayload.payload?.odometer?.toLocaleString("id-ID") ?? "-"}</b>{" "}
					km
				</div>
			)}
		</div>
	);
}

export function VehicleDetailChart({ history }: { history: HistoryPoint[] }) {
	const speedVals = history.map((d) => d.speed);
	const bbmVals = history.map((d) => d.fuel_level);
	const odoVals = history.map((d) => d.odometer);

	const speedMin = Math.min(...speedVals);
	const speedMax = Math.max(...speedVals);
	const bbmMin = Math.min(...bbmVals);
	const bbmMax = Math.max(...bbmVals);
	const odoMin = Math.min(...odoVals);
	const odoMax = Math.max(...odoVals);

	const normalizedHistory = history.map((d) => ({
		...d,
		speed_norm: normalize(d.speed, speedMin, speedMax),
		fuel_level_norm: normalize(d.fuel_level, bbmMin, bbmMax),
		odometer_norm: normalize(d.odometer, odoMin, odoMax),
	}));

	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart data={normalizedHistory}>
				<CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
				<XAxis dataKey="time" fontSize={12} />
				<YAxis
					fontSize={12}
					domain={[0, 1]}
					tickFormatter={(v) => `${Math.round(v * 100)}%`}
					label={{
						value: "Normalisasi",
						angle: -90,
						position: "insideLeft",
						fill: "#64748b",
						fontSize: 12,
					}}
				/>
				<Tooltip content={<CustomTooltip />} />
				<Legend
					formatter={(value) => {
						if (value === "speed_norm") return "Kecepatan";
						if (value === "fuel_level_norm") return "BBM";
						if (value === "odometer_norm") return "Odometer";
						return value;
					}}
				/>
				<Line
					type="monotone"
					dataKey="speed_norm"
					name="Kecepatan"
					stroke="#3b82f6"
					strokeWidth={2}
					dot={false}
					isAnimationActive={false}
				/>
				<Line
					type="monotone"
					dataKey="fuel_level_norm"
					name="BBM"
					stroke="#10b981"
					strokeWidth={2}
					dot={false}
					isAnimationActive={false}
				/>
				<Line
					type="monotone"
					dataKey="odometer_norm"
					name="Odometer"
					stroke="#a78bfa"
					strokeWidth={2}
					dot={false}
					isAnimationActive={false}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}
