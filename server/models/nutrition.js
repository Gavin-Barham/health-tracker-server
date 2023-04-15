// IMPORT DATABASE ORM
const DB = require('../utils/database');
const Sequelize = require('sequelize');


// DEFINE NUTRITION MODEL
const Nutrition = DB.define('nutrition', {
    date: {
        type: Sequelize.DATE,
        primaryKey: true,
        allowNull: false
    },
    daily_steps: { 
        type: Sequelize.INTEGER,
        allowNull: true
    },
    first_meal_cal: { 
        type: Sequelize.INTEGER,
        allowNull: true
    },
    first_meal_time: { 
        type: Sequelize.TIME,
        allowNull: true
    },
    second_meal_cal: { 
        type: Sequelize.INTEGER,
        allowNull: true
    },
    second_meal_time: { 
        type: Sequelize.TIME,
        allowNull: true
    },
    snack_cal: { 
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true
    },
    exercise_cal: { 
        type: Sequelize.INTEGER,
        allowNull: true
    },
    exercise_time: { 
        type: Sequelize.ARRAY(Sequelize.TIME),
        allowNull: true
    }
,});



module.exports = Nutrition;
  