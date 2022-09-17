/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const { SlashCommandBuilder } = require('@discordjs/builders');
const { applyCitizenship } = require('../helpers/customs.js');
const { parsePronouns } = require('../helpers/inclusion.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('citizenship')
    .setDescription('Gestisci la tua cittadinanza.')
    .addSubcommand(sc =>
        sc
        .setName('apply')
        .setDescription('Richiedi la cittadinanza per il server corrente')
        )
    .addSubcommand(sc =>
        sc
        .setName('update')
        .setDescription('Aggiorna i tuoi dati.')
        .addStringOption(o=>
            o.setName('pronouns')
            .setDescription('I tuoi pronomi.')
            .setRequired(false)
        )
        )
    ,
    hasPlayer: true,
    async execute(interaction, player){

        if (interaction.options.getSubcommand() === 'apply') {
            return applyCitizenship(interaction, player);
        } else if (interaction.options.getSubcommand() === 'update') {
            const pronounsStr = interaction.options.getString('pronouns');

            if (pronounsStr){
                const pronounsNumber = parsePronouns(pronounsStr);

                player.pronouns = pronounsNumber;
                await player.touch();
            }
        }
    }
};