// IMPORT DATABASE ORM
const DB = require('../utils/database');
const Sequelize = require('sequelize');


// DEFINE NUTRITION MODEL
  const Nutrition = DB.define('nutrition', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    date: Sequelize.DATEONLY,
    daily_steps: Sequelize.INTEGER,
    first_meal_cal: Sequelize.INTEGER,
    first_meal_time: Sequelize.TIME,
    second_meal_cal: Sequelize.INTEGER,
    second_meal_time: Sequelize.TIME,
    snack_cal: Sequelize.ARRAY(Sequelize.INTEGER),
    exercise_cal: Sequelize.INTEGER,
    exercise_time: Sequelize.ARRAY(Sequelize.TIME)
});


// EXPORT NUTRITION MODEL
module.exports = Nutrition;
  