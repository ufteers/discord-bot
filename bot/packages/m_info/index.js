ds_client.guilds.forEach(function(guild, guildid) {
  if(serverconfig[guildid]) {

    // Run message
    if(serverconfig[guildid].m_info.run_message.channelid.length > 17) {
      ds_client.channels.get(serverconfig[guildid].m_info.run_message.channelid).send(
        language.modules.m_info.run_text
      );
    }
  }
});