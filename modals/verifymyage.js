/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: {
        name: 'verifymyage'
    },
    hasPlayer: true,
    async execute (interaction, player) {
        player.birthday = new Date();
        await player.touch();

        const minimumAge = await GuildConfig.getVar(interaction.guild.id, 'minimumAge', 13);
        const playerAge = player.age();

        const member = interaction.guild.members.cache.get(player.id);

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

        let citizen = GuildCitizen.upsert({
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
}