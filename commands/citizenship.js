/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('citizenship')
    .setDescription('Gestisci la tua cittadinanza.')
    .addSubcommand(sc =>
        sc
        .setName('apply')
        .setDescription('Richiedi la cittadinanza per il server corrente'))
    .addSubcommand(sc =>
        sc
        .setName('update')
        .setDescription('Aggiorna i tuoi dati.'))
    ,
    hasPlayer: true,
    async execute(interaction, player){
        await interaction.reply({
            content: `Comando pronto nei prossimi giorni!`,
            ephemeral: true
        });

        return false;
    }
};