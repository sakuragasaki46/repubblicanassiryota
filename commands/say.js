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

            return
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

            return;
        }

        await interaction.deferReply();

        const tupperhook = await tupper.getWebhook(channel);
        let wh;

        if (tupperhook.url) {
            // tempfix, pure webhook ID will be stored in 0.6.0
            const urlMatch = tupperhook.url.match(/<Webhook id=(\d+)>|https:\/\/discord.com\/api\/webhooks\/(\d+)\//);
            const whId = urlMatch[1] || urlMatch[2];
            wh = await interaction.client.fetchWebhook(whId);
        } else {
            wh = await interaction.channel.createWebhook(
                'Tupperhook'
            );

            tupperhook.url = wh.url;
            await tupperhook.save();
        }

        await wh.send({
            content: textContent,
            username: tupperName,
            avatarURL: tupper.avatar_url
        });

        await interaction.deleteReply();
    }
}