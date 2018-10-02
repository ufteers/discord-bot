ds_client.on("guildMemberAdd", (member) => {

	if(serverconfig[member.guild.id].m_actions.join_message.length > 17) {

		utils.log(utils.format(language.modules.m_actions.console_join, member.user.username, member.id));

		var user_avatar = (member.user.avatar)?("https://cdn.discordapp.com/avatars/" + member.user.id + "/" + member.user.avatar + ".png?size=128"):("https://cdn.discordapp.com/embed/avatars/" + member.user.discriminator % 5 + ".png");

		const embed = {
			"color": 0xa299e1,
			"author": {
				"name": 
					(!member.user.bot)?
						(utils.format(language.modules.m_actions.member_join, member.guild.memberCount)):
						(utils.format(language.modules.m_actions.bot_join, member.guild.memberCount)),
				"icon_url": user_avatar},
			"description": "<@!" + member.user.id + "> " + member.user.username + "#" + member.user.discriminator,
			"fields": [
				{
					"name": language.modules.m_actions.user_registered,
					"value": "" + utils.convertTime(member.user.createdTimestamp)
				}
			],
			"footer": {"text": "ID: " + member.id + " • " + utils.getTime()},
		};
		ds_client.channels.get(serverconfig[member.guild.id].m_actions.join_message).send({ embed });
	}
});