import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableHead,
	TableHeader,
	TableBody,
	TableRow,
	TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash, Edit } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Typography from "@/components/ui/typography";

// --- Dummy Data & State (replace with React Query for real API) ---
type Vehicle = {
	id: number;
	name: string;
	status: string;
	speed: number;
};

type TelemetryLog = {
	id: number;
	vehicleId: number;
	timestamp: string;
	odometer: number;
	fuel_level: number;
	speed: number;
};

let VEHICLE_ID = 8;
let TELEMETRY_ID = 12;
const DUMMY_VEHICLES: Vehicle[] = [
	{ id: 1, name: "Avanza G-123", status: "ACTIVE", speed: 60 },
	{ id: 2, name: "Brio Satya", status: "ACTIVE", speed: 0 },
	{ id: 3, name: "Pajero Sport", status: "INACTIVE", speed: 0 },
	{ id: 4, name: "Ertiga Hybrid", status: "ACTIVE", speed: 45 },
	{ id: 5, name: "AirEV Long Range", status: "MAINTENANCE", speed: 0 },
	{ id: 6, name: "Terios R", status: "ACTIVE", speed: 75 },
	{ id: 7, name: "Ioniq 5", status: "ACTIVE", speed: 0 },
	{ id: 8, name: "Xpander Cross", status: "ACTIVE", speed: 50 },
];
const DUMMY_TELEMETRY: TelemetryLog[] = [
	{
		id: 1,
		vehicleId: 1,
		timestamp: "2025-07-23T17:00:00Z",
		odometer: 123456,
		fuel_level: 70,
		speed: 60,
	},
	{
		id: 2,
		vehicleId: 2,
		timestamp: "2025-07-23T16:15:00Z",
		odometer: 45231,
		fuel_level: 85,
		speed: 0,
	},
	{
		id: 3,
		vehicleId: 1,
		timestamp: "2025-07-23T18:15:00Z",
		odometer: 123470,
		fuel_level: 68,
		speed: 70,
	},
	{
		id: 4,
		vehicleId: 3,
		timestamp: "2025-07-22T18:30:00Z",
		odometer: 98765,
		fuel_level: 40,
		speed: 0,
	},
	{
		id: 5,
		vehicleId: 1,
		timestamp: "2025-07-23T19:00:00Z",
		odometer: 123500,
		fuel_level: 66,
		speed: 80,
	},
	// ... more
];

