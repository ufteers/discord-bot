const format = require("format");

exports.log = function () {	
	return console.log("[" + this.getTime() + "] " + format.apply(null, arguments));
};

exports.getTime = function () {
	var now = new Date();
	var hours = now.getHours();	if(hours < 10) hours = "0" + hours;
	var minutes = now.getMinutes(); if(minutes < 10) minutes = "0" + minutes;
	var seconds = now.getSeconds(); if(seconds < 10) seconds = "0" + seconds;
	var day = now.getDay();	if(day < 10) day = "0" + day;
	var month = now.getMonth();	if(month < 10) month = "0" + month;
	var year = now.getFullYear();
	return hours + ":" + minutes + ":" + seconds + " " + day + "/" + month + "/" + year;
};

exports.setTerminalTitle = function (title) {
	if (process.platform == 'win32') process.title = title;
	else process.stdout.write('\x1b]2;' + title + '\x1b\x5c');
}