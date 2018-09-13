const fs = require("fs");

ds_client.on('ready', () => 
{
	fs.readdir("./bot/packages/", (err, files) => {
		if(err) {
			utils.logError(err.stack);
		}
		else {
			files.forEach(function(cmdname, index) {
				var package = files[index];
				fs.readdir("./bot/packages/" + package + "/", (err, files) => {

					if(err) {
						utils.logError(err.stack);
					}
					else {
						if(files.indexOf("index.js") == -1)
						{
							utils.log(language.package.noindexjs, package);
							process.exit(1);
						}
						
						files.forEach(function(filename, index) {
							if(filename === "index.js") 
							{
								utils.log(language.package.loaded, package);
								
								require("./packages/" + package + "/index.js");
								return;
							}
						});
					}
				});
			});
		}
	});
});