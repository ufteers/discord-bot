module.exports = {name: cmd(__filename)};
module.exports.run = async (bot, message, args) => {
	var messagetimestamp = message.createdTimestamp;

	ds_client.channels.get(message.channel.id).send("Pong!").then(message => {
		const embed = {
			"color": 0xa299e1,
			"author": {"name": language.modules.m_info.ping_title},
			"description": utils.format(language.modules.m_info.ping_text, parseInt(message.createdTimestamp - messagetimestamp)),
			"footer": {"text": "Debug: " + messagetimestamp + " - " + message.createdTimestamp + " = " + parseInt(message.createdTimestamp - messagetimestamp)},
		};
		message.edit({ embed });
	});
}