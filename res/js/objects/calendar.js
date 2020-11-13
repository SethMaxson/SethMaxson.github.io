const geossMonths = ["Kotahi", "Rua", "Toru", "Ewha", "Erima", "Ono", "Tokowhitu", "Waru", "Iwa", "Tekau", "Matahi", "Marua"];

function GeossCalendar(year, month, day, hour) {
	year = year || 353;
	month = month || 1;
	day = day || 1;
	hour = hour || 7;
	this.funcDate = new Date(year, month, day, hour);
	this.getMonth = function(){ return this.funcDate.getMonth(); };
	this.getMonthName = function(){ return geossMonths[this.funcDate.getMonth()]; };
	this.addDays = function(days) {this.funcDate.setDate(this.funcDate.getDate() + days);};
	this.addHours = function(hours) {
		this.funcDate.setHours(this.funcDate.getHours() + hours);
		this.funcDate.setMinutes(this.funcDate.getMinutes() + ((hours % 1) * 60));
	};
	this.getDate = function() {return this.funcDate.getDate();};
	this.getHours = function() {return this.funcDate.getHours();};
	this.getMinutes = function() {return this.funcDate.getMinutes();};
	this.getTime = function() {return getFriendlyHour(this.funcDate);};
	this.getYear = function() {return this.funcDate.getFullYear();};
	this.getDisplayDate = function() {
		var dateString = getFriendlyDayNumber(this.funcDate.getDate()) + ' of ' + this.getMonthName() + ', ' + this.getYear() + ' A.C.';
		return dateString;
	}
}



function getFriendlyDayNumber(day) {
	day = day + '';
	switch (day.slice(-1)) {
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
function getFriendlyHour(date) {
	var hour = date.getHours();
	var suffix = "PM";
	if (hour < 11) suffix = "AM";
	if (hour < 11) {
		return (hour + 1) + ":" + getFriendlyMinutes(date) + suffix;
	} else {
		return (hour-11) + ":" + getFriendlyMinutes(date) + suffix;
	}
}

function getFriendlyMinutes(date) {
	var minutes = date.getMinutes();
	if (minutes < 10) {
		return "0" + minutes;
	} else {
		return minutes + "";
	}
}