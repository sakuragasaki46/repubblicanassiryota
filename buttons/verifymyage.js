/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const { Modal, MessageActionRow, TextInputComponent } = require("discord.js");

 
module.exports = {
    data: {name: 'verifymyage'},
    async execute (interaction) {
        const modal = new Modal()
        .setTitle('Verifica la tua età')
        .setCustomId(`verifymyage:${interaction.user.id}`)
        .addComponents(
            new MessageActionRow()
            .addComponents(
                new TextInputComponent()
                .setCustomId('date')
                .setRequired(true)
                .setStyle('SHORT')
                .setLabel('La tua data di nascita (formato YYYY-MM-DD)')
            )
        );

        await interaction.showModal(modal);
    }
}