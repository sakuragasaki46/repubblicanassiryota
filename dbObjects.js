const fs = require('fs');
const Sequelize = require('sequelize');
const nodeEnv = process.env.NODE_ENV || 'development';
const dbConfig = require("./config/config.json")[nodeEnv];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
  supportBigNumbers: true,
  bigNumberStrings: true
});

const models = {};
const modelFiles = fs.readdirSync('./models').filter(file => file.endsWith('.js'));

for (const file of modelFiles) {
  models[file.slice(0, -3)] = require(`./models/${file}`)(sequelize, Sequelize.DataTypes);
}

// model specific foreign keys

try {
  models.Tupper.belongsTo(models.Player, { as: "user", foreignKey: "user_id"});
  models.Player.hasMany(models.Tupper, { as: "tuppers", foreignKey: "user_id"});
  models.TupperGroup.belongsTo(models.Player, { as: "user", foreignKey: "user_id"});
  models.Player.hasMany(models.TupperGroup, { as: "tuppergroups", foreignKey: "user_id"});
  models.Tupperhook.belongsTo(models.Tupper, { as: "tupper", foreignKey: "tupper_id"});
  models.Tupper.hasMany(models.Tupperhook, { as: "tupperhooks", foreignKey: "tupper_id"});
  models.Tupper.belongsTo(models.TupperGroup, { as: "group", foreignKey: "group_id"});
  models.TupperGroup.hasMany(models.Tupper, { as: "tuppers", foreignKey: "group_id"});
} catch(ex) {
  console.error(ex);
}

module.exports = models;
