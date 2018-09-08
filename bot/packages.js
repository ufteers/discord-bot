const fs = require("fs");

ds_client.on('ready', () => 
{
	fs.readdir("./bot/packages/", (err, files) => {
		if(err) {
			console.log(err);
			return;
		}

		files.forEach(function(cmdname, index) {
			var package = files[index];
			fs.readdir("./bot/packages/" + package + "/", (err, files) => {
				if(!err) {
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
	});
});