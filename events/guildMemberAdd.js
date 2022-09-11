/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const verifyUser = require('../helpers/verifyUser.js');

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        return verifyUser(member);
    }
}