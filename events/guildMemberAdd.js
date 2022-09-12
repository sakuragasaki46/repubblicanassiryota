/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const { inviteVerify } = require('../helpers/customs.js');

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        return inviteVerify(member);
    }
}