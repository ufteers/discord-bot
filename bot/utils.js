const format = require("format");
const moment = require("moment");
const fs = require("fs");

exports.log = function () {

	log.write("[" + this.getTime() + "] " + format.apply(null, arguments) + "\n")
	return console.log("[" + this.getTime() + "] " + format.apply(null, arguments));
};

exports.format = function () {

	return format.apply(null, arguments);
};

exports.getTime = function (format = "HH:mm:ss DD/MM/YYYY") {

	return moment(new Date()).format(format);
};

exports.convertTime = function (timestamp, format = "HH:mm:ss DD/MM/YYYY") {

	return moment(timestamp).format(format);
};

exports.setTerminalTitle = function (title) {
	
	if (process.platform == 'win32') process.title = title;
	else process.stdout.write('\x1b]2;' + title + '\x1b\x5c');
};

exports.removeFromArray = function(array, value) {

	var  a = value, L = a.length, ax;
	while (L && array.length) {
			a[--L];
			while ((ax = array.indexOf(a)) !== -1) {
        array.splice(ax, 1);
			}
	}
	return array;
};

if (!fs.existsSync("./logs")) fs.mkdirSync("./logs");
var log = fs.createWriteStream("./logs/time - " + this.getTime("HH.mm.ss, date DD.MM.YYYY") + ".log", {flags: 'a'});