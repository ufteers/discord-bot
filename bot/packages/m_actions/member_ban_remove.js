ds_client.on("guildBanRemove", (guild, member) => {
	
	if(serverconfig[guild.id].m_actions.ban_remove_message.length > 17) {

    utils.log("User " + member.username + " (id - " + member.id + ") has been unbanned.");

    var user_avatar = (member.avatar)?("https://cdn.discordapp.com/avatars/" + member.id + "/" + member.avatar + ".png?size=128"):("https://cdn.discordapp.com/embed/avatars/" + member.discriminator % 5 + ".png");

    const embed = {
      "color": 0xa299e1,
      "author": {
        "name": 
          (!member.bot)?
            (language.modules.m_actions.member_unbanned):
            (language.modules.m_actions.bot_unbanned),
        "icon_url": user_avatar
      },
      "description": "<@" + member.id + "> " + member.username + "#" + member.discriminator,
      "footer": {"text": "ID: " + member.id + " • " + utils.getTime()},
    };
    ds_client.channels.get(serverconfig[guild.id].m_actions.ban_remove_message).send({ embed });
	}
});