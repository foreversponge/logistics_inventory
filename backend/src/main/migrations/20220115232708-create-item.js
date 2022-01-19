'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Item', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      weight: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      length: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      height: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      quantity: {
        allowNull: true,
        type: Sequelize.INTEGER,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Item');
  },
};