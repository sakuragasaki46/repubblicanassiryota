/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Bibbia } = require('../dbObjects.js');
const { superscriptNumber } = require('../helpers/unicode.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bibbia')
    .setDescription('Sfoglia tra i versetti della Bibbia.')
    .addStringOption(o =>
        o.setName('v')
        .setDescription('Il libro (abbreviato), capitolo e versetto da mostrare.')
        .setRequired(true)
        )
    ,
    async execute (interaction) {
        const vKey = interaction.options.getString('v');
        const vValue = await Bibbia.getVersetti(vKey);

        if (!vValue){
            const embed = new MessageEmbed()
                .setTitle('Errore')
                .setColor(0xcc3333)
                .setDescription('Devi inserire un formato riconoscibile dal bot: Esempio **Gn 1:1-8**');

            await interaction.reply({
                embeds: [embed]
            });

            return false;
        }

        const contentLines = [];

        for (const vx of vValue){
            contentLines.push(`${superscriptNumber(vx.versetto)}${vx.testo}`);
        }

        const content = contentLines.join(' ');
        if (content.length > 2000) {
            const embed = new MessageEmbed()
                .setTitle('Errore')
                .setColor(0xcc3333)
                .setDescription('A causa di una limitazione di Discord, non puoi visualizzare testi più lunghi di 2000 caratteri.');
                
            await interaction.reply({
                embeds: [embed]
            });

            return false;
        }

        const embed = new MessageEmbed()
        .setTitle(vKey)
        .setDescription(content)
        .setFooter({ text : 'La Bibbia (edizione CEI 2008)' });

        await interaction.reply({
            embeds: [embed]
        });
    }
};