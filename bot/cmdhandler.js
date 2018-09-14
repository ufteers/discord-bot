const path = require('path');
const fs = require("fs");

commands = new ds.Collection();

ds_client.on('ready', () => 
{
	utils.log(language.cmdhandler.init);
	
	fs.readdir("./bot/packages/", (err, files) => {
		if(err) {
			utils.logError(err.stack);
		}
		else {
			files.forEach(function(cmdname, index) {
				var command = files[index];
				fs.readdir("./bot/packages/" + command + "/commands", (err, files) => {
					if(err) {
						utils.logError(err.stack);
					}
					else {
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
		}
	});
});

ds_client.on("message", (message) => 
{
	if(message.guild !== null) {
		if(message.author.bot) return;
		if(serverconfig[message.guild.id])
		{
			for(var i = 0; i < serverconfig[message.guild.id].command_prefix.length; i++) {
				
				var args, prefix = serverconfig[message.guild.id].command_prefix[i];
				
				if(prefix === "{mention}") {		
				
					var bottag1 = "<@" + ds_client.user.id + ">";
					var bottag1_result = message.content.indexOf(bottag1);
			
					var bottag2 = "<@!" + ds_client.user.id + ">";
					var bottag2_result = message.content.indexOf(bottag2);
									
					if(bottag1_result !== 0 && bottag2_result !== 0) continue;
					
					args = message.content.slice((bottag1_result !== 0)?(bottag2.length):(bottag1.length)).trim().split(/ +/g);
				}
				else {
					
					if(message.content.indexOf(prefix) !== 0) continue;
					args = message.content.slice(prefix.length).trim().split(/ +/g);
				}		

				const command = args.shift().toLowerCase();

				var argstext = "";
				args.forEach(function(arg) { argstext += arg + " "; });

				let commandfile = commands.get(command);
				if(commandfile) {
					
					utils.log(language.cmdhandler.command_found, message.author.username, message.author.id, command, argstext);
					commandfile.run(ds_client,message,args);
				}
				else utils.log(language.cmdhandler.command_notfound, message.author.username, message.author.id, command, argstext);
				break;
			}
		}
	}
});

global.cmd = function(filename) {
	return path.basename(filename).substring(0, path.basename(filename).length - 3);
}

global.isCanUsed = function(module, cmd, message) {
	if(serverconfig[message.guild.id][module].commands[cmd].channels[0] == 0) return 0;
	else if(serverconfig[message.guild.id][module].commands[cmd].channels[0] == -1) return 1;
	else 
	{
		var channels = serverconfig[message.guild.id][module].commands[cmd].channels;
		for(var i = 0; i < channels.length; i++) {
			if(message.channel.id === channels[i]) {
				if(channels[i].length > 17) return 1;
			}
		}
		return 0;
	}
}