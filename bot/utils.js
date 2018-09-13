const format = require("format");
const moment = require("moment");
const winston = require('winston');

exports.format = function () {

	return format.apply(null, arguments);
};

exports.getTime = function (format = "HH:mm:ss DD/MM/YYYY") {

	return moment().format(format);
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
		while ((ax = array.indexOf(a)) !== -1) {array.splice(ax, 1);}
	}
	return array;
};

exports.randomBool = function() {
	return Math.round((Math.random() * 1) + 0) === 0;
}

exports.log = function() {

	logger.info(format.apply(null, arguments));	
}

exports.logError = function() {

	logger.error(format.apply(null, arguments));	
}

const logger = winston.createLogger({
	format: winston.format.combine(winston.format.printf(info => "[" + this.getTime() + "] " + "[" + info.level + "] " + info.message)),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ 
			filename: "logs/" + this.getTime("HH.mm.ss, DD.MM.YYYY") + ".log"
		})
	]
});