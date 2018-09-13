module.exports = {name: cmd(__filename)};
module.exports.run = async (bot, message, args) => {

  if(isCanUsed("m_admin",cmd(__filename), message)) {

    var channel_id = message.channel.id;

    //Check permission
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {

      message.reply(language.cmdhandler.no_manage_permission);
      return;
    }

    //Check args
    if(!args[0]) return message.reply(language.cmdhandler.invalid_arguments);

    var checked_user_id = args[0].replace(/\D/g,'');
    var checked_user = message.guild.members.get(checked_user_id);

    if(!checked_user) {
      message.reply(language.modules.m_admin.whois_user_notfound);
    }
    else {

      //Get info about user
      var user_prefix = (checked_user.user.bot)?("BOT"):("");
      var user_avatar = (checked_user.user.avatar)?("https://cdn.discordapp.com/avatars/" + checked_user.user.id + "/" + checked_user.user.avatar + ".png?size=128"):("https://cdn.discordapp.com/embed/avatars/" + checked_user.user.discriminator % 5 + ".png");

      //Get user status
      var status = checked_user.presence.status;
      if(status === "online") status = language.modules.m_admin.whois_status_online;
      else if(status === "idle") status = language.modules.m_admin.whois_status_idle;
      else if(status === "dnd") status = language.modules.m_admin.whois_status_dnd;
      else if(status === "offline") status = language.modules.m_admin.whois_status_offline;
      else status = "Unk " + status;

      //Get info about user roles
      var user_roles_count = 0;
      var user_roles_list = "";
      
      var user_roles_list_array = checked_user._roles;
      user_roles_list_array.forEach(element => {

        user_roles_count++;
        var role = message.guild.roles.get(element);

        user_roles_list += role.name;
        if(user_roles_count < user_roles_list_array.length) user_roles_list += ", ";
      });

      if(!user_roles_list.length) user_roles_list = language.modules.m_admin.whois_roles_none;

      const embed = {
        "color": 0xa299e1,
        "author": 
        {
          "name": checked_user.user.username + "#" + checked_user.user.discriminator + " " + user_prefix, 
          "icon_url": user_avatar
        },
        "description": "<@" + checked_user.user.id + ">",
        "thumbnail": {
          "url": user_avatar
        },
        "fields": [
          {
            "name": language.modules.m_admin.whois_status,
            "value": status,
            "inline": true
          },
          {
            "name": language.modules.m_admin.whois_joined,
            "value": "" + utils.convertTime(checked_user.joinedTimestamp),
            "inline": true
          },
          {
            "name": language.modules.m_admin.whois_registered,
            "value": "" + utils.convertTime(checked_user.user.createdTimestamp),
            "inline": true
          },
          {
            "name": utils.format(language.modules.m_admin.whois_roles, user_roles_count),
            "value": user_roles_list,
            "inline": true
          }
        ],
        "footer": {"text": "ID: " + checked_user_id + " • " + utils.getTime()},
      };
      ds_client.channels.get(channel_id).send({ embed });
    }
  }
}