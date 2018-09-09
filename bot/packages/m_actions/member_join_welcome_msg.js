ds_client.on("guildMemberAdd", member => {

  if(
    serverconfig[member.guild.id].m_actions.welcome_message.text ||
    serverconfig[member.guild.id].m_actions.welcome_message.attach
  ) {

		utils.log("User " + member.user.username + " (id - " + member.id + ") join on server.");
    
    var message_text = "";
    serverconfig[member.guild.id].m_actions.welcome_message.text.forEach(element => {
      message_text += element;
      message_text += "\n"
    });

    var attach = serverconfig[member.guild.id].m_actions.welcome_message.attach;
    
    if(!attach) member.send(message_text);
    else member.send(message_text, {files:[attach]});
	}
});