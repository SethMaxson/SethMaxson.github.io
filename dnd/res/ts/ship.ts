export module SHIP
{
	export interface Starship
	{
		Name: string;
		Tier: number;
		Size: Size;
		Frame: Frame;
		Speed: number;
		Maneuverability: number;
		Drift: number;
	}
	export enum Size
	{
		Tiny,
		Small,
		Medium,
		Large,
		Huge,
		Gargantuan,
		Colossal
	}
	export enum Frame
	{
		Battleship,
		BulkFreighter,
		Carrier,
		Cruiser,
		Destroyer,
		Dreadnought,
		Explorer,
		Fighter,
		HeavyFreighter,
		Interceptor,
		LightFreighter,
		Racer,
		Shuttle,
		Transport
	}
}