const geossMonths = ["Kotahi", "Rua", "Toru", "Ewha", "Erima", "Ono", "Tokowhitu", "Waru", "Iwa", "Tekau", "Matahi", "Marua"];

class GeossCalendar
{
	private funcDate: Date;
	constructor(year: number = 2353, month: number = 1, day: number = 1, hour: number = 7, minute: number = 0)
	{
		this.funcDate = new Date(year, month, day, hour, minute);
	}

	addDays(days: number) { this.funcDate.setDate(this.funcDate.getDate() + days); };

	addHours(hours: number)
	{
		this.funcDate.setHours(this.funcDate.getHours() + hours);
		this.funcDate.setMinutes(this.funcDate.getMinutes() + ((hours % 1) * 60));
	};

	getDate() { return this.funcDate.getDate(); };

	getDisplayDate() { return `${getFriendlyDayNumber(this.funcDate.getDate())} of ${this.getMonthName()}, ${this.getYear()} AE`; }

	getHours() { return this.funcDate.getHours(); };

	getMinutes() { return this.funcDate.getMinutes(); };

	getMonth() { return this.funcDate.getMonth(); };

	getMonthName() { return geossMonths[this.funcDate.getMonth()]; };

	getTime() { return getFriendlyHour(this.funcDate); };

	getYear() { return this.funcDate.getFullYear(); };
}

function getFriendlyDayNumber(day: number): string {
	let dayString = day + '';
	switch (dayString.slice(-1)) {
		case "1":
			return day + 'st';
		case "2":
			return day + 'nd';
		case "3":
			return day + 'rd';
		default:
			return day + 'th';
	}
}

function getFriendlyHour(date: Date) {
	var hour = date.getHours();
	var minutes = getFriendlyMinutes(date);
	if (hour < 11) {
		return (hour + 1) + ":" + minutes + "AM";
	} else {
		return (hour-11) + ":" + minutes + "PM";
	}
}

function getFriendlyMinutes(date: Date) {
	var minutes = date.getMinutes();
	if (minutes < 10) {
		return "0" + minutes;
	} else {
		return minutes + "";
	}
}