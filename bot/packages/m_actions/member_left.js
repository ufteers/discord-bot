ds_client.on("guildMemberRemove", (member) => {
	
	if(serverconfig[member.guild.id].m_actions.leave_message.length > 17) {

		var skip_notify = false;

		ban_list.forEach(element => {
			if(element === member.id)
			{
				skip_notify = true;
				utils.removeFromArray(ban_list,element);
			}
		});
		
		if(!skip_notify) {

			utils.log("User " + member.user.username + " (id - " + member.id + ") left from server.");

			var user_avatar = (member.user.avatar)?("https://cdn.discordapp.com/avatars/" + member.user.id + "/" + member.user.avatar + ".png?size=128"):("https://cdn.discordapp.com/embed/avatars/" + member.user.discriminator % 5 + ".png");

			const embed = {
				"color": 0xa299e1,
				"author": {
					"name": 
						(!member.user.bot)?
							(utils.format(language.modules.m_actions.member_left, member.guild.members.size)):
							(utils.format(language.modules.m_actions.bot_left, member.guild.members.size)),
					"icon_url": user_avatar
				},
				"description": "<@" + member.user.id + "> " + member.user.username + "#" + member.user.discriminator,
				"fields": [
					{
						"name": language.modules.m_actions.user_joinded,
						"value": "" + utils.convertTime(member.joinedTimestamp),
						"inline": true
					},
					{
						"name": language.modules.m_actions.user_registered,
						"value": "" + utils.convertTime(member.user.createdTimestamp),
						"inline": true
					}
				],
				"footer": {"text": "ID: " + member.id + " • " + utils.getTime()},
			};
			ds_client.channels.get(serverconfig[member.guild.id].m_actions.leave_message).send({ embed });
		}
	}
});