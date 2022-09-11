/**
 * (c) 2022 Sakuragasaki46
 * 
 * See LICENSE for license details
 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  class Tupperhook extends Sequelize.Model {
    
  }

  Tupperhook.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tupper_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tupper',
        key: 'id'
      }
    },
    channel: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    webhook_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tupperhook',
    modelName: 'tupperhook',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "tupperhook_tupper_id_channel",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tupper_id" },
          { name: "channel" },
        ]
      },
      {
        name: "tupperhook_tupper_id",
        using: "BTREE",
        fields: [
          { name: "tupper_id" },
        ]
      },
    ]
  });

  return Tupperhook;
};
