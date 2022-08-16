'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('counts',{
      id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
      id_user: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      number_count: {
          type:Sequelize.STRING,
      },
      balance: {
        type:Sequelize.STRING,
    },
      status: {
        type:Sequelize.INTEGER,
      },
      // Timestamps
      
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
        },
        updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('counts');
  }
};
