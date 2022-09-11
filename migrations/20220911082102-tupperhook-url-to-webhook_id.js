'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('tupperhook', 'url', {transaction});
      await queryInterface.addColumn('tupperhook', 'webhook_id', {
        type: DataTypes.BIGINT,
        allowNull: true 
      }, {transaction});
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn('tupperhook', 'webhook_id', {transaction});
      await queryInterface.addColumn('tupperhook', 'url', {
        type: DataTypes.STRING(1024),
        allowNull: true
      }, {transaction});
    });
  }
};
