module.exports = {name: cmd(__filename)};
module.exports.run = async (bot, message, args) => {

	if(isCanUsed("m_other",cmd(__filename), message)) {

		var messagetimestamp = message.createdTimestamp;

		ds_client.channels.get(message.channel.id).send(language.modules.m_other.coin_tossed).then(message => {

            setTimeout(function() {

                message.edit(language.modules.m_other.coin_dropped).then(message => {

                    setTimeout(function() {

                        var cointext = "";
                        if(utils.randomBool()) cointext = language.modules.m_other.coin_heads;
                        else cointext = language.modules.m_other.coin_tails;

                        const embed = {
                            "color": 0xa299e1,
                            "author": {"name": language.modules.m_other.coin_title},
                            "description": cointext
                        };
                        message.edit(language.modules.m_other.coin_result, {embed});
                    }, 500);
                });
            }, 500);
        });
	}
}