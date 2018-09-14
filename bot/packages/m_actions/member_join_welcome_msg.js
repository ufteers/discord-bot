var request = require("request");

ds_client.on("guildMemberAdd", (member) => {

  if(
    serverconfig[member.guild.id].m_actions.welcome_message.text ||
    serverconfig[member.guild.id].m_actions.welcome_message.attach
  ) {

    utils.log(utils.format(language.modules.m_actions.console_welcome, member.user.username, member.id));
    
    request(serverconfig[member.guild.id].m_actions.welcome_message.attach, function (error, response, body) {

      if(error) utils.logError(error.message);
      else {
        if(response.statusCode !== 200) {
          utils.logError(utils.format(language.modules.m_actions.console_welcome_attach_error, response.statusCode));
          var attach = 0;
        }
        else {
          var attach = serverconfig[member.guild.id].m_actions.welcome_message.attach;
        }
        
        var message_text = "";
        serverconfig[member.guild.id].m_actions.welcome_message.text.forEach(element => {
          message_text += element + "\n";
        });
          
        if(!attach) {

          member.send(message_text).then(function(message) {utils.log(utils.format(language.modules.m_actions.console_welcome_sucefull, member.user.username, member.id))})
          .catch(function(error) {
            utils.logError(utils.format(error.name + ": " + error.message))
          });
        }
        else {

          member.send(message_text, {files:[attach]}).then(function(message) {utils.log(utils.format(language.modules.m_actions.console_welcome_sucefull, member.user.username, member.id))})
          .catch(function(error) {
            utils.logError(utils.format(error.name + ": " + error.message))
          });
          
        }
      }
    });    
	}
});