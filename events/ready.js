const { Users } = require("../dbObjects.js");
const { customStatus } = require('../config.json');

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setActivity(customStatus || "Repubblica Nassiryota", {type: 'WATCHING'});
  }
};
