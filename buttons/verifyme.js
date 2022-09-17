/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

module.exports = {
    data: {name: 'verifyme'},
    hasPlayer: true,
    async execute (interaction, player) {
        return applyCitizenship(interaction, player);
    }
}