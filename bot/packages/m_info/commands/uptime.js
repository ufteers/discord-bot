var runtime = Date.now();

module.exports = {name: cmd(__filename)};
module.exports.run = async (bot, message, args) => {
	var nowtime = Date.now();
	var text = "";
	var second = (nowtime - runtime) / 1000;

	if(second < 59) text = parseInt(second) + " sec.";
	else if(second < 3599) text = parseInt(second / 60) + " min " + parseInt(second % 60) + " sec.";
	else text = parseInt(second / 3600) + " hr " + parseInt(second % 3600 / 60) + " min " + parseInt(second % 3600 % 60) + " sec."; //< 86399
	
	const embed = {
		"color": 0xa299e1,
		"author": {"name": language.modules.m_info.uptime_title},
		"description": utils.format(language.modules.m_info.uptime_text, text),
		"footer": {"text": utils.format(language.modules.m_info.uptime_started, new Date(runtime))},
	};
	ds_client.channels.get(message.channel.id).send({ embed });
}