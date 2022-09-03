const { Users } = require("../dbObjects.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setActivity("Repubblica Nassiryota", {type: 'WATCHING'});
  }
};
