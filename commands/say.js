const { SlashCommandBuilder } = require('@discordjs/builders');
const { Tupper, Tupperhook } = require('../dbObjects.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Dì qualcosa attraverso la bocca di un personaggio.')
    .addStringOption(o => o
        .setName('ch')
        .setDescription('Il personaggio da ruolare.')
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addStringOption(o => o
        .setName('text')
        .setDescription('Il testo del messaggio.')
        .setRequired(true)
    )
    ,
    hasPlayer: true,
    autocomplete: {
        ch: 'tupperCh'
    },
    async execute (interaction, player){
        const { channel } = interaction;
        const tupperName = interaction.options.getString('ch');
        const textContent = interaction.options.getString('text');

        if (/@everyone|@here/.test(textContent)){
            await interaction.reply({
                content: 'Menzione di massa bloccata!',
                ephemeral: true
            });

            return false;
        }

        const tupper = await Tupper.findOne({
            where: {
                name: tupperName
            }
        });

        if (!tupper) {
            await interaction.reply({
                content: `Il tupper \`${tupperName}\` non esiste.`,
                ephemeral: true
            });

            return false;
        }

        await interaction.deferReply();

        const tupperhook = await tupper.getWebhook(channel);
        let wh;

        if (tupperhook.webhook_id) {
            wh = await interaction.client.fetchWebhook(tupperhook.webhook_id);
        } else {
            try {
                wh = await interaction.channel.createWebhook(
                    'Tupperhook'
                );
            } catch (e) {
                await interaction.editReply({
                    content: 'Ehi! `_´ Non ho i permessi per i webhook. Chiedi a un amministratore di darmeli.',
                });

                return false;
            }

            tupperhook.webhook_id = wh.id;
            await tupperhook.save();
        }

        await wh.send({
            content: textContent,
            username: tupperName,
            avatarURL: tupper.avatar_url
        });

        tupper.posts += 1;
        await tupper.save();

        await interaction.deleteReply();
    }
}