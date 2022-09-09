const { MessageEmbed } = require('discord.js');

module.exports = async function (interaction, player) {
  if (player.isBlacklisted()){
    const embed = new MessageEmbed()
	  .setTitle('Sei in lista nera!')
	  .setDescription(`Non puoi usare comandi fino a <t:${new Date(player.blacklisted_until) / 1000}>`)
    .setColor(0xee3333);
    
    await interaction.reply(
      {embeds: [embed]}
    );
    
    return true;
  }
  return false;
}
