# Repubblica Nassiryota

This bot, born as the official one of *Repubblica Nassiryota* Discord server, is a multipurpose bot for the management of virtual States on Discord.

The features included are: partnerships, customs, parties (coming soon), and many others coming soon.

Please note currently the only locale supported in the bot is Italian.

## Requirements

* Node.js 16 or higher.
* npm.
* A MySQL database.

## Deployment instructions

1. Clone the repository: `git clone https://github.com/sakuragasaki46/repubblicanassiryota`.
2. Run `npm install`.
3. Edit `config.json` in the root directory of the project. Some of the values settable are:
    * `clientId`: Your application’s client ID.
    * `token`: Your personal Discord bot token.
4. Enter your database credentials into `config/config.json`, under `development` or  `production` label, depending on your NODE_ENV.  See instructions on the [migration page of Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/#configuration)
5. Run `npx sequelize-cli db:migrate`.
6. Deploy to your own host, or use your PC to host the bot.