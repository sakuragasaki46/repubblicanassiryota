/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const { SlashCommandBuilder, SelectMenuComponent } = require('@discordjs/builders');
const { MessageEmbed, Permissions, MessageActionRow } = require('discord.js');
const { GuildCountry } = require('../dbObjects.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Comando da eseguire una sola volta…')
    .addIntegerOption(o =>
        o.setName('government_type')
        .setDescription('La forma di governo')
        .setRequired(true)
        .setChoices([
            ['Dittatura', 1],
            ['Dipendenza', 2],
            ['Monarchia assoluta', 3],
            ['Monarchia costituzionale', 4],
            ['Repubblica presidenziale', 5],
            ['Repubblica parlamentare', 6],
            ['Repubblica popolare', 7],
            ['Repubblica islamica', 8],
            ['Teocrazia', 9],
            ['Emirato', 10]
        ]))
    .addStringOption(o =>
        o.setName('citizen_name')
        .setDescription('Il nome del cittadino')
        .setRequired(true))
    .addStringOption(o =>
        o.setName('name')
        .setDescription('Il nome dello Stato. Di default è il nome del server.')
        .setRequired(false))
    .addUserOption(o =>
        o.setName('governor')
        .setDescription('Il leader dello Stato.')
        .setRequired(false))
        
    ,
    async execute(interaction){
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

        const country = await GuildCountry.findByPk(interaction.guild.id);

        if (country) {
            const embed = new MessageEmbed()
            .setTitle('Informazione')
            .setDescription('Questo server è stato già impostato.')
            .setColor(0x339900);

            await interaction.reply({
                embeds: [embed]
            });

            return false;
        }

        await interaction.deferReply();

        // set up

        await GuildCountry.create({
            id: interaction.guild.id,
            name: interaction.options.getString('name') || interaction.guild.name,
            citizen_name: interaction.options.getString('citizen_name'),
            government_type: interaction.options.getInteger('government_type'),
            governor_id: (interaction.options.getUser('governor') || await interaction.guild.fetchOwner()).id
        });

        const embed = new MessageEmbed ()
        .setTitle('Stato creato!')
        .setDescription('Ricordati di impostare le variabili di configurazione con **/guildconfig**!')
        .setColor(0x339900);

        await interaction.editReply({
            embeds: [embed]
        });
    }
};