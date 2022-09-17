/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { GuildCountry } = require('../dbObjects.js');

const GOVERNMENT_TYPES = {
    0: 'Sconosciuta',
    1: 'Dittatura',
    2: 'Dipendenza',
    3: 'Monarchia assoluta',
    4: 'Monarchia costituzionale',
    5: 'Repubblica presidenziale',
    6: 'Repubblica parlamentare',
    7: 'Repubblica popolare',
    8: 'Repubblica islamica',
    9: 'Teocrazia',
    10: 'Emirato'
};


module.exports = {
  data: new SlashCommandBuilder()
  .setName('guildinfo')
  .setDescription('Informazioni su un server/Stato virtuale.')
  .addStringOption(o =>
    o.setName('id')
    .setDescription('L’ID del server.')
    .setRequired(false))
  ,
  async execute(interaction){
    const guildId = interaction.options.getString('id') || interaction.guild.id;
    const guild = interaction.client.guilds.cache.get(guildId);

    const guildCountry = await GuildCountry.findOne({
        where: {
            id: guildId
        }
    }) || {
        id: guildId
    };

    if (!guildCountry.name && !guild){
        await interaction.reply({
            content: `Server non trovato!`
        });
    }

    const embed = new MessageEmbed()
    .setTitle(`${guildCountry.name || guild.name}`)
    .addFields([
        {name: 'ID', value: `${guildId}`, inline: true},
        {name: 'Forma di governo', value: `${GOVERNMENT_TYPES[guildCountry.government_type] || '?'}`, inline: true},
        {name: 'Leader', value: `${guildCountry.governor_id ? `<@${guildCountry.governor_id}>` : 'Sconosciuto'}`, inline: true}
    ]);

    await interaction.reply({
        embeds: [embed]
    });
  }
}