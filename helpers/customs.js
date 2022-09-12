/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const { MessageActionRow, MessageButton } = require('discord.js');
const { GuildConfig } = require('../dbObjects.js');

module.exports = {
    async inviteVerify(member) {
        const { customsChannel, customsRole, botRole } = GuildConfig.getVars(
            member.guild.id,
            [ 'customsChannel', 'customsRole', 'botRole' ]
        );

        if (botRole && member.bot){
            await member.roles.add(botRole);
        }

        if (customsRole && !member.bot) {
            await member.roles.add(customsRole);

            if (customsChannel){
                const channel = member.guild.channels.cache.get(customsChannel);

                const rows = [
                    new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('verifyme')
                        .setLabel('Verificami!')
                        .setStyle('PRIMARY')
                    )
                ];

                channel.send({
                    content: `Benvenuto in **${member.guild.name}**!\n` +
                    `Clicca sul bottone per iniziare il processo di verifica.`,
                    components: rows
                });
            }
        }
    }
};