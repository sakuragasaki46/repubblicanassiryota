class PlayerAct {
  constructor(pl, endXpReward) {
    this.player = pl;
    this.endXpReward = endXpReward;
  }
  
  async start (interaction, callback){
    if (this.player.isBlacklisted()) {
      await this.onBlacklisted(interaction);
      return;
    }

    let error = null;
    try {
      await callback(this.player);
    } catch (e) {
      error = e;
    } finally {
      if (!error) {
	this.player.addExperience(this.endXpReward);
	await this.player.touch();
      }
    }

    if (error) {
      throw error;
    }
  }

  async onBlacklisted(interaction){
    const embed = new MessageEmbed()
	  .setTitle('Sei in lista nera!')
	  .setDescription(`Non puoi usare comandi fino a <t:${new Date(player.blacklisted_until) / 1000}>`)
    
    await interaction.reply(
      {embeds: [embed]}
    );
  }
};

module.exports = PlayerAct;
