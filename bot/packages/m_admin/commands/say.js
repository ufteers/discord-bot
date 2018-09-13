module.exports = {name: cmd(__filename)};
module.exports.run = async (bot, message, args) => {

  if(isCanUsed("m_admin",cmd(__filename), message)) {

    //Check permission
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {

      message.reply(language.cmdhandler.no_manage_permission);
      return;
    }

    //Check attachments
    var attachmenturl = "";
    message.attachments.forEach(element => {

      attachmenturl = element.url;
    });

    //Check args
    if(!args[0]) return message.reply(language.cmdhandler.invalid_arguments);
    if(!args[0][1] == '#') return message.reply(language.cmdhandler.invalid_arguments);
    if(!(args[1] || attachmenturl)) return message.reply(language.cmdhandler.invalid_arguments);
    
    var channel_id = args[0].replace(/\D/g,'');
    args.shift();

    //Check channel id
    if(channel_id.length < 17) {

      message.reply(language.cmdhandler.invalid_arguments);
      return;
    }
    
    var message_text = "";
    for(var i = 0; i < args.length; i++) {

      message_text += " ";
      message_text += args[i];
    };

    if(attachmenturl) ds_client.channels.get(channel_id).send(message_text, {files:[attachmenturl]});
    else ds_client.channels.get(channel_id).send(message_text);
  }
}