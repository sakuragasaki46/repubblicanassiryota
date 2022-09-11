const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions, Modal, MessageActionRow, TextInputComponent } = require('discord.js');
const { GuildConfig } = require('../dbObjects.js');
const ensureGuildConfig = require('../helpers/ensureGuildConfig.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('partnership')
    .setDescription('Esegui una Partnership con un altro server.')
    .addUserOption(
      o => o
	.setName('user')
	.setDescription('L’utente col quale effettuare Partnership. Deve essere presente nel server.')
	.setRequired(true)
    )
  ,
  hasPlayer: true,
  async execute (interaction) {

    const { partnershipChannel, partnershipRole } = await GuildConfig.getVars(interaction.guild.id, ['partnershipChannel', 'partnershipRole']);

    // check if partnershipChannel and partnershipRole are undefined
    if (!await ensureGuildConfig(interaction, { partnershipChannel, partnershipRole })){
      return;
    }

    if (!interaction.member.roles.cache.has(partnershipRole) || !interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
      const embed = new MessageEmbed()
	    .setTitle('Attenzione!')
	    .setColor(0x660099)
	    .setDescription(
	      `Non hai il ruolo Partnership o un ruolo di gestione server.  Dunque, non puoi usare questo comando.`
	    );

      await interaction.reply({
	embeds: [embed],
	ephemeral: true
      });
      
      return;
    }

    const otherUser = interaction.options.getUser('user');

    const modal = new Modal()
	  .setCustomId(`partnership:${otherUser.id}`)
	  .setTitle('Esegui una Partnership')
	  .addComponents(
	    new MessageActionRow()
	      .addComponents(
		new TextInputComponent()
		  .setCustomId('description')
		  .setLabel('Descrizione del server')
		  .setStyle('PARAGRAPH')
	      )
	  );

    await interaction.showModal(modal);
  }
};
