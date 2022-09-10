const { Client, Collection, Intents } = require("discord.js");
const fs = require("fs");
const schedule = require('node-schedule');
const { token } = require('./config.json');
const { Player } = require('./dbObjects.js');
const checkBlacklist = require('./helpers/checkBlacklist.js');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS
  ],
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// scheduled events (require node-schedule)
const scheduledFiles = fs.readdirSync('./scheduled').filter(file => file.endsWith('.js'));
for (const file of scheduledFiles) {
  const scheduled = require(`./scheduled/${file}`);
  const job = schedule.scheduleJob(scheduled.time, function(){
    return scheduled.execute(client).catch(console.error);
  });
}

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command);
}

client.modals = new Collection();
const modalFiles = fs.readdirSync("./modals").filter(file => file.endsWith(".js"));

for (const file of modalFiles) {
  const modal = require(`./modals/${file}`);
  client.modals.set(modal.data.name, modal)
}

client.autocompletes = new Collection();
const autocompleteFiles = fs.readdirSync("./autocompletes").filter(file => file.endsWith(".js"));

for (const file of autocompleteFiles) {
  const autoc = require(`./autocompletes/${file}`);
  client.autocompletes.set(autoc.data.name, autoc);
}

client.on("interactionCreate", async interaction => {
  let command, player;

  // fetch command (or whatever)
  if (interaction.isCommand()) {
    const { commandName } = interaction;
    command = client.commands.get(commandName);

  } else if (interaction.isModalSubmit()) {
    const { customId } = interaction;

    command = client.modals.get(customId.split(':')[0]);
  } else if (interaction.isAutocomplete()){
    const { commandName } = interaction;
    const focusedOption = interaction.options.getFocused(true);

    const command1 = client.commands.get(commandName);

    if (!command1.autocomplete) {
      return;
    }

    command = client.autocompletes.get(command1.autocomplete[focusedOption.name]);

    // autocompletes require special handling

    if (!command) return;

    await command.execute(interaction, focusedOption.value);

    return;
  }

  if (!command) {
    return; 
  }

  try {

    // fetch player (if available)
    if (command.hasPlayer) {
      player = await Player.findByDsUser(interaction.user);
    }
      
    if (!player || !await checkBlacklist(interaction, player)){
      await command.execute(interaction, player);

      if (player) {
        player.addExperience(4);
        await player.touch();
      } 
    }
  } catch (error) {
    console.error(error);
    if (!interaction.deferred && !interaction.replied) {
      await interaction.reply({
	      content: `L’interazione è risultata in un errore.`,
	      ephemeral: true
      });
    } else if (!interaction.replied) {
      await interaction.editReply({
        content: `L’interazione è risultata in un errore.`,
	      ephemeral: true
      });
    }
  }
});


client.login(token);
