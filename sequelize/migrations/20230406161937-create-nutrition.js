'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nutrition', {
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
      daily_steps: {
        type: Sequelize.INTEGER
      },
      first_meal_cal: {
        type: Sequelize.INTEGER
      },
      first_meal_time: {
        type: Sequelize.TIME
      },
      second_meal_cal: {
        type: Sequelize.INTEGER
      },
      second_meal_time: {
        type: Sequelize.TIME
      },
      first_meal_cal: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      snack_time: {
        type: Sequelize.ARRAY(Sequelize.TIME)
      },
      exercise_cal: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      exercise_time: {
        type: Sequelize.ARRAY(Sequelize.TIME)
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
    await queryInterface.dropTable('nutrition');
  }
};