# Repubblica Nassiryota

This is the official bot of Repubblica Nassiryota Discord server.

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
4. Enter your database credentials into `config/config.json`, under `development` or  `production` label, depending on your NODE_ENV.
5. Run `npx sequelize-cli db:migrate`.
6. Deploy to your own host, or use your PC to host the bot.