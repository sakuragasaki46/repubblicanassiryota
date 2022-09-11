/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const { four20Channel } = require('../config.json');

module.exports = {
  time: {hour: 4, minute: 20, tz: 'Europe/Rome'},
  async execute(client) {
    if (!four20Channel) return;

    const channel = client.channels.cache.get(four20Channel);
    if (channel) {
      channel.send("4:20, ora di farsi una bella canna");
    } else {
      console.error("Channel not found");
    }
  }
};
