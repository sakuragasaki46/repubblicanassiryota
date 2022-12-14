/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Player } = require('../dbObjects.js');
const money = require('../helpers/money.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Mostra le informazioni riguardo un certo utente.')
    .addUserOption( o =>
      o
	.setName('user')
	.setDescription('L’utente di cui mostrare le info.')
	.setRequired(false)
    )
  ,
  async execute (interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild.members.cache.get(user.id);
    const joinDiscord = `<t:${Math.floor(user.createdAt.getTime()/1000)}>`;
    const joinGuild = `<t:${Math.floor(member.joinedAt.getTime()/1000)}>`;
    const pl = await Player.findByPk(user.id);
    const pl_age = pl && pl.age();
    const citizen = pl && await pl.getCitizen(interaction.guild.id);

    const embed = new MessageEmbed()
	  .setTitle(`Info: ${user.tag}`)
	  .setDescription(user.bot? 'BOT': [
	    // TODO
	    pl_age && `${pl_age}yo`,
	    pl && pl.pronouns_str(),
	    pl && pl.gender_str(),
	    pl && pl.mbtype_str()
	  ].filter(x => x).join(' – '))
	  .addFields(
	    {name: 'ID', value: `${user.id}`, inline: true},
	    {name: 'Presente su Discord da', value: `${joinDiscord}`, inline: true},
	    {name: 'Nel server da', value:`${joinGuild}`, inline:true})
	  .setThumbnail(user.avatarUrl)
	  .setTimestamp(new Date);

    if (pl) {
      embed
	.addFields(
	  {name: 'Bilancio', value: money(pl.balance), inline: true});
  }
  if (citizen){
    embed
	.addFields(
    {name: 'Cittadino da', value: `<t:${Math.floor(citizen.citizen_since / 1000)}>`, inline: true},
	  {name: 'Qualifica', value: `${await citizen.getRankName()}`, inline: true},
	  );
    }

    return interaction.reply({
      embeds: [embed]
    });
  }
};
