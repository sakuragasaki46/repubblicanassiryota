'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.renameColumn('tupper', 'created_at', 'createdAt', {transaction});
      await queryInterface.renameColumn('tupper', 'updated_at', 'updatedAt', {transaction});
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.renameColumn('tupper', 'updatedAt', 'updated_at', {transaction});
      await queryInterface.renameColumn('tupper', 'createdAt', 'created_at', {transaction});
    })  
  }
};
