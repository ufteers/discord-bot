global.ds = require("discord.js");
global.ds_client = new ds.Client();

global.serverconfig = require("./../configs/servers-settings.json");

require("./packages.js");
require("./cmdhandler.js");

ds_client.on('ready', () => {
	utils.setTerminalTitle(language.main.name + " / " + language.main.description);
	utils.log(language.launcher.suc_logged, ds_client.user.tag);
	utils.log(language.launcher.guilds_list);

	ds_client.user.setUsername(botconfig.bot.name);

	var servercount = 0;
	ds_client.guilds.forEach(function(guild, guildid) {
		servercount++;

		var serverconfigfound = false;
		if(serverconfig[guildid]) serverconfigfound = true;

		utils.log("	" + servercount + ") " + guild.name + " (" + guild.memberCount + " " + language.launcher.guilds_users + "), " + serverconfigfound);
	});
	utils.log(" ");
});