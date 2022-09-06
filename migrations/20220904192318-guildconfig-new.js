'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    await queryInterface.createTable('guildconfig', {
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
      transaction,
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
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('guildconfig');
  }
};
