var init = function(response) {
	utils.setTerminalTitle(language.main.name + " / " + language.updater.init);
	utils.log(language.updater.init);
	
	//Soon
	utils.log(language.updater.no_updates + "\n");
	response.apply([false]);
}

module.exports = {init: init};