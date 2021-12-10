interface IShipHull {
	ac: number;
	hp: number;
	dt: number;
}

interface IShipControl {
	name: string;
	ac: number;
	hp: number;
	entries: string[];
}

interface IShipSpeed {
	mode: string;
	entries: string[];
}

interface IShipMovement {
	name: string;
	ac: number;
	hp: number;
	hpNote: string;
	speed: IShipSpeed[];
}

interface IShipWeapon {
	name: string;
	count?: number;
	ac: number;
	hp: number;
	entries: string[];
	dt?: number;
}

interface IShipActionThresholds {
	0: number;
	1: number;
	2: number;
	3: number;
}

interface IAirshipStats {
	name: string;
	source: string;
	page: number;
	vehicleType: string;
	size: string;
	dimensions: string[];
	terrain: string[];
	capCrew: number;
	capPassenger: number;
	capCargo: number;
	pace: number;
	str: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;
	immune: string[];
	conditionImmune: string[];
	hull: IShipHull;
	control: IShipControl[];
	movement: IShipMovement[];
	weapon: IShipWeapon[];
	actionThresholds: IShipActionThresholds;
	action: any[];
	hasFluff: boolean;
	hasFluffImages: boolean;
}