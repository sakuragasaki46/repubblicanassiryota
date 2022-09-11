/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class GuildConfig extends Sequelize.Model {

  static async getVar (guildId, key, defaultValue = null) {
    let obj = await GuildConfig.findOne({
      where: {
	guild_id: guildId,
	key
      }
    });

    if (obj) {
      return obj.value;
    } else {
      return defaultValue;
    }
  }

  static async getVars (guildId, keyList) {
    const keyListQ = keyList.map(x => ({key: x}));
    
    const objs = await GuildConfig.findAll({
      where: {
	guild_id: guildId,
	[Op.or]: keyListQ
      }
    });

    const keyValues = {};
    
    for (const obj of objs) {
      keyValues[obj.key] = obj.value;
    }

    return keyValues;
  }
  
  static async setVar (guildId, key, value) {
    await GuildConfig.upsert({
      guild_id: guildId,
      key,
      value
    });
  }

  static async delVar (guildId, key) {
    await GuildConfig.destroy({
      where: {
	[Op.and]: {
	  guild_id: guildId,
	  key
	}
      }
    });
  }
}

module.exports = function(sequelize, DataTypes) {
  GuildConfig.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    guild_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    key: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    value: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'guildconfig',
    tableName: 'guildconfig',
    timestamps: false,
    indexes: [
      {
	unique: true,
	fields: ['guild_id', 'key']
      },
      {
	fields: ['guild_id']
      }
    ]
  });

  return GuildConfig;
};
