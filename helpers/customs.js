/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const wait = require('node:timers/promises').setTimeout;
const { MessageActionRow, MessageButton, MessageEmbed, Message } = require('discord.js');
const { GuildConfig, Player, GuildCitizen, GuildCountry } = require('../dbObjects.js');
const ensureGuildConfig = require('../helpers/ensureGuildConfig.js');

async function reassignRoles(member, citizen, interaction){
    const {
        customsRole, citizenRole
    } = await GuildConfig.getVars(member.guild.id,
        [ 'customsRole', 'citizenRole' ]
    );

    try {
        await member.roles.remove(customsRole);
        await member.roles.add(citizenRole);
    } catch (ex) {
        await interaction.reply({
            content: `Impossibile assegnare i ruoli.`
        });

        return false;
    }
}

module.exports = {
    async inviteVerify(member) {
        const { customsChannel, customsRole, botRole } = await GuildConfig.getVars(
            member.guild.id,
            [ 'customsChannel', 'customsRole', 'botRole' ]
        );

        if (botRole && member.bot){
            await member.roles.add(botRole);
        }

        if (customsRole && !member.bot) {
            const player = await Player.findByDsUser(member);
            const citizen = await player.getCitizen(member.guild.id);

            if (citizen) {
                return reassignRoles(member, citizen, interaction);
            }

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

                await channel.send({
                    content: `${member.user}, benvenuto in **${member.guild.name}**!\n` +
                    `Clicca sul bottone per iniziare il processo di verifica.`,
                    components: rows
                });
            }
        }
    },

    reassignRoles,

    async applyCitizenship (interaction, player){
        const { citizenRole, customsRole } = await GuildConfig.getVars(
            interaction.guild.id,
            [ 'citizenRole', 'customsRole' ]
        );

        if (!await ensureGuildConfig(interaction, { citizenRole, customsRole })){
            return false;
        }

        const country = GuildCountry.findByPk(interaction.guild.id);

        if (!country) {
            await interaction.reply({
                content: 'Errore! Chiedi a un amministratore di eseguire /setup.'
            })
        }

        let citizen = await player.getCitizen(interaction.guild.id);

        if (citizen) {
            await interaction.reply({
                content: `Sei già cittadino/a ${(await citizen.getCitizenName()).toLocaleLowerCase()}!`,
                ephemeral: true
            });

            return false;
        } 

        // check the age of the account and the player
        const accountAge = interaction.user.createdAt;
        const minimumAge = await GuildConfig.getVar(interaction.guild.id, 'minimumAge', 13);
        const member = interaction.guild.members.cache.get(player.id);
        const playerAge = player.age();

        if (new Date() - accountAge < (7 * 24 * 60 * 60 * 1000)){
            const embed = new MessageEmbed();

            embed
                .setTitle('La tua verifica è stata sospesa')
                .setDescription(
                    `La verifica è stata sospesa in quanto il tuo account è troppo giovane. ` +
                    `Un Addetto alla dogana ti verificherà manualmente al più presto.`
                )
                .setColor(0xeecc00)
                ;
            
            await interaction.reply({
                embeds: [embed]
            });
            
            return;
        }

        if (playerAge == null) {
            await interaction.reply({
                content: '**Quanti anni hai?** Inserisci la tua età vera.',
                components: [
                    new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('verifymyage:u18')
                        .setLabel('Meno di 18')
                        .setStyle('SECONDARY')
                        ,
                        new MessageButton()
                        .setCustomId('verifymyage:18p')
                        .setLabel('Più di 18')
                        .setStyle('SECONDARY')
                    )
                ]
            });

            return false;
        }

        if (playerAge < minimumAge) {
            const embed = new MessageEmbed();
            embed
                .setTitle('Errore')
                .setDescription(`Non hai l’età minima (${minimumAge} anni) per stare su questo server.`)
                .setColor(0x660099);

            await interaction.reply({
                embeds: [embed]
            });
            
            await wait(30000);

            try{
                await member.kick({
                    reason: 'Failed age verification'
                })
            } catch (ex) {}

            return false;
        }

        // create citizen

        citizen = GuildCitizen.create({
            player_id: player.id,
            guild_id: interaction.guild.id
        });
        
        // reassign roles
        if (reassignRoles(member, citizen, interaction) !== false){
            const embed = new MessageEmbed();

            embed.setTitle('Completato!')
                .setDescription(`Complimenti, ora sei un vero e proprio cittadino ${(await citizen.getCitizenName()).toLocaleLowerCase()}`)
                .setColor(0x339900)

            interaction.reply({embeds: [embed]});
        }
    }
};