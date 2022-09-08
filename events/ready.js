const { Users } = require("../dbObjects.js");
const { customStatus, customPresence } = require('../config.json');

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);

    if (customPresence && ['dnd', 'online', 'idle', 'invisible'].indexOf(customPresence) >= 0) {
      client.user.setPresence({status: customPresence});
    }
    
    client.user.setActivity(customStatus || "Repubblica Nassiryota", {type: 'WATCHING'});
  }
};
