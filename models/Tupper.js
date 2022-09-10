const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  class Tupper extends Sequelize.Model {
    async getWebhook (channel){
      if (typeof channel === 'object') {
        channel = channel.id;
      }
      
      await sequelize.models.tupperhook.upsert({
        tupper_id: this.id,
        channel
      });

      const tupperhook = await sequelize.models.tupperhook.findOne({
        where: {
          tupper_id: this.id,
          channel
        }
      });

      return tupperhook;
    }
  }

  Tupper.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'player',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    avatar_url: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    bracket_start: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    bracket_end: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    posts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    show_brackets: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    tag: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tuppergroup',
        key: 'id'
      }
    },
    group_pos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    nick: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    privacy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'tupper',
    tableName: 'tupper',
    timestamps: true,
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
        name: "tupper_user_id_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "name" },
        ]
      },
      {
        name: "tupper_user_id_position",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "position" },
        ]
      },
      {
        name: "tupper_bracket_start_bracket_end",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bracket_start" },
          { name: "bracket_end" },
        ]
      },
      {
        name: "tupper_group_id_group_pos",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "group_id" },
          { name: "group_pos" },
        ]
      },
      {
        name: "tupper_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "tupper_group_id",
        using: "BTREE",
        fields: [
          { name: "group_id" },
        ]
      },
    ]
  });

  return Tupper;
};
