module.exports = {
  time: {hour: [4, 16], minute: 20},
  async execute(client) {
    const channel = client.channels.cache.get('880805122710593617');
    if (channel) {
      channel.send("4:20, ora di farsi una bella canna");
    } else {
      console.error("Channel not found");
    }
  }
};
