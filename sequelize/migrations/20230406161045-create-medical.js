'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medicals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY
      },
      oxygen: {
        type: Sequelize.STRING
      },
      heart_rate: {
        type: Sequelize.STRING
      },
      blood_pressure: {
        type: Sequelize.STRING
      },
      blood_glucose: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      morning_meds: {
        type: Sequelize.TIME
      },
      evening_meds: {
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('medicals');
  }
};