class Length
{
	_inches: number = 0;
	constructor(measurement?: string)
	{
		if (measurement) {
			this._inches = parseMeasurementString(measurement);
		}
	}
	add(measurement: string)
	{
		this._inches += parseMeasurementString(measurement);
	}
	subtract(measurement: string)
	{
		this._inches -= parseMeasurementString(measurement);
	}
	imperial(): string
	{
		let feet = this.feet;
		let inches = this.inches;
		return `${feet > 0 ? feet + "' " : ""}${inches > 0 ? inches + "\"" : ""}`.trim();
	}
	get feet(): number {
		return Math.floor(this._inches / 12);
	}
	get inches(): number {
		return this._inches - (this.feet * 12);
	}
}

/**
 * Parses a measurement passed as a string and returns it as a number of inches.
 * @param measurement The measurement to parse
 */
function parseMeasurementString(measurement: string)
{
	measurement = measurement.trim().toLowerCase();
	if (measurement.includes("\"") || measurement.includes("'")) {
		// imperial
		let feet = 0;
		let inches = 0;
		if (measurement.includes("'")) {
			let unparsedFeet = measurement.split("'")[0].trim();
			feet = parseFloat(unparsedFeet);
			if (isNaN(feet)) {
				throw new Error("Feet portion of provided measurement is invalid.");
			}
		}

		if (measurement.includes("\"")) {
			let unparsedInches = measurement.includes("'") ? measurement.split("'")[1].split("\"")[0].trim() : measurement.split("\"")[0].trim();
			inches = parseFloat(unparsedInches);
			if (isNaN(inches)) {
				throw new Error("Inches portion of provided measurement is invalid.");
			}
		}
		return (feet * 12) + inches;
	}
	else
	{
		// metric
		let multiplier = 1;
		let meters = parseFloat(measurement.replace(/[^\d.-]/g, ''));
		if (measurement.includes("cm")) {
			multiplier = 0.01;
		}
		else if (measurement.includes("mm"))
		{
			multiplier = 0.001;
		}
		else if (measurement.includes("km"))
		{
			multiplier = 1000;
		}
		return ((meters * multiplier) / 3.2808) * 12;
	}
}