const path = require('path');
const fs = require("fs");

commands = new ds.Collection();

ds_client.on('ready', () => 
{
	utils.log(language.cmdhandler.init);
	fs.readdir("./bot/packages/", (err, files) => {
		if(err) {
			console.log(err);
			return;
		}

		files.forEach(function(cmdname, index) {
			var command = files[index];
			fs.readdir("./bot/packages/" + command + "/commands", (err, files) => {
				if(!err) {
					utils.log(language.cmdhandler.package_registered, command, files);
					
					files.forEach(function(cmdname, index) {
						let props = require("./packages/" + command + "/commands/" + files[index]);
	
						//Find duplicates
						commands.forEach(function(cmdname) {
							if(cmdname.name == props.name) {
								utils.log(language.cmdhandler.command_defined, cmdname.name);
								return;
							}
						});

						//Find Discord commands
						var discordcommands = ["xivdb", "giphy", "tenor", "tts", "me", "tableflip", "unflip", "shrug", "nick"];
						
						discordcommands.forEach(function(cmdname) {
							if(cmdname == props.name)
							{
								utils.log(language.cmdhandler.command_discord, cmdname);
								return;
							}
						});

						commands.set(props.name, props);
					});
				}
			});
		});
	});
});

ds_client.on('message', (message) => 
{
	if(serverconfig[message.guild.id])
	{
		if(message.author.bot) return;
		
		if(message.content.indexOf(serverconfig[message.guild.id].command_prefix) !== 0) return;
		const args = message.content.slice(1).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
			
		let commandfile = commands.get(command);
		if(commandfile)
		{
			commandfile.run(ds_client,message,args);
			utils.log(language.cmdhandler.command_found, message.author.username, message.author.id, command, args);
		}
		else utils.log(language.cmdhandler.command_notfound, message.author.username, message.author.id, command, args);
	}
});

global.cmd = function(filename) {
	return path.basename(filename).substring(0, path.basename(filename).length - 3);
}