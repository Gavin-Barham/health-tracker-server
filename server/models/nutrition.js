const Sequelize = require('sequelize');
const DB = require('../utils/database');
// const User = require('./user');

  const Nutrition = DB.define('nutrition', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    user_id: Sequelize.INTEGER,
    date: Sequelize.DATEONLY,
    daily_steps: Sequelize.INTEGER,
    first_meal_cal: Sequelize.INTEGER,
    first_meal_time: Sequelize.TIME,
    second_meal_cal: Sequelize.INTEGER,
    second_meal_time: Sequelize.TIME,
    first_meal_cal: Sequelize.ARRAY(Sequelize.INTEGER),
    snack_time: Sequelize.ARRAY(Sequelize.TIME),
    exercise_cal: Sequelize.ARRAY(Sequelize.INTEGER),
    exercise_time: Sequelize.ARRAY(Sequelize.TIME)
  });
  
  // Nutrition.belongsTo(User)
  
  module.exports = Nutrition;
  