global.utils = require('./bot/utils.js');
require("./bot/entry.js");

// Require config & other files
global.botconfig = require("./configs/bot-settings.json");
global.language = require("./languages/" + botconfig.language_package + ".json");

utils.setTerminalTitle(language.main.name + " / " + language.launcher.init);
utils.log(language.launcher.init);
utils.log(language.launcher.language_init + "\n", language.name, language.code);

require("./bot/updater.js").init(function(needupdate)
{
	if(needupdate && !botconfig.skip_update) return;

	if(botconfig.bot.token.length < 58) utils.log(language.launcher.invalid_token);
	else ds_client.login(botconfig.bot.token);
});