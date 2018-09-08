module.exports = {name: cmd(__filename)};
module.exports.run = async (bot, message, args) => {

  if(isCanUsed("m_admin",cmd(__filename), message)) {

    var channel_id = message.channel.id;
    var channel_name = message.channel.name;
    var guild_name = message.channel.guild.name;
    
    //Check permission
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {

      message.reply(language.cmdhandler.no_manage_permission);
      return;
    }

    //Check args
    if(!args[0]) return message.reply(language.cmdhandler.invalid_arguments);
    if(parseInt(args[0]) < 1 || parseInt(args[0]) > 100) return message.reply(language.cmdhandler.invalid_arguments);

    message.channel.fetchMessages({limit:parseInt(args[0])}).then(function(messages_list) {

      var messages_count = 0;
      messages_list.forEach(element => {messages_count++;});
      
      message.channel.bulkDelete(messages_list).then;
      const embed = {
				"color": 0xa299e1,
				"author": {"name": guild_name},
        "description": utils.format(language.modules.m_admin.clean_text, channel_id, messages_count - 1 /*Without the command*/),
				"footer": {"text": "" + utils.convertTime(Date.now())},
			};
      ds_client.channels.get(channel_id).send({ embed });
    });
  }
}