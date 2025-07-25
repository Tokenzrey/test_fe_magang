export type HistoryPoint = {
	time: string;
	speed: number;
	fuel_level: number;
	odometer: number;
};

export type TelemetryLogStatsResponse = {
	success: boolean;
	message: string;
	responseObject: {
		total: number;
		parked: number;
		moving: number;
		maintenance: number;
	} | null;
	statusCode: number;
};

export type Vehicle = {
	id: number;
	name: string;
	status: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | string;
	speed: number;
	updated_at: string;
};

export type VehicleDetailSuccessResponse = {
	vehicleId: number;
	odometer: number;
	fuel_level: number;
	timestamp: string;
	latitude: number;
	longitude: number;
	speed: number;
};

export type VehicleListErrorResponse = {
	success: false;
	message: string;
	responseObject: null;
	statusCode: number;
};

export type TelemetryLogVehicleData = {
	lat: number;
	lon: number;
	speed: number;
	odometer: number;
	fuel_level: number;
};

export type TelemetryLogVehicleRecord = {
	id: number;
	vehicle_id: number;
	timestamp: string;
	data: TelemetryLogVehicleData;
};

export type TelemetryLogVehicleAllSuccessResponse = {
	success: true;
	message: string;
	responseObject: TelemetryLogVehicleRecord[];
	statusCode: number;
};
