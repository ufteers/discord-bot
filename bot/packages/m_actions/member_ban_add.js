global.ban_list = [];

ds_client.on("guildBanAdd", (guild, member) => {

  if(serverconfig[guild.id].m_actions.ban_add_message.length > 17) {

    ban_list.push(member.id);

    utils.log(utils.format(language.modules.m_actions.console_ban_add, member.username, member.id));

    var user_avatar = (member.avatar)?("https://cdn.discordapp.com/avatars/" + member.id + "/" + member.avatar + ".png?size=128"):("https://cdn.discordapp.com/embed/avatars/" + member.discriminator % 5 + ".png");

    const embed = {
      "color": 0xa299e1,
      "author": {
        "name": 
          (!member.bot)?
            (utils.format(language.modules.m_actions.member_banned, guild.memberCount - 1)):
            (utils.format(language.modules.m_actions.bot_banned, guild.memberCount - 1)),
        "icon_url": user_avatar
      },
      "description": "<@!" + member.id + "> " + member.username + "#" + member.discriminator,
      "footer": {"text": "ID: " + member.id + " • " + utils.getTime()},
    };
    ds_client.channels.get(serverconfig[guild.id].m_actions.ban_add_message).send({ embed });
	}
});