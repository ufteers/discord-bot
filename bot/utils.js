const format = require("format");
const fs = require("fs");

exports.log = function () {

	log.write("[" + this.getTime() + "] " + format.apply(null, arguments) + "\n")
	return console.log("[" + this.getTime() + "] " + format.apply(null, arguments));
};

exports.format = function () {

	return format.apply(null, arguments);
}

exports.getTime = function (delimiters = [":",":"," ","/","/"]) {

	var now = new Date();
	var hours = now.getHours();	if(hours < 10) hours = "0" + hours;
	var minutes = now.getMinutes(); if(minutes < 10) minutes = "0" + minutes;
	var seconds = now.getSeconds(); if(seconds < 10) seconds = "0" + seconds;
	var day = now.getDay();	if(day < 10) day = "0" + day;
	var month = now.getMonth();	if(month < 10) month = "0" + month;
	var year = now.getFullYear();
	return hours + delimiters[0] + minutes + delimiters[1] + seconds + delimiters[2] + day + delimiters[3] + month + delimiters[4] + year;
};

exports.convertTime = function (timestamp, delimiters = [":",":"," ","/","/"]) {

	var now = new Date(timestamp);
	var hours = now.getHours();	if(hours < 10) hours = "0" + hours;
	var minutes = now.getMinutes(); if(minutes < 10) minutes = "0" + minutes;
	var seconds = now.getSeconds(); if(seconds < 10) seconds = "0" + seconds;
	var day = now.getDay();	if(day < 10) day = "0" + day;
	var month = now.getMonth();	if(month < 10) month = "0" + month;
	var year = now.getFullYear();
	return hours + delimiters[0] + minutes + delimiters[1] + seconds + delimiters[2] + day + delimiters[3] + month + delimiters[4] + year;
};

exports.setTerminalTitle = function (title) {
	
	if (process.platform == 'win32') process.title = title;
	else process.stdout.write('\x1b]2;' + title + '\x1b\x5c');
}


if (!fs.existsSync("./logs")) fs.mkdirSync("./logs");
var log = fs.createWriteStream("./logs/time - " + this.getTime([".",".",", date - ",".","."]) + ".log", {flags: 'a'});