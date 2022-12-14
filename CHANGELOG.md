# Changelog

## 0.7.1

* Changed bot description in package.json and README.md.
* Bug fixes in verification process.
* Completed code for age verification.
* Fixed bug where player’s username was not stored.

## 0.7.0

* **Schema changes**: be sure to run the migrations before deployment.
* Added `/guildinfo` command.
* Added `/citizenship` command: it includes utility for pronouns.
* Added `/setup` command, for guild administrators only.
* Improved `/userinfo` with addition of rank and citizenship info, and `/partnership` with guild ranking.
* Added `GuildCountry`, `GuildCitizen` and `GuildParty` models.
* Added buttons handling.
* Introduced user verification at join, i.e. `guildMemberAdd` event — also known as “customs”.


## 0.6.0

* Added `/bibbia` command.
* Schema changes: remove column `url` from `Tupperhook` model, replaced by `webhook_id`.  (In previous codebase, not published, it used to store strings like `<Webhook id=123456789012345678>`.  And I found out now.)
* Now commands that fail have to return false in function body.  This way, commands that have failed do not give experience to player.
* Now you can type ! at the end of the tupperCh autocomplete to match exactly the entered string.
* `/say` uses the same webhook for each channel.  Previously, it used to create one *for each tupper*.  It could easily get past the 10 webhook limit per channel.  Please upgrade.

## 0.5.1

* Fixed bug in `/say` command when retrieving existing Tupperhook from database.
* Now `/say` catches the error when not having permissions for webhooks.

## 0.5.0

* Added `/say` command.
* Removed `PlayerAct` helper.  Added player info retrieving directly in index.js, and blacklist checking in `checkBlacklist` helper.
* Refactored command and modal dispatching in index.js.
* Introduced Scripts.  `blacklist.js` is the first one. (Since blacklisting is a delicate administrative operation, it has. in my opinion, be done via a server-side script, and not via regular slash commands.)
* Introduced Autocompletes.
* Updated README with instructions on how to deploy.
* Moved database info from `config.json` to `config/config.json`.
* Renamed `created_at` and `updated_at` columns of `Tupper` model in order to match Sequelize standards.

## 0.4.1

* Added `customPresence` config.

## 0.4.0

* Added `/guildconfig` and `/partnership`.
* Introduced Migrations.
* Added `GuildConfig` model.
* Removed scheduled `420` in the afternoon.

## 0.3.0

* Added `PlayerAct` helper and several utilities to `Player` model.
* Added `/daily` command.
* Made user parameter optional in `/userinfo`.

## 0.2.0

* Added support for modals.
* Improved `/userinfo`.
* Removed old set of commands (i.e. `/config`, `/mbti`, `/partnership`, with
  the exception of `/userinfo`)
* Removed old database models (i.e. `GuildRoles`, `MbtiResults`, and
  `Partnerships`) and added new models (i.e. `UserAlert`, `Tupper`,
  `TupperGroup`, `Tupperhook`, `Bibbia` and `Player`).
