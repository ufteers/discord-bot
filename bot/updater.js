var init = function(response) {
	utils.log(language.updater.init);
	
	//Soon
	utils.log(language.updater.no_updates + "\n");
	setTimeout(function() {
		response.apply([false]);
	}, 500);
}

module.exports = {init: init};