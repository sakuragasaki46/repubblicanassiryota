const { MessageEmbed, Permissions } = require('discord.js');
const { Player, GuildConfig } = require('../dbObjects.js');
const ensureGuildConfig = require('../helpers/ensureGuildConfig.js');
const money = require('../helpers/money.js');
const sanitizeMentions = require('../helpers/sanitizeMentions.js');

module.exports = {
  data: {
    name: 'partnership',
  },
  async execute(interaction) {
    const { partnershipChannel, partnershipRole, partnershipPing } = await GuildConfig.getVars(interaction.guild.id, ['partnershipChannel', 'partnershipRole', 'partnershipPing']);

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
	embeds,
	ephemeral: true
      });
      
      return;
    }

    const pl = await Player.findByDsUser(interaction.user);

    await pl.act(interaction, async function(){
      const otherUserId = interaction.customId.match(/partnership:(\d+)/)[1];
      const otherPl = await Player.findByDsUser({id: otherUserId});

      if (!interaction.guild.members.cache.has(otherUserId)){
	const embed = new MessageEmbed()
	      .setTitle('Partnership non eseguita')
	      .setDescription('L’utente non è in questo server.')
	      .setColor(0xcc3300);
	
	await interaction.reply({
	  embeds: [embed]
	});
      }

      await interaction.deferReply();

      let channel = interaction.client.channels.cache.get(partnershipChannel);

      if (!channel) {
	// TODO do something to fetch the channel
	
	const embed = new MessageEmbed()
	      .setTitle('Errore')
	      .setDescription('Canale Partnership non trovato.')
	      .setColor(0xcc3300)
	
	await interaction.editReply({
	  embeds: [embed]
	});

	return;
      }

      const messageSent = await channel.send(sanitizeMentions(interaction.fields.getTextInputValue('description')));

      const partnershipPingStr = partnershipPing ? `<@&${partnershipPing}>` : 'nessuno';
      
      await messageSent.reply(
	`
─────────────────
◇ Eseguita da: ${interaction.user}
◇ Eseguita dal server: ${interaction.guild.name}
◇ Eseguita con: <@${otherUserId}>
◇ Ping: ${partnershipPingStr}
─────────────────`);

      pl.addBalance(5);
      otherPl.addBalance(5);

      // TODO implement as single query
      await pl.touch();
      await otherPl.touch();

      const embed = new MessageEmbed()
	    .setTitle('Partnership eseguita!')
	    .setDescription(`Entrambi avete guadagnato ${money(5)}`)
	    .setColor(0x339900);
      
      await interaction.editReply({
	embeds: [embed]
      });
    });
  }
};
