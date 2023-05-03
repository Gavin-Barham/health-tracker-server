// IMPORT DATABASE ORM
const DB = require('../utils/database');
const Sequelize = require('sequelize');


// DEFINE MEDICAL MODEL
const Exercise = DB.define('exercise', {
    date: {
        type: Sequelize.DATE,
        primaryKey: true,
        allowNull: false
    },
    weight: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    daily_steps: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    miles: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    calories_burned: {
        type: Sequelize.JSON,
        allowNull: true
    },
    sleep: {
        type: Sequelize.JSON,
        allowNull: true
    }
})



module.exports = Exercise;