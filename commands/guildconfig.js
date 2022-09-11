/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const { GuildConfig } = require('../dbObjects.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('guildconfig')
    .setDescription('Imposta una variabile di configurazione del server')
    .addSubcommand( sc =>
      sc
	.setName('set')
	.setDescription('Imposta una variabile di configurazione del server')
	.addStringOption( o =>
	  o
	    .setName('key')
	    .setDescription('Il nome della variabile')
	    .setRequired(true)
	)
	.addStringOption( o =>
	  o
	    .setName('value')
	    .setDescription('Il valore della variabile')
	    .setRequired(true)
	)
    )
    .addSubcommand ( sc =>
      sc
	.setName('get')
	.setDescription('Visualizza il valore di una variabile di configurazione.')
	.addStringOption( o =>
	  o
	    .setName('key')
	    .setDescription('Il nome della variabile')
	    .setRequired(true)
	)
    )
    .addSubcommand ( sc =>
      sc
	.setName('unset')
	.setDescription('Rimuove una variabile di configurazione')
	.addStringOption( o =>
	  o
	    .setName('key')
	    .setDescription('Il nome della variabile')
	    .setRequired(true)
	)
    )
  ,
  async execute (interaction) {

    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)){
      const embed = new MessageEmbed()
	    .setTitle('Non hai i permessi')
	    .setDescription('Non hai i permessi necessari per usare **/guildconfig**.')
	    .setColor(0x660099);
      
      await interaction.reply({
	embeds: [embed],
	ephemeral: true
      });
      
      return false;
    }
    
    if (interaction.options.getSubcommand() === 'set') {

      const key = interaction.options.getString('key');
      let value = interaction.options.getString('value');

      const mentionable = value.match(/<(?:@[!&]|#)?(\d+)>/);
      if (mentionable) value = mentionable[1];

      await GuildConfig.setVar(interaction.guild.id, key, value);
      await interaction.reply({
	content: `Impostato **${key}** a \`${value}\` 👍`,
	ephemeral: true
      });
    } else if (interaction.options.getSubcommand() === 'get') {
      const key = interaction.options.getString('key');
      const value = await GuildConfig.getVar(interaction.guild.id, key);

      const embed = new MessageEmbed();

      embed
	.setTitle('Configurazione server');
      
      if (value !== null) {
	embed
	  .setDescription(`Il valore di **${key}** è \`${value}\``)
	  .setColor(0x339900);
      } else {
	embed
	  .setDescription(`Nessun valore impostato per **${key}**`)
	  .setColor(0xcc3300);
      }
      
      await interaction.reply({
	embeds: [embed],
	ephemeral: true
      });
    } else if (interaction.options.getSubcommand() === 'unset') {
      const key = interaction.options.getString('key');

      await GuildConfig.delVar(interaction.guild.id, key);
      
      const embed = new MessageEmbed();

      embed
	.setTitle('Configurazione server')
	.setDescription(`Chiave **${key}** rimossa con successo!`)
      
      await interaction.reply({
	embeds: [embed],
	ephemeral: true
      });
    }
  }
};
