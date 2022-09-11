# Changelog

## 0.6.0

* Added `/bibbia` command.
* Schema changes: remove column `url` from `Tupperhook` model, replaced by `webhook_id`.  (In previous codebase, not published, it used to store strings like `<Webhook id=123456789012345678>`.  And I found out now.)
* Now commands that fail have to return false in function body.  This way, commands that have failed do not give experience to player.

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
