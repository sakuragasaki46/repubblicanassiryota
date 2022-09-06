const { MessageEmbed, Permissions } = require('discord.js');

module.exports = async function(interaction, variables){
  const misses = [];
  
  for (const v in variables) {
    if (variables[v] === undefined) {
      misses.push(v);
    }
  }

  if (misses.length > 0) {
    const embed = new MessageEmbed()
	  .setTitle('Attenzione!')
	  .setColor(0x660099)
	  .setDescription(
	    `Il comando non può funzionare poiché non sono state impostate le seguenti variabili: ` +
	      misses.map(x => `**${x}**`).join(', ') +
	      (interaction.member?.permissions.has(Permissions.FLAGS.MANAGE_GUILD)? '': `\nChiedere a un amministratore di impostare queste variabili.`))

    await interaction.reply({
      embeds: [embed]
    });

    return false;
  }

  return true;
};
