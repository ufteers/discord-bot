ds_client.guilds.forEach(function(guild, guildid) {
  if(serverconfig[guildid]) {

    // Runtime message
    if(serverconfig[guildid].m_info.runtime_message.channelid.length > 17) {
      ds_client.channels.get(serverconfig[guildid].m_info.runtime_message.channelid).send(
        language.modules.m_info.runtime_text
      );
    }
  }
});