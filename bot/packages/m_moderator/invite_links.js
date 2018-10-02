ds_client.on("message", (message) => 
{
  // Ignoring channels, users and roles will be added soon.
  console.log(message.channel.id);
  if(isMessageHaveInviteLinks(message)) {
    message.reply(language.modules.m_moderator.dont_post_invite);
    message.delete();
  }
});

function isMessageHaveInviteLinks(message) {

  var text = message.content.replace(/[^0-9a-zA-ZА-Яа-яЁё]/gi,'').replace(/\s+/gi,', ');
  var discordinvitesurl = ["discordgg","discordappcominvite"];

  discordinvitesurl.forEach(function(url) {

    var discordggpos = text.indexOf(url);
  
    if(discordggpos !== -1) {
      var firstpart = text.split(url)[0];
      var secondpart = text.split(url)[1];
      
      if(secondpart) {
        if(secondpart.length > 2) {
          return true;
        }
      }
    }
  });
  return false;
}
