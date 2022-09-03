const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Player } = require('../dbObjects.js');
const money = require('../helpers/money.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Ogni giorno puoi ricevere un’iniezione di monete')
  ,

  async execute (interaction) {
    const pl = await Player.findByDsUser(interaction.user);
    await pl.act (interaction, async function() {
      const dailyInfo = pl.collectDaily();
      const embed = new MessageEmbed();
      if (dailyInfo.collected) {
	await pl.touch();

	embed
	  .setTitle(dailyInfo.curStreak > 0?
		    `Slancio di **${dailyInfo.curStreak} giorni**!`:
		    dailyInfo.lostStreak?
		    `Oh no! Hai perso il tuo slancio di ${dailyInfo.lostStreak}`:
		    'Benvenuto! Continua a eseguire /daily per ulteriori bonus!'
		   )
	  .setDescription(
	    `Hai ricevuto ${money(dailyInfo.totalCoins)}.\n\n` +
	      `Il tuo prossimo giornaliero è pronto in <t:${dailyInfo.nextDailyOn/1000}>`
	  )
      } else {
	embed 
	  .setTitle('Nient’altro per te per oggi')
	  .setDescription(`Il tuo prossimo giornaliero è pronto in <t:${Math.floor(dailyInfo.nextDailyOn/1000)}>`);
      }

      await interaction.reply({embeds: [embed]});
    });
  }
};