export default function VehicleCrudPage() {
	// State
	const [tab, setTab] = useState<"vehicle" | "telemetry">("vehicle");
	const [vehicles, setVehicles] = useState<Vehicle[]>(DUMMY_VEHICLES);
	const [telemetries, setTelemetries] =
		useState<TelemetryLog[]>(DUMMY_TELEMETRY);

	// --- Vehicle Modal ---
	const [showVehicleModal, setShowVehicleModal] = useState(false);
	const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
	const [vehicleForm, setVehicleForm] = useState<Partial<Vehicle>>({});

	// --- Telemetry Modal ---
	const [showTelemetryModal, setShowTelemetryModal] = useState(false);
	const [editTelemetry, setEditTelemetry] = useState<TelemetryLog | null>(null);
	const [telemetryForm, setTelemetryForm] = useState<Partial<TelemetryLog>>({});

	// --- Vehicle Handlers ---
	const openCreateVehicle = () => {
		setEditVehicle(null);
		setVehicleForm({});
		setShowVehicleModal(true);
	};
	const openEditVehicle = (v: Vehicle) => {
		setEditVehicle(v);
		setVehicleForm(v);
		setShowVehicleModal(true);
	};
	const handleVehicleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVehicleForm({ ...vehicleForm, [e.target.name]: e.target.value });
	};
	const handleVehicleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (editVehicle) {
			setVehicles((prev) =>
				prev.map((v) =>
					v.id === editVehicle.id
						? ({ ...editVehicle, ...vehicleForm } as Vehicle)
						: v
				)
			);
		} else {
			setVehicles((prev) => [
				...prev,
				{
					id: ++VEHICLE_ID,
					...vehicleForm,
					speed: Number(vehicleForm.speed) || 0,
				} as Vehicle,
			]);
		}
		setShowVehicleModal(false);
	};
	const deleteVehicle = (id: number) => {
		setVehicles((prev) => prev.filter((v) => v.id !== id));
		setTelemetries((prev) => prev.filter((t) => t.vehicleId !== id));
	};

	// --- Telemetry Handlers ---
	const openCreateTelemetry = () => {
		setEditTelemetry(null);
		setTelemetryForm({});
		setShowTelemetryModal(true);
	};
	const openEditTelemetry = (t: TelemetryLog) => {
		setEditTelemetry(t);
		setTelemetryForm(t);
		setShowTelemetryModal(true);
	};
	const handleTelemetryFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setTelemetryForm({ ...telemetryForm, [e.target.name]: e.target.value });
	};
	const handleTelemetryFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (editTelemetry) {
			setTelemetries((prev) =>
				prev.map((t) =>
					t.id === editTelemetry.id
						? ({
								...editTelemetry,
								...telemetryForm,
								vehicleId: Number(telemetryForm.vehicleId),
							} as TelemetryLog)
						: t
				)
			);
		} else {
			setTelemetries((prev) => [
				...prev,
				{
					id: ++TELEMETRY_ID,
					...telemetryForm,
					vehicleId: Number(telemetryForm.vehicleId),
					speed: Number(telemetryForm.speed) || 0,
					fuel_level: Number(telemetryForm.fuel_level) || 0,
					odometer: Number(telemetryForm.odometer) || 0,
				} as TelemetryLog,
			]);
		}
		setShowTelemetryModal(false);
	};
	const deleteTelemetry = (id: number) => {
		setTelemetries((prev) => prev.filter((t) => t.id !== id));
	};

	return (
		<>
			<Navbar />
			<main className="w-full max-w-full px-2 sm:px-4 md:px-8 lg:px-12 xl:px-24 2xl:px-32 py-6 mx-auto dark:bg-slate-950">
				<Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6 w-full">
						<Typography as="h2" variant="i2" weight="bold">
							CRUD Kendaraan & Telemetri Log
						</Typography>
						<TabsList>
							<TabsTrigger value="vehicle">Kendaraan</TabsTrigger>
							<TabsTrigger value="telemetry">Telemetry Log</TabsTrigger>
						</TabsList>
					</div>
					{/* VEHICLE */}
					<TabsContent value="vehicle">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between">
								<CardTitle>Kendaraan</CardTitle>
								<Button variant="secondary" onClick={openCreateVehicle}>
									<Plus className="w-4 h-4 mr-2" /> Tambah Kendaraan
								</Button>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>ID</TableHead>
											<TableHead>Nama</TableHead>
											<TableHead>Status</TableHead>
											<TableHead>Kecepatan</TableHead>
											<TableHead className="text-right">Aksi</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{vehicles.map((v) => (
											<TableRow key={v.id}>
												<TableCell>{v.id}</TableCell>
												<TableCell>{v.name}</TableCell>
												<TableCell>{v.status}</TableCell>
												<TableCell>{v.speed} km/h</TableCell>
												<TableCell className="text-right">
													<Button
														variant="ghost"
														size="icon"
														onClick={() => openEditVehicle(v)}
													>
														<Edit className="w-4 h-4" />
													</Button>
													<Button
														variant="ghost"
														size="icon"
														onClick={() => deleteVehicle(v.id)}
													>
														<Trash className="w-4 h-4 text-red-600" />
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
								{/* Modal: Create/Edit Vehicle */}
								<Dialog
									open={showVehicleModal}
									onOpenChange={setShowVehicleModal}
								>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>
												{editVehicle ? "Edit Kendaraan" : "Tambah Kendaraan"}
											</DialogTitle>
										</DialogHeader>
										<form
											onSubmit={handleVehicleFormSubmit}
											className="space-y-4"
										>
											<Input
												name="name"
												placeholder="Nama Kendaraan"
												value={vehicleForm.name || ""}
												onChange={handleVehicleFormChange}
												required
											/>
											<Input
												name="status"
												placeholder="Status (ACTIVE/INACTIVE/MAINTENANCE)"
												value={vehicleForm.status || ""}
												onChange={handleVehicleFormChange}
												required
											/>
											<Input
												name="speed"
												type="number"
												placeholder="Kecepatan"
												value={vehicleForm.speed || ""}
												onChange={handleVehicleFormChange}
												min={0}
												required
											/>
											<DialogFooter>
												<Button
													type="button"
													variant="ghost"
													onClick={() => setShowVehicleModal(false)}
												>
													Batal
												</Button>
												<Button type="submit" variant="secondary">
													{editVehicle ? "Update" : "Tambah"}
												</Button>
											</DialogFooter>
										</form>
									</DialogContent>
								</Dialog>
							</CardContent>
						</Card>
					</TabsContent>
					{/* TELEMETRY LOG */}
					<TabsContent value="telemetry">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between">
								<CardTitle>Telemetry Log</CardTitle>
								<Button variant="secondary" onClick={openCreateTelemetry}>
									<Plus className="w-4 h-4 mr-2" /> Tambah Telemetry
								</Button>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>ID</TableHead>
											<TableHead>Kendaraan</TableHead>
											<TableHead>Waktu</TableHead>
											<TableHead>Odometer</TableHead>
											<TableHead>BBM</TableHead>
											<TableHead>Kecepatan</TableHead>
											<TableHead className="text-right">Aksi</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{telemetries.map((t) => (
											<TableRow key={t.id}>
												<TableCell>{t.id}</TableCell>
												<TableCell>
													{vehicles.find((v) => v.id === t.vehicleId)?.name ||
														t.vehicleId}
												</TableCell>
												<TableCell>
													{new Date(t.timestamp).toLocaleString("id-ID")}
												</TableCell>
												<TableCell>{t.odometer} km</TableCell>
												<TableCell>{t.fuel_level} %</TableCell>
												<TableCell>{t.speed} km/h</TableCell>
												<TableCell className="text-right">
													<Button
														variant="ghost"
														size="icon"
														onClick={() => openEditTelemetry(t)}
													>
														<Edit className="w-4 h-4" />
													</Button>
													<Button
														variant="ghost"
														size="icon"
														onClick={() => deleteTelemetry(t.id)}
													>
														<Trash className="w-4 h-4 text-red-600" />
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
								{/* Modal: Create/Edit Telemetry */}
								<Dialog
									open={showTelemetryModal}
									onOpenChange={setShowTelemetryModal}
								>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>
												{editTelemetry
													? "Edit Telemetry Log"
													: "Tambah Telemetry Log"}
											</DialogTitle>
										</DialogHeader>
										<form
											onSubmit={handleTelemetryFormSubmit}
											className="space-y-3"
										>
											<select
												name="vehicleId"
												className="w-full border rounded-md p-2"
												value={telemetryForm.vehicleId || ""}
												onChange={handleTelemetryFormChange}
												required
											>
												<option value="">Pilih Kendaraan</option>
												{vehicles.map((v) => (
													<option key={v.id} value={v.id}>
														{v.name}
													</option>
												))}
											</select>
											<Input
												name="timestamp"
												type="datetime-local"
												value={
													telemetryForm.timestamp
														? new Date(telemetryForm.timestamp)
																.toISOString()
																.slice(0, 16)
														: ""
												}
												onChange={handleTelemetryFormChange}
												required
											/>
											<Input
												name="odometer"
												type="number"
												placeholder="Odometer"
												value={telemetryForm.odometer || ""}
												onChange={handleTelemetryFormChange}
												required
											/>
											<Input
												name="fuel_level"
												type="number"
												placeholder="BBM (%)"
												value={telemetryForm.fuel_level || ""}
												onChange={handleTelemetryFormChange}
												min={0}
												max={100}
												required
											/>
											<Input
												name="speed"
												type="number"
												placeholder="Kecepatan"
												value={telemetryForm.speed || ""}
												onChange={handleTelemetryFormChange}
												min={0}
												required
											/>
											<DialogFooter>
												<Button
													type="button"
													variant="ghost"
													onClick={() => setShowTelemetryModal(false)}
												>
													Batal
												</Button>
												<Button type="submit" variant="secondary">
													{editTelemetry ? "Update" : "Tambah"}
												</Button>
											</DialogFooter>
										</form>
									</DialogContent>
								</Dialog>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</main>
		</>
	);
}
